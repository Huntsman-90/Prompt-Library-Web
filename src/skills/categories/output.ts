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
  "protobuf-v3-schema-definition": {
    id: "protobuf-v3-schema-definition",
    name: "ProtobufV3SchemaDefinitionSkill",
    displayName: "Protocol Buffers (Protobuf v3) & gRPC Service Interface",
    categoryId: "output",
    description: "Formats output as production-ready Protocol Buffers (proto3) schema files with explicit field tags, enums, and gRPC services.",
    tags: ["output","protobuf","grpc","schema","serialization"],
    transform: createStandardSkillTransform({
      sectionName: "Protocol Buffers (proto3) Schema Specification",
      ruSectionName: "Спецификация схемы Protocol Buffers (proto3) и сервисов gRPC",
      instructions: [
        "Declare `syntax = \"proto3\";` with unambiguous package namespace and language options.",
        "Assign explicit, immutable 1-based numerical field tags to all message fields.",
        "Define clear Enums with zero-value `UNKNOWN = 0` sentinel defaults.",
        "Specify gRPC Service definitions with strict unary and streaming RPC method signatures."
],
      ruInstructions: [
        "Объявляйте директиву `syntax = \"proto3\";` с указанием пространства имен пакета и опций сборки.",
        "Присваивайте неизменяемые целочисленные теги полей (1-based index) каждому полю сообщений.",
        "Задавайте перечисления Enum с обязательным нулевым дефолтным значением `UNKNOWN = 0`.",
        "Описывайте сервисы gRPC с типизированными методами вызова (унарные и потоковые RPC)."
],
      semanticType: "structural_directive",
      tags: ["output","protobuf","grpc","schema","serialization"],
    }),
  },

  "graphql-sdl-schema-definition": {
    id: "graphql-sdl-schema-definition",
    name: "GraphqlSdlSchemaDefinitionSkill",
    displayName: "GraphQL Schema Definition Language (SDL) with Directives",
    categoryId: "output",
    description: "Outputs schemas strictly in standard GraphQL SDL with typed queries, mutations, subscriptions, custom scalars, and federation directives.",
    tags: ["output","graphql","sdl","schema","api-contract"],
    transform: createStandardSkillTransform({
      sectionName: "GraphQL Schema Definition (SDL) Protocol",
      ruSectionName: "Спецификация схемы GraphQL (SDL) с директивами",
      instructions: [
        "Define types strictly using standard GraphQL SDL syntax with explicit non-null `!` assertions where required.",
        "Organize root types: `type Query`, `type Mutation`, and `type Subscription`.",
        "Annotate fields with descriptive markdown docstrings using triple quotes `\"\"\"`.",
        "Incorporate standard connection and pagination types (PageInfo, Edges) for list endpoints."
],
      ruInstructions: [
        "Описывайте типы строго в стандартном синтаксисе GraphQL SDL с явными маркерами обязательности `!`.",
        "Структурируйте корневые типы: `type Query`, `type Mutation` и `type Subscription`.",
        "Снабжайте поля и типы информативными комментариями в тройных кавычках `\"\"\"`.",
        "Используйте стандарты курсорной пагинации (PageInfo, Edges) для списочных запросов."
],
      semanticType: "structural_directive",
      tags: ["output","graphql","sdl","schema","api-contract"],
    }),
  },

  "sql-ddl-migration-schema": {
    id: "sql-ddl-migration-schema",
    name: "SqlDdlMigrationSchemaSkill",
    displayName: "PostgreSQL ANSI SQL DDL Migration & Indexing Script",
    categoryId: "output",
    description: "Generates idempotent, production-grade PostgreSQL SQL DDL migration scripts with foreign keys, check constraints, and optimal indexes.",
    tags: ["output","sql","postgresql","ddl","migrations","database"],
    transform: createStandardSkillTransform({
      sectionName: "PostgreSQL DDL Migration Specification",
      ruSectionName: "Спецификация DDL-миграции PostgreSQL с индексами и ограничениями",
      instructions: [
        "Write clean, idempotent PostgreSQL DDL using `CREATE TABLE IF NOT EXISTS` and transactions.",
        "Define primary keys (e.g. UUID v4 or BIGSERIAL), foreign keys with explicit ON DELETE actions, and CHECK constraints.",
        "Add dedicated B-Tree, GIN, or BRIN indexes tailored to anticipated query patterns.",
        "Include comprehensive column and table comments (`COMMENT ON TABLE ... IS ...`)."
],
      ruInstructions: [
        "Формируйте идемпотентные DDL-скрипты PostgreSQL с транзакционными блоками и безопасными проверками.",
        "Задавайте первичные ключи (UUID или BIGSERIAL), внешние ключи с явным `ON DELETE` и правила `CHECK`.",
        "Создавайте оптимальные индексы (B-Tree, GIN, BRIN) под целевые профили нагрузки и выборок.",
        "Добавляйте структурированные комментарии к таблицам и колонкам (`COMMENT ON COLUMN ...`)."
],
      semanticType: "structural_directive",
      tags: ["output","sql","postgresql","ddl","migrations","database"],
    }),
  },

  "json-ld-schema-org-structured-data": {
    id: "json-ld-schema-org-structured-data",
    name: "JsonLdSchemaOrgStructuredDataSkill",
    displayName: "JSON-LD Schema.org Rich Snippets & Linked Data",
    categoryId: "output",
    description: "Formats output as Google-compliant JSON-LD structured data adhering to Schema.org standards (Article, Product, Organization, FAQ).",
    tags: ["output","json-ld","schema-org","seo","structured-data"],
    transform: createStandardSkillTransform({
      sectionName: "JSON-LD Schema.org Structured Data Protocol",
      ruSectionName: "Спецификация структурированных данных JSON-LD (Schema.org)",
      instructions: [
        "Output valid JSON-LD enclosed in `<script type=\"application/ld+json\">` containers.",
        "Specify canonical `@context: \"https://schema.org\"` and appropriate `@type` entities.",
        "Populate all Google Rich Results mandatory and recommended property fields.",
        "Validate nested entity hierarchies without circular references or invalid date formats."
],
      ruInstructions: [
        "Генерируйте валидный JSON-LD в контейнере `<script type=\"application/ld+json\">`.",
        "Задавайте контекст `@context: \"https://schema.org\"` и точные сущности `@type`.",
        "Заполняйте все обязательные и рекомендованные свойства для Google Rich Results.",
        "Обеспечивайте корректную вложенность связанных объектов и стандартные форматы дат ISO 8601."
],
      semanticType: "structural_directive",
      tags: ["output","json-ld","schema-org","seo","structured-data"],
    }),
  },

  "geojson-geospatial-feature-collection": {
    id: "geojson-geospatial-feature-collection",
    name: "GeojsonGeospatialFeatureCollectionSkill",
    displayName: "GeoJSON (RFC 7946) Geospatial FeatureCollection",
    categoryId: "output",
    description: "Generates valid GeoJSON FeatureCollection structures conforming to RFC 7946 with WGS84 coordinates and typed properties.",
    tags: ["output","geojson","gis","rfc7946","geospatial"],
    transform: createStandardSkillTransform({
      sectionName: "GeoJSON RFC 7946 Geospatial Specification",
      ruSectionName: "Спецификация геопространственных данных GeoJSON (RFC 7946)",
      instructions: [
        "Structure data strictly as a GeoJSON `FeatureCollection` containing typed `Feature` objects.",
        "Adhere to RFC 7946 coordinate ordering: [longitude, latitude] in WGS84 datum.",
        "Define geometry types accurately: Point, LineString, Polygon, MultiPolygon.",
        "Include structured attributes in the `properties` dictionary for each feature."
],
      ruInstructions: [
        "Формируйте структуру строго как GeoJSON `FeatureCollection` с массивом объектов `Feature`.",
        "Соблюдайте порядок координат стандарта RFC 7946: [долгота, широта] в проекции WGS84.",
        "Используйте корректные типы геометрий: Point, LineString, Polygon, MultiPolygon.",
        "Помещайте метаданные и атрибуты в объект `properties` для каждого географического объекта."
],
      semanticType: "structural_directive",
      tags: ["output","geojson","gis","rfc7946","geospatial"],
    }),
  },

  "markdown-callout-admonition-blocks": {
    id: "markdown-callout-admonition-blocks",
    name: "MarkdownCalloutAdmonitionBlocksSkill",
    displayName: "Markdown Callout & Admonition Blocks (GitHub / Obsidian)",
    categoryId: "output",
    description: "Structures documentation with visually engaging Markdown callouts: [!NOTE], [!WARNING], [!TIP], [!IMPORTANT], [!CAUTION].",
    tags: ["output","markdown","callouts","admonitions","documentation"],
    transform: createStandardSkillTransform({
      sectionName: "Markdown Admonition Callout Specification",
      ruSectionName: "Спецификация визуальных выносок Markdown (Callouts / Admonitions)",
      instructions: [
        "Format callouts using canonical syntax: `> [!TYPE]` followed by quoted body text.",
        "Select types purposefully: [!NOTE] for context, [!TIP] for best practice, [!WARNING] for risk, [!CAUTION] for dangerous actions.",
        "Keep callout bodies concise, actionable, and visually distinct from surrounding narrative.",
        "Ensure 100% rendering compatibility with GitHub Markdown and Obsidian viewers."
],
      ruInstructions: [
        "Оформляйте выноски по стандарту: `> [!TYPE]` с последующим цитируемым текстом.",
        "Выбирайте типы строго по смыслу: [!NOTE] (заметка), [!TIP] (совет), [!WARNING] (предупреждение), [!CAUTION] (опасность).",
        "Формулируйте текст выносок емко и практически, отделяя его от основного повествования.",
        "Гарантируйте корректный рендеринг в GitHub Flavored Markdown и Obsidian."
],
      semanticType: "structural_directive",
      tags: ["output","markdown","callouts","admonitions","documentation"],
    }),
  },

  "sparql-rdf-turtle-triples": {
    id: "sparql-rdf-turtle-triples",
    name: "SparqlRdfTurtleTriplesSkill",
    displayName: "W3C RDF Turtle Triples & SPARQL Query Output",
    categoryId: "output",
    description: "Formats semantic knowledge graphs as W3C RDF Turtle (.ttl) triples with standardized namespace prefixes and SPARQL query constructs.",
    tags: ["output","rdf","turtle","sparql","semantic-web","ontologies"],
    transform: createStandardSkillTransform({
      sectionName: "W3C RDF Turtle & SPARQL Specification",
      ruSectionName: "Спецификация семантического графа W3C RDF Turtle и запросов SPARQL",
      instructions: [
        "Define standard namespace prefixes at top: `@prefix rdf:`, `@prefix rdfs:`, `@prefix owl:`, `@prefix xsd:`.",
        "Structure Subject-Predicate-Object triples ending cleanly with periods or semicolons for repeated subjects.",
        "Type literal values explicitly with XSD data types (e.g. `^^xsd:dateTime`, `^^xsd:integer`).",
        "Accompany graph ontology triples with corresponding verification SPARQL queries."
],
      ruInstructions: [
        "Задавайте префиксы пространств имен в начале документа (`@prefix rdfs:`, `@prefix owl:`, `@prefix xsd:`).",
        "Структурируйте триплеты Субъект-Предикат-Объект с корректными знаками препинания (точка, точка с запятой).",
        "Типизируйте литеральные значения явными типами данных XSD (`^^xsd:dateTime`, `^^xsd:decimal`).",
        "Прилагайте проверочные запросы на языке SPARQL для валидации графа знаний."
],
      semanticType: "structural_directive",
      tags: ["output","rdf","turtle","sparql","semantic-web","ontologies"],
    }),
  },

  "regular-expression-pcre-annotated": {
    id: "regular-expression-pcre-annotated",
    name: "RegularExpressionPcreAnnotatedSkill",
    displayName: "PCRE Regular Expression with Named Groups & Explanatory Breakdown",
    categoryId: "output",
    description: "Delivers robust PCRE/ECMAScript regular expressions with named capture groups, unit test test vectors, and catastrophic backtracking proofs.",
    tags: ["output","regex","pcre","pattern-matching","validation"],
    transform: createStandardSkillTransform({
      sectionName: "Annotated Regular Expression Specification",
      ruSectionName: "Спецификация регулярных выражений (PCRE) с именованными группами и разбором",
      instructions: [
        "Provide the complete, battle-tested regular expression pattern enclosed in clean code fences.",
        "Use named capture groups `(?<name>...)` for semantic extraction of structured sub-elements.",
        "Include a line-by-line breakdown detailing the exact purpose of tokens, lookaheads, and quantifiers.",
        "Furnish a test vector suite listing at least 5 matching and 5 non-matching test strings with edge cases."
],
      ruInstructions: [
        "Предоставляйте законченный, протестированный шаблон регулярного выражения в блоке кода.",
        "Используйте именованные группы захвата `(?<name>...)` для извлечения смысловых подстрок.",
        "Приводите построчный детальный разбор логики работы каждого квантификатора и lookaround-проверки.",
        "Включайте тестовый набор: минимум 5 валидных и 5 невалидных строк с граничными случаями."
],
      semanticType: "structural_directive",
      tags: ["output","regex","pcre","pattern-matching","validation"],
    }),
  },

  "semver-release-manifest-json": {
    id: "semver-release-manifest-json",
    name: "SemverReleaseManifestJsonSkill",
    displayName: "Semantic Versioning 2.0.0 Release Manifest JSON",
    categoryId: "output",
    description: "Generates structured software release manifests adhering strictly to Semantic Versioning 2.0.0 with commit SHAs, checksums, and artifact paths.",
    tags: ["output","semver","release-manifest","json","devops"],
    transform: createStandardSkillTransform({
      sectionName: "SemVer 2.0.0 Release Manifest Specification",
      ruSectionName: "Спецификация манифеста релиза SemVer 2.0.0 (JSON)",
      instructions: [
        "Validate version string strictly against SemVer 2.0.0 (MAJOR.MINOR.PATCH-PRERELEASE+BUILD).",
        "Structure JSON containing: version, releaseDate, gitCommitSha, changelogSummary, and artifacts array.",
        "Provide SHA-256 cryptographic digests for every listed distribution binary/asset.",
        "Flag breaking changes explicitly in a dedicated breakingChanges array."
],
      ruInstructions: [
        "Валидируйте строку версии по стандарту SemVer 2.0.0 (MAJOR.MINOR.PATCH-PRERELEASE+BUILD).",
        "Формируйте JSON с полями: version, releaseDate, gitCommitSha, changelogSummary и списком artifacts.",
        "Указывайте контрольные суммы SHA-256 для каждого дистрибутивного пакета или бинарного файла.",
        "Явно перечисляйте обратно несовместимые изменения в выделенном блоке `breakingChanges`."
],
      semanticType: "structural_directive",
      tags: ["output","semver","release-manifest","json","devops"],
    }),
  },

  "cbor-binary-representation-hex": {
    id: "cbor-binary-representation-hex",
    name: "CborBinaryRepresentationHexSkill",
    displayName: "CBOR (RFC 8949) Binary Object Hex Representation",
    categoryId: "output",
    description: "Outputs compact binary payloads adhering to CBOR (RFC 8949) format, providing diagnostic hexadecimal dumps and annotated byte maps.",
    tags: ["output","cbor","binary","rfc8949","embedded","iot"],
    transform: createStandardSkillTransform({
      sectionName: "CBOR RFC 8949 Binary Specification",
      ruSectionName: "Спецификация бинарных данных CBOR (RFC 8949) с hex-дампом",
      instructions: [
        "Provide the CBOR diagnostic notation alongside canonical uppercase hexadecimal byte stream representations.",
        "Include byte-by-byte breakdown mapping major types (integers, byte strings, arrays, maps) to byte offsets.",
        "Ensure compact integer encodings adhere strictly to RFC 8949 canonical rules.",
        "Demonstrate significant payload reduction compared to equivalent raw JSON representations."
],
      ruInstructions: [
        "Предоставляйте диагностическую нотацию CBOR вместе с каноническим шестнадцатеричным hex-дампом.",
        "Приводите побайтовый разбор со смещениями, сопоставляя байты с типами данных (числа, строки, карты).",
        "Соблюдайте правила компактного канонического кодирования стандарта RFC 8949.",
        "Демонстрируйте процент экономии размера полезной нагрузки по сравнению с эквивалентным JSON."
],
      semanticType: "structural_directive",
      tags: ["output","cbor","binary","rfc8949","embedded","iot"],
    }),
  },

  "asciitable-box-drawing-cli": {
    id: "asciitable-box-drawing-cli",
    name: "AsciitableBoxDrawingCliSkill",
    displayName: "Unicode Box-Drawing ASCII Terminal Table",
    categoryId: "output",
    description: "Renders CLI-ready tabular data using Unicode Box-Drawing characters (┌, ─, ┬, ┐, │, ├, ┼, ┤, └, ┴, ┘) with exact monospaced padding.",
    tags: ["output","ascii-table","box-drawing","cli","terminal","formatting"],
    transform: createStandardSkillTransform({
      sectionName: "Unicode Box-Drawing Table Protocol",
      ruSectionName: "Спецификация терминальной таблицы Unicode Box-Drawing",
      instructions: [
        "Draw tables using crisp Unicode box-drawing characters: ┌, ─, ┬, ┐, │, ├, ┼, ┤, └, ┴, ┘.",
        "Enforce strict monospaced column width alignment; calculate visual string widths considering multi-byte UTF-8 glyphs.",
        "Right-align numerical metrics and left-align text headers and string descriptions.",
        "Ensure pristine, distortion-free rendering in standard 80-column and 120-column terminal emulators."
],
      ruInstructions: [
        "Стройте таблицы с использованием символов псевдографики Unicode (┌, ─, ┬, ┐, │, ├, ┼, ┤, └, ┴, ┘).",
        "Выравнивайте столбцы по ширине с учетом визуальной ширины многобайтовых символов UTF-8.",
        "Выравнивайте числа по правому краю, а текст и заголовки — по левому краю.",
        "Обеспечивайте аккуратное отображение без переносов строк в стандартных окнах терминала (80/120 колонок)."
],
      semanticType: "structural_directive",
      tags: ["output","ascii-table","box-drawing","cli","terminal","formatting"],
    }),
  },

  "helm-chart-values-yaml": {
    id: "helm-chart-values-yaml",
    name: "HelmChartValuesYamlSkill",
    displayName: "Kubernetes Helm Chart values.yaml Configuration Spec",
    categoryId: "output",
    description: "Formats configuration payloads as clean, well-commented Kubernetes Helm values.yaml files with typed resource limits, probes, and ingress rules.",
    tags: ["output","helm","kubernetes","values-yaml","devops","cloud-native"],
    transform: createStandardSkillTransform({
      sectionName: "Helm values.yaml Specification",
      ruSectionName: "Спецификация конфигурации Helm values.yaml для Kubernetes",
      instructions: [
        "Format output strictly as valid YAML conforming to Helm chart configuration conventions.",
        "Include standard top-level blocks: `replicaCount`, `image`, `serviceAccount`, `ingress`, `resources`, `nodeSelector`.",
        "Define production CPU/Memory requests and limits with conservative defaults.",
        "Add informative YAML comments explaining the purpose, constraints, and valid ranges for all configurable keys."
],
      ruInstructions: [
        "Форматируйте вывод как валидный YAML по стандартам написания Helm-чартов Kubernetes.",
        "Включайте базовые разделы: `replicaCount`, `image`, `serviceAccount`, `ingress`, `resources`, `autoscaling`.",
        "Задавайте реалистичные запросы и лимиты ресурсов (requests/limits) по CPU и оперативной памяти.",
        "Снабжайте параметры подробными комментариями о назначении ключей и допустимых значениях."
],
      semanticType: "structural_directive",
      tags: ["output","helm","kubernetes","values-yaml","devops","cloud-native"],
    }),
  },

  "systemd-service-unit-file": {
    id: "systemd-service-unit-file",
    name: "SystemdServiceUnitFileSkill",
    displayName: "Linux systemd Service Unit (.service) Specification",
    categoryId: "output",
    description: "Generates secure, hardened Linux systemd service unit files with sandboxing directives, restart policies, and resource bounds.",
    tags: ["output","systemd","linux","sysadmin","devops","service-unit"],
    transform: createStandardSkillTransform({
      sectionName: "systemd Service Unit Specification",
      ruSectionName: "Спецификация сервисного юнита Linux systemd (.service)",
      instructions: [
        "Structure unit files into standard sections: `[Unit]`, `[Service]`, and `[Install]`.",
        "Incorporate modern systemd security hardening directives: `NoNewPrivileges=true`, `ProtectSystem=strict`, `ProtectHome=true`, `PrivateTmp=true`.",
        "Configure deterministic restart policies: `Restart=on-failure`, `RestartSec=5s`.",
        "Define resource bounds via `CPUQuota=` and `MemoryMax=` directives."
],
      ruInstructions: [
        "Структурируйте файл юнита по разделам: `[Unit]`, `[Service]` и `[Install]`.",
        "Внедряйте директивы безопасной изоляции: `NoNewPrivileges=true`, `ProtectSystem=strict`, `PrivateTmp=true`.",
        "Настраивайте политики автоматического перезапуска: `Restart=on-failure`, `RestartSec=5s`.",
        "Ограничивайте ресурсы службы через параметры `MemoryMax=` и `CPUQuota=`."
],
      semanticType: "structural_directive",
      tags: ["output","systemd","linux","sysadmin","devops","service-unit"],
    }),
  },

  "nginx-reverse-proxy-conf": {
    id: "nginx-reverse-proxy-conf",
    name: "NginxReverseProxyConfSkill",
    displayName: "Nginx Reverse Proxy & SSL Hardening Configuration",
    categoryId: "output",
    description: "Formats web server configurations as hardened, production-ready Nginx server blocks with SSL termination, modern ciphers, and security headers.",
    tags: ["output","nginx","reverse-proxy","ssl","sysadmin","security-headers"],
    transform: createStandardSkillTransform({
      sectionName: "Nginx Configuration Specification",
      ruSectionName: "Спецификация конфигурации веб-сервера Nginx с SSL и заголовками безопасности",
      instructions: [
        "Write clean, modular Nginx server block configurations with clear syntax and proper directive nesting.",
        "Enforce modern TLS standards: TLSv1.2/1.3, forward secrecy ciphers, and OCSP stapling.",
        "Inject essential HTTP security headers: HSTS, X-Frame-Options, X-Content-Type-Options, Content-Security-Policy.",
        "Configure optimized reverse proxy directives: `proxy_pass`, `proxy_set_header`, buffer sizes, and timeouts."
],
      ruInstructions: [
        "Формируйте конфигурационный блок Nginx с корректной вложенностью директив и синтаксисом.",
        "Настраивайте современные параметры TLS (версии 1.2/1.3, безопасные шифры, OCSP Stapling).",
        "Внедряйте обязательные заголовки безопасности: HSTS, X-Content-Type-Options, CSP, X-Frame-Options.",
        "Задавайте оптимальные параметры обратного прокси: `proxy_pass`, заголовки клиента, буферы и тайм-ауты."
],
      semanticType: "structural_directive",
      tags: ["output","nginx","reverse-proxy","ssl","sysadmin","security-headers"],
    }),
  },

  "prometheus-metrics-exposition": {
    id: "prometheus-metrics-exposition",
    name: "PrometheusMetricsExpositionSkill",
    displayName: "Prometheus / OpenMetrics Text Exposition Format",
    categoryId: "output",
    description: "Outputs monitoring metrics strictly adhering to the Prometheus OpenMetrics text exposition format with TYPE, HELP, and label dimensions.",
    tags: ["output","prometheus","openmetrics","monitoring","observability","metrics"],
    transform: createStandardSkillTransform({
      sectionName: "Prometheus OpenMetrics Exposition Protocol",
      ruSectionName: "Спецификация экспорта метрик Prometheus / OpenMetrics",
      instructions: [
        "Format each metric with mandatory `# HELP <metric_name> <description>` and `# TYPE <metric_name> <type>` headers.",
        "Support valid metric types: `counter`, `gauge`, `histogram`, `summary`.",
        "Structure multi-dimensional labels cleanly: `metric_name{label1=\"value1\",label2=\"value2\"} <number>`.",
        "Ensure metric names follow Prometheus naming conventions (suffix with _total, _bytes, _seconds)."
],
      ruInstructions: [
        "Снабжайте каждую метрику обязательными служебными строками `# HELP` и `# TYPE`.",
        "Используйте стандартные типы метрик: `counter`, `gauge`, `histogram` или `summary`.",
        "Оформляйте многомерные метки по стандарту: `metric_name{label=\"value\"} <числовой_показатель>`.",
        "Соблюдайте правила именования метрик (суффиксы единиц измерения: `_total`, `_bytes`, `_seconds`)."
],
      semanticType: "structural_directive",
      tags: ["output","prometheus","openmetrics","monitoring","observability","metrics"],
    }),
  },

  "ansible-playbook-yaml-spec": {
    id: "ansible-playbook-yaml-spec",
    name: "AnsiblePlaybookYamlSpecSkill",
    displayName: "Ansible Idempotent Automation Playbook YAML",
    categoryId: "output",
    description: "Formats automation tasks as clean, idempotent Ansible playbooks with FQCN module names, handlers, and failure blocks.",
    tags: ["output","ansible","playbook","iac","devops","automation"],
    transform: createStandardSkillTransform({
      sectionName: "Ansible Playbook Specification",
      ruSectionName: "Спецификация сценария автоматизации Ansible Playbook (YAML)",
      instructions: [
        "Format playbooks in clean YAML starting with `---` and descriptive play names.",
        "Use Fully Qualified Collection Names (FQCN) for all modules (e.g. `ansible.builtin.copy`).",
        "Ensure strict idempotency: tasks must be safe to execute repeatedly without unintended drift.",
        "Incorporate notify triggers, decoupled handler sections, and block/rescue error handling routines."
],
      ruInstructions: [
        "Оформляйте сценарии в формате YAML с маркером начала `---` и понятным описанием целей плейбука.",
        "Используйте полные имена модулей FQCN (например, `ansible.builtin.template`, `ansible.builtin.service`).",
        "Обеспечивайте строгую идемпотентность: повторный запуск плейбука не должен приводить к изменению состояния.",
        "Используйте вызовы хэндлеров (notify/handlers) и обработку исключений через блоки block/rescue."
],
      semanticType: "structural_directive",
      tags: ["output","ansible","playbook","iac","devops","automation"],
    }),
  },

  "env-dotenv-configuration-template": {
    id: "env-dotenv-configuration-template",
    name: "EnvDotenvConfigurationTemplateSkill",
    displayName: "Twelve-Factor App .env & .env.example Specification",
    categoryId: "output",
    description: "Formats application environment variables into structured .env and .env.example files grouped by service tier with documentation.",
    tags: ["output","dotenv","twelve-factor","configuration","env"],
    transform: createStandardSkillTransform({
      sectionName: "Dotenv (.env) Configuration Specification",
      ruSectionName: "Спецификация конфигурации переменных окружения (.env / .env.example)",
      instructions: [
        "Group environment variables logically into commented sections: Server, Database, Auth, External APIs.",
        "Use standard UPPERCASE_SNAKE_CASE variable identifiers.",
        "Provide realistic example placeholder values without leaking live credentials or secrets in `.env.example`.",
        "Annotate each variable with type hints, default values, and required/optional status flags."
],
      ruInstructions: [
        "Группируйте переменные по смысловым блокам: Сервер, База данных, Аутентификация, Внешние API.",
        "Используйте канонический регистр именования переменных: `UPPERCASE_SNAKE_CASE`.",
        "Указывайте безопасные типовые значения в `.env.example` без раскрытия реальных паролей и ключей.",
        "Снабжайте каждую переменную комментариями с указанием типа, дефолтных значений и обязательности."
],
      semanticType: "structural_directive",
      tags: ["output","dotenv","twelve-factor","configuration","env"],
    }),
  },

  "apache-parquet-arrow-schema": {
    id: "apache-parquet-arrow-schema",
    name: "ApacheParquetArrowSchemaSkill",
    displayName: "Apache Arrow & Parquet Columnar Schema Definition",
    categoryId: "output",
    description: "Defines columnar schemas for Apache Arrow and Parquet files with explicit data types, nullability, and compression codecs.",
    tags: ["output","parquet","arrow","columnar","big-data","schema"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Arrow / Parquet Schema Protocol",
      ruSectionName: "Спецификация колоночной схемы данных Apache Arrow / Parquet",
      instructions: [
        "Define schemas with explicit Arrow data types: int64, float64, utf8, timestamp(ns), dictionary, struct, list.",
        "Specify column nullability explicitly for every defined field.",
        "Recommend optimal physical compression codecs (Snappy, ZSTD) based on column cardinality.",
        "Include field metadata dictionaries for analytical documentation and governance."
],
      ruInstructions: [
        "Задавайте точные типы данных Arrow: int64, float64, utf8, timestamp(ns), dictionary, list, struct.",
        "Явно указывайте признак допустимости null-значений (nullable) для каждой колонки.",
        "Рекомендуйте алгоритм сжатия (Snappy, ZSTD) с учетом кардинальности и типа данных колонки.",
        "Включайте блок метаданных полей для документации и систем каталогизации данных."
],
      semanticType: "structural_directive",
      tags: ["output","parquet","arrow","columnar","big-data","schema"],
    }),
  },

  "json-rpc-20-batch-envelope": {
    id: "json-rpc-20-batch-envelope",
    name: "JsonRpc20BatchEnvelopeSkill",
    displayName: "JSON-RPC 2.0 Request / Response & Batch Envelopes",
    categoryId: "output",
    description: "Formats API communications strictly adhering to JSON-RPC 2.0 specifications, including batch requests, notification payloads, and typed errors.",
    tags: ["output","json-rpc","api-spec","protocols","rpc"],
    transform: createStandardSkillTransform({
      sectionName: "JSON-RPC 2.0 Specification Protocol",
      ruSectionName: "Спецификация сообщений и батчей JSON-RPC 2.0",
      instructions: [
        "Format objects strictly with mandatory `\"jsonrpc\": \"2.0\"` header.",
        "For requests: include `\"method\"`, `\"params\"` (array or named object), and unique `\"id\"`.",
        "For responses: include either `\"result\"` or structured `\"error\"` with numeric code and message.",
        "Support array-wrapped batch execution envelopes conforming to standard JSON-RPC 2.0 semantics."
],
      ruInstructions: [
        "Включайте обязательное поле версии `\"jsonrpc\": \"2.0\"` во все передаваемые объекты.",
        "Для запросов: формируйте поля `\"method\"`, `\"params\"` (массив или объект) и идентификатор `\"id\"`.",
        "Для ответов: возвращайте строго либо `\"result\"`, либо типизированную структуру `\"error\"` с кодом ошибки.",
        "Поддерживайте пакетную отправку команд (Batch) в виде массива валидных объектов JSON-RPC."
],
      semanticType: "structural_directive",
      tags: ["output","json-rpc","api-spec","protocols","rpc"],
    }),
  },

  "cypher-neo4j-graph-query": {
    id: "cypher-neo4j-graph-query",
    name: "CypherNeo4jGraphQuerySkill",
    displayName: "OpenCypher / Neo4j Graph Query Specification",
    categoryId: "output",
    description: "Formats graph database queries in OpenCypher syntax with MATCH patterns, WHERE filters, MERGE mutations, and RETURN projections.",
    tags: ["output","cypher","neo4j","graph-database","query-language"],
    transform: createStandardSkillTransform({
      sectionName: "OpenCypher Graph Query Specification",
      ruSectionName: "Спецификация графовых запросов OpenCypher / Neo4j",
      instructions: [
        "Write idiomatic Cypher queries with uppercase keywords: MATCH, WHERE, MERGE, ON CREATE, RETURN.",
        "Use clear ASCII-art graph patterns: `(n:Person)-[:WORKS_AT]->(c:Company)`.",
        "Parameterize dynamic inputs using `$param` syntax to prevent Cypher injection vulnerabilities.",
        "Profile query execution plans: recommend index lookups and avoid unconstrained Cartesian products."
],
      ruInstructions: [
        "Используйте идиоматичный синтаксис Cypher с ключевыми словами в верхнем регистре (MATCH, MERGE, RETURN).",
        "Оформляйте графовые связи в наглядном виде: `(u:User)-[:OWNS]->(a:Account)`.",
        "Параметризуйте динамические данные через `$param` для защиты от инъекций в графовых СУБД.",
        "Оптимизируйте план выполнения: используйте индексы меток и исключайте декартовы произведения узлов."
],
      semanticType: "structural_directive",
      tags: ["output","cypher","neo4j","graph-database","query-language"],
    }),
  },

  "cron-expression-human-annotated": {
    id: "cron-expression-human-annotated",
    name: "CronExpressionHumanAnnotatedSkill",
    displayName: "Annotated Cron Schedule & Natural Language Timing Matrix",
    categoryId: "output",
    description: "Formats cron schedules with 5 or 6-field syntax alongside precise natural language translations, next execution timestamps, and timezone declarations.",
    tags: ["output","cron","scheduling","crontab","automation"],
    transform: createStandardSkillTransform({
      sectionName: "Annotated Cron Schedule Specification",
      ruSectionName: "Спецификация расписаний Cron с человекочитаемым разбором",
      instructions: [
        "Provide the precise 5-field (minute, hour, day-of-month, month, day-of-week) cron expression.",
        "Accompany the expression with an unambiguous plain-language schedule description.",
        "Calculate and display the next 3 projected execution run timestamps in UTC.",
        "Explicitly declare the operational timezone context to avoid daylight saving time ambiguities."
],
      ruInstructions: [
        "Предоставляйте точную пятизначную строку cron (минута, час, день месяца, месяц, день недели).",
        "Прилагайте однозначное текстовое описание периодичности на понятном естественном языке.",
        "Выводите расчетные даты следующих 3 запусков с указанием точного времени в UTC.",
        "Явно фиксируйте часовой пояс выполнения для исключения сбоев при переходе на летнее/зимнее время."
],
      semanticType: "structural_directive",
      tags: ["output","cron","scheduling","crontab","automation"],
    }),
  },

  "git-commit-conventional-format": {
    id: "git-commit-conventional-format",
    name: "GitCommitConventionalFormatSkill",
    displayName: "Conventional Commits 1.0.0 Specification Format",
    categoryId: "output",
    description: "Structures git commit messages according to Conventional Commits v1.0.0: type(scope): subject, detailed body, and footer references.",
    tags: ["output","git","conventional-commits","version-control","changelog"],
    transform: createStandardSkillTransform({
      sectionName: "Conventional Commits 1.0.0 Specification",
      ruSectionName: "Спецификация сообщений коммитов Conventional Commits 1.0.0",
      instructions: [
        "Format header strictly as `<type>(<optional scope>): <imperative subject>` under 72 characters.",
        "Use standardized types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.",
        "Write imperative present-tense subjects (e.g. \"add support for...\", not \"added\" or \"adds\").",
        "Indicate breaking changes with `!` before colon or `BREAKING CHANGE:` in the footer."
],
      ruInstructions: [
        "Форматируйте первую строку строго по шаблону: `<тип>(<скоуп>): <краткое описание>` до 72 символов.",
        "Используйте стандартные типы: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `ci`, `chore`.",
        "Формулируйте суть изменения в повелительном наклонении настоящего времени (\"добавить...\", а не \"добавил\").",
        "Выделяйте ломающие изменения восклицательным знаком `feat!:` или блоком `BREAKING CHANGE:` в подвале."
],
      semanticType: "structural_directive",
      tags: ["output","git","conventional-commits","version-control","changelog"],
    }),
  },

  "caddyfile-web-server-config": {
    id: "caddyfile-web-server-config",
    name: "CaddyfileWebServerConfigSkill",
    displayName: "Caddyfile Web Server Configuration with Auto-HTTPS",
    categoryId: "output",
    description: "Formats clean, modern Caddy web server configurations with automated TLS certificates, reverse proxies, compression, and security headers.",
    tags: ["output","caddy","caddyfile","web-server","devops","reverse-proxy"],
    transform: createStandardSkillTransform({
      sectionName: "Caddyfile Configuration Specification",
      ruSectionName: "Спецификация конфигурации веб-сервера Caddyfile",
      instructions: [
        "Write idiomatic Caddyfile blocks with clear domain declarations and curly brace nesting.",
        "Configure automated Let Encrypt TLS certificate provisioning and HTTP-to-HTTPS redirection.",
        "Incorporate zstd and gzip compression directives with `encode zstd gzip`.",
        "Set up reverse proxy upstreams with health checks, load balancing policies, and header forwarding."
],
      ruInstructions: [
        "Формируйте конфигурационные блоки Caddyfile с объявлением доменов и понятной структурой.",
        "Настраивайте автоматическое получение сертификатов Let Encrypt и перенаправление с HTTP на HTTPS.",
        "Включайте эффективное сжатие трафика директивой `encode zstd gzip`.",
        "Описывайте проксирование (`reverse_proxy`) с проверкой доступности бэкендов и передачей заголовков."
],
      semanticType: "structural_directive",
      tags: ["output","caddy","caddyfile","web-server","devops","reverse-proxy"],
    }),
  },

  "svg-vector-graphics-canvas": {
    id: "svg-vector-graphics-canvas",
    name: "SvgVectorGraphicsCanvasSkill",
    displayName: "Clean Standalone Scalable Vector Graphics (SVG) Canvas",
    categoryId: "output",
    description: "Generates valid, standalone Scalable Vector Graphics (SVG) XML files with precise viewBox coordinates, path data, and embedded CSS styling.",
    tags: ["output","svg","vector-graphics","xml","visualization","design"],
    transform: createStandardSkillTransform({
      sectionName: "Standalone SVG Specification",
      ruSectionName: "Спецификация масштабируемой векторной графики SVG (XML)",
      instructions: [
        "Output valid standalone SVG root: `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 W H\">`.",
        "Use semantic SVG elements: `<defs>`, `<g>`, `<path>`, `<rect>`, `<circle>`, `<text>`.",
        "Style elements using inline presentation attributes or embedded `<style>` blocks with CSS variables.",
        "Ensure responsive scaling across all display viewports without raster distortion or text clipping."
],
      ruInstructions: [
        "Формируйте валидный XML-документ SVG с обязательными атрибутами `xmlns` и `viewBox`.",
        "Используйте семантические графические примитивы: `<defs>`, `<g>`, `<path>`, `<rect>`, `<text>`.",
        "Задавайте стили через атрибуты оформления или встроенный блок `<style>` с переменными CSS.",
        "Обеспечивайте адаптивное масштабирование графики без искажений и обрезки надписей."
],
      semanticType: "structural_directive",
      tags: ["output","svg","vector-graphics","xml","visualization","design"],
    }),
  },

  "html-email-responsive-table": {
    id: "html-email-responsive-table",
    name: "HtmlEmailResponsiveTableSkill",
    displayName: "Bulletproof Responsive HTML Email Template",
    categoryId: "output",
    description: "Formats transactional emails as bulletproof HTML using nested table architecture, inline CSS styles, and MSO conditional comments for Outlook compatibility.",
    tags: ["output","html-email","email-templates","responsive","outlook-safe"],
    transform: createStandardSkillTransform({
      sectionName: "Responsive HTML Email Template Specification",
      ruSectionName: "Спецификация адаптивного HTML-шаблона для почтовых рассылок",
      instructions: [
        "Construct layout strictly using nested `<table>` elements with explicit cellpadding=\"0\" and cellspacing=\"0\".",
        "Inline all CSS styling directly onto HTML elements; avoid external stylesheets or unsupported flex/grid rules.",
        "Include MSO conditional comments `<!--[if mso]>` for legacy Microsoft Outlook desktop clients.",
        "Ensure responsive fluid rendering across mobile clients via max-width containers and media queries."
],
      ruInstructions: [
        "Стройте верстку исключительно на таблицах `<table>` с явным обнулением отступов (cellpadding=\"0\").",
        "Инлайньте все CSS-стили непосредственно в атрибуты `style=\"\"` тегов; не используйте flex/grid.",
        "Включайте условные комментарии `<!--[if mso]>` для корректного отображения в Outlook.",
        "Обеспечивайте адаптивность на смартфонах с помощью контейнеров с max-width и мобильных медиа-запросов."
],
      semanticType: "structural_directive",
      tags: ["output","html-email","email-templates","responsive","outlook-safe"],
    }),
  },

  "fhir-bundle-hl7-json": {
    id: "fhir-bundle-hl7-json",
    name: "FhirBundleHl7JsonSkill",
    displayName: "FHIR R4 HL7 Clinical Resource Bundle JSON",
    categoryId: "output",
    description: "Generates healthcare data strictly structured as HL7 FHIR Release 4 JSON resource bundles (Patient, Observation, Condition, Encounter).",
    tags: ["output","fhir","hl7","healthcare","clinical-data","interoperability"],
    transform: createStandardSkillTransform({
      sectionName: "FHIR R4 Resource Bundle Specification",
      ruSectionName: "Спецификация медицинского бандла FHIR R4 (HL7 JSON)",
      instructions: [
        "Structure root as `\"resourceType\": \"Bundle\"` with defined bundle `\"type\": \"collection\"` or `\"transaction\"`.",
        "Format entries using standard FHIR resources: Patient, Observation, DiagnosticReport, Encounter.",
        "Utilize standard LOINC and SNOMED-CT medical coding systems in coding arrays.",
        "Ensure dates and temporal values conform to ISO 8601 formatting."
],
      ruInstructions: [
        "Задавайте корневой тип `\"resourceType\": \"Bundle\"` с типом пакета `\"collection\"` или `\"transaction\"`.",
        "Описывайте вложенные ресурсы по стандарту FHIR R4: Patient, Observation, Condition, Encounter.",
        "Используйте официальные системы кодирования LOINC и SNOMED-CT в массивах `coding`.",
        "Форматируйте все даты и временные интервалы строго по стандарту ISO 8601."
],
      semanticType: "structural_directive",
      tags: ["output","fhir","hl7","healthcare","clinical-data","interoperability"],
    }),
  },

  "edifact-x12-edi-interchange": {
    id: "edifact-x12-edi-interchange",
    name: "EdifactX12EdiInterchangeSkill",
    displayName: "Electronic Data Interchange (EDI ANSI X12 / EDIFACT) Stream",
    categoryId: "output",
    description: "Formats B2B supply chain transactions as standard EDI segment streams (e.g. X12 850 Purchase Order, 810 Invoice) with element delimiters.",
    tags: ["output","edi","x12","edifact","b2b","supply-chain"],
    transform: createStandardSkillTransform({
      sectionName: "EDI Interchange Stream Specification",
      ruSectionName: "Спецификация сегментов электронного обмена данными (EDI ANSI X12)",
      instructions: [
        "Format data as serialized EDI segments separated by segment terminators (e.g. `~` for X12, `'` for EDIFACT).",
        "Include standard envelope headers: ISA/GS (X12) or UNB/UNH (EDIFACT).",
        "Structure transaction sets with exact mandatory segment sequences: ST, BIG/BGM, N1, PO1/LIN, CTT, SE, GE, IEA.",
        "Provide an annotated table translating segment codes into readable business data fields."
],
      ruInstructions: [
        "Формируйте данные в виде последовательности EDI-сегментов, разделенных терминаторами (`~` для X12).",
        "Включайте обязательные конверты обмена: ISA/GS (X12) или UNB/UNH (EDIFACT).",
        "Соблюдайте последовательность сегментов транзакции: ST, BIG, N1, PO1, CTT, SE, GE, IEA.",
        "Прилагайте пояснительную таблицу с расшифровкой кодов сегментов в понятные бизнес-поля."
],
      semanticType: "structural_directive",
      tags: ["output","edi","x12","edifact","b2b","supply-chain"],
    }),
  },

  "pydantic-v2-dataclass-models": {
    id: "pydantic-v2-dataclass-models",
    name: "PydanticV2DataclassModelsSkill",
    displayName: "Python Pydantic v2 Type-Safe Data Models",
    categoryId: "output",
    description: "Outputs schemas as Python Pydantic v2 BaseModel classes with Field annotations, strict typing, model_validators, and ConfigDict.",
    tags: ["output","pydantic","python","type-safety","data-models"],
    transform: createStandardSkillTransform({
      sectionName: "Pydantic v2 Data Model Specification",
      ruSectionName: "Спецификация моделей данных Python Pydantic v2",
      instructions: [
        "Write Pydantic models inheriting from `pydantic.BaseModel` utilizing v2 syntax.",
        "Annotate fields using `Field(..., description=\"...\", ge=..., le=...)` for validation bounds.",
        "Implement custom business logic validation via `@field_validator` and `@model_validator(mode=\"after\")`.",
        "Configure model settings via `model_config = ConfigDict(strict=True, frozen=True)`."
],
      ruInstructions: [
        "Описывайте классы моделей с наследованием от `pydantic.BaseModel` по стандартам синтаксиса v2.",
        "Аннотируйте поля конструкцией `Field(..., description=\"...\", ge=..., le=...)` с валидацией границ.",
        "Реализуйте кастомную валидацию через декораторы `@field_validator` и `@model_validator`.",
        "Задавайте конфигурацию модели через `model_config = ConfigDict(strict=True, frozen=True)`."
],
      semanticType: "structural_directive",
      tags: ["output","pydantic","python","type-safety","data-models"],
    }),
  },

  "typescript-discriminated-unions": {
    id: "typescript-discriminated-unions",
    name: "TypescriptDiscriminatedUnionsSkill",
    displayName: "Strict TypeScript Discriminated Unions & Type Guards",
    categoryId: "output",
    description: "Formats domain states as exhaustive TypeScript discriminated union types with discriminant literal tags and type-narrowing guard functions.",
    tags: ["output","typescript","discriminated-unions","type-safety","exhaustiveness"],
    transform: createStandardSkillTransform({
      sectionName: "TypeScript Discriminated Union Specification",
      ruSectionName: "Спецификация размеченных объединений (Discriminated Unions) в TypeScript",
      instructions: [
        "Design state unions with a shared common discriminant property (e.g. `type: \"loading\" | \"success\" | \"error\"`).",
        "Make payload properties strictly specific to their respective union variant.",
        "Provide companion user-defined type guard functions (`isSuccess(val): val is SuccessState`).",
        "Include an exhaustive pattern matching switch example enforcing never-type default branches."
],
      ruInstructions: [
        "Проектируйте объединения состояний с общим литеральным дискриминантом (`status: \"idle\" | \"ready\" | \"failed\"`).",
        "Делайте полезные данные доступными строго внутри соответствующих вариантов объединения.",
        "Предоставляйте пользовательские функции проверки типов (Type Guards: `val is ReadyState`).",
        "Демонстрируйте исчерпывающую обработку в switch с проверкой ветки default через тип `never`."
],
      semanticType: "structural_directive",
      tags: ["output","typescript","discriminated-unions","type-safety","exhaustiveness"],
    }),
  },

  "bicep-azure-infrastructure-spec": {
    id: "bicep-azure-infrastructure-spec",
    name: "BicepAzureInfrastructureSpecSkill",
    displayName: "Microsoft Azure Bicep Declarative Infrastructure Spec",
    categoryId: "output",
    description: "Formats cloud infrastructure as modular Microsoft Azure Bicep code with typed parameters, secure outputs, and resource decorators.",
    tags: ["output","bicep","azure","iac","cloud-infrastructure"],
    transform: createStandardSkillTransform({
      sectionName: "Azure Bicep Infrastructure Specification",
      ruSectionName: "Спецификация инфраструктуры Microsoft Azure Bicep",
      instructions: [
        "Write clean, modular Azure Bicep code targeting current resource API versions.",
        "Annotate parameters with `@description()`, `@secure()`, and allowed values constraints.",
        "Declare resource dependencies explicitly or leverage symbolic parent-child references.",
        "Return safe, non-sensitive resource endpoints and managed identity client IDs in outputs."
],
      ruInstructions: [
        "Формируйте код Azure Bicep с актуальными версиями API облачных провайдеров ресурсов.",
        "Аннотируйте параметры декораторами `@description()`, `@secure()` и ограничениями значений.",
        "Описывайте зависимости ресурсов явно или через символические ссылки родитель-потомок.",
        "Возвращайте идентификаторы созданных ресурсов и эндпоинты в блоках `output`."
],
      semanticType: "structural_directive",
      tags: ["output","bicep","azure","iac","cloud-infrastructure"],
    }),
  },

  "gitlab-ci-yml-pipeline-spec": {
    id: "gitlab-ci-yml-pipeline-spec",
    name: "GitlabCiYmlPipelineSpecSkill",
    displayName: "GitLab CI/CD Pipeline (.gitlab-ci.yml) Specification",
    categoryId: "output",
    description: "Formats continuous integration pipelines as modular .gitlab-ci.yml configurations with stages, artifacts, caching, and rule conditions.",
    tags: ["output","gitlab-ci","ci-cd","devops","pipelines"],
    transform: createStandardSkillTransform({
      sectionName: "GitLab CI/CD Pipeline Specification",
      ruSectionName: "Спецификация конвейера сборки GitLab CI/CD (.gitlab-ci.yml)",
      instructions: [
        "Define clear sequential pipeline `stages`: test, build, security, deploy.",
        "Configure dependency caching (`cache:`) and build outputs forwarding (`artifacts:`).",
        "Use modern `rules:` syntax instead of deprecated only/except conditionals.",
        "Employ hidden template jobs (`.template:`) and `extends:` to maximize configuration reuse."
],
      ruInstructions: [
        "Задавайте последовательные этапы конвейера в блоке `stages`: lint, test, build, deploy.",
        "Настраивайте эффективное кэширование зависимостей (`cache:`) и передачу артефактов (`artifacts:`).",
        "Используйте современный синтаксис условий `rules:` вместо устаревших директив only/except.",
        "Применяйте скрытые шаблоны задач (`.base_job:`) и ключевое слово `extends:` для DRY-структуры."
],
      semanticType: "structural_directive",
      tags: ["output","gitlab-ci","ci-cd","devops","pipelines"],
    }),
  },

  "editorconfig-code-style-spec": {
    id: "editorconfig-code-style-spec",
    name: "EditorconfigCodeStyleSpecSkill",
    displayName: "Multi-Language .editorconfig Code Style Specification",
    categoryId: "output",
    description: "Formats project coding standards as a canonical .editorconfig file with indentation, charset, and newline rules across file globs.",
    tags: ["output","editorconfig","code-style","formatting","developer-experience"],
    transform: createStandardSkillTransform({
      sectionName: "EditorConfig Specification",
      ruSectionName: "Спецификация форматирования кода .editorconfig",
      instructions: [
        "Declare `root = true` at the top of the file to stop configuration traversal.",
        "Establish global baseline defaults: `charset = utf-8`, `end_of_line = lf`, `trim_trailing_whitespace = true`.",
        "Configure language-specific glob sections: e.g. `[*.{js,ts,tsx}]` with indent_size = 2.",
        "Ensure standard compatibility across VS Code, IntelliJ, and Vim editors."
],
      ruInstructions: [
        "Объявляйте директиву `root = true` в начале файла для остановки поиска родительских конфигов.",
        "Задавайте глобальные стандарты: `charset = utf-8`, `end_of_line = lf`, `insert_final_newline = true`.",
        "Настраивайте специфичные секции по маскам файлов (`[*.py] indent_size = 4`, `[*.ts] indent_size = 2`).",
        "Гарантируйте совместимость со всеми популярными IDE (VS Code, WebStorm, Vim)."
],
      semanticType: "structural_directive",
      tags: ["output","editorconfig","code-style","formatting","developer-experience"],
    }),
  },

  "robots-txt-sitemap-xml-bundle": {
    id: "robots-txt-sitemap-xml-bundle",
    name: "RobotsTxtSitemapXmlBundleSkill",
    displayName: "Robots.txt & XML Sitemap Search Indexing Bundle",
    categoryId: "output",
    description: "Generates valid search engine crawling configurations, pairing a robots.txt directive suite with a fully-compliant XML Sitemap (RFC 0.9).",
    tags: ["output","robots-txt","sitemap-xml","seo","web-standards"],
    transform: createStandardSkillTransform({
      sectionName: "Robots.txt & Sitemap.xml Specification",
      ruSectionName: "Спецификация поисковой индексации Robots.txt и Sitemap.xml",
      instructions: [
        "Robots.txt: Specify User-agent rules, Disallow private/admin paths, and declare the absolute Sitemap URI.",
        "Sitemap.xml: Format compliant XML with `<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">`.",
        "Include mandatory `<loc>` URLs alongside valid `<lastmod>` timestamps in W3C format.",
        "Specify valid `<changefreq>` and relative `<priority>` ratings for key entry points."
],
      ruInstructions: [
        "Robots.txt: Задавайте правила для User-agent, закрывайте служебные каталоги и указывайте путь к Sitemap.",
        "Sitemap.xml: Генерируйте валидный XML со схемой `http://www.sitemaps.org/schemas/sitemap/0.9`.",
        "Заполняйте теги `<loc>` абсолютными URL и даты `<lastmod>` в формате ISO 8601.",
        "Задавайте относительные веса приоритетов `<priority>` и частоту обновлений `<changefreq>`."
],
      semanticType: "structural_directive",
      tags: ["output","robots-txt","sitemap-xml","seo","web-standards"],
    }),
  },

  "sonarqube-quality-gate-metrics": {
    id: "sonarqube-quality-gate-metrics",
    name: "SonarqubeQualityGateMetricsSkill",
    displayName: "SonarQube Generic Issue Import & Quality Gate Report",
    categoryId: "output",
    description: "Formats code audit findings as SonarQube Generic Issue Import JSON files with severity, type, and file location coordinates.",
    tags: ["output","sonarqube","code-quality","static-analysis","quality-gate"],
    transform: createStandardSkillTransform({
      sectionName: "SonarQube Issue Import JSON Protocol",
      ruSectionName: "Спецификация отчета о качестве SonarQube Generic Issue JSON",
      instructions: [
        "Format output strictly as valid JSON adhering to SonarQube Generic Issue Import schema.",
        "Classify issues into types: `BUG`, `VULNERABILITY`, `CODE_SMELL`.",
        "Assign standard severity levels: `BLOCKER`, `CRITICAL`, `MAJOR`, `MINOR`, `INFO`.",
        "Provide exact primary location metadata: filePath, textRange (startLine, endLine, startOffset)."
],
      ruInstructions: [
        "Генерируйте валидный JSON по спецификации SonarQube Generic Issue Import.",
        "Классифицируйте дефекты по типам: `BUG`, `VULNERABILITY` или `CODE_SMELL`.",
        "Назначайте стандартную строгость: `BLOCKER`, `CRITICAL`, `MAJOR`, `MINOR`, `INFO`.",
        "Указывайте точные координаты местоположения: путь к файлу и диапазон строк (startLine, endLine)."
],
      semanticType: "structural_directive",
      tags: ["output","sonarqube","code-quality","static-analysis","quality-gate"],
    }),
  },

  "fluentd-fluentbit-parser-conf": {
    id: "fluentd-fluentbit-parser-conf",
    name: "FluentdFluentbitParserConfSkill",
    displayName: "Fluent Bit Log Router & RegEx Parser Configuration",
    categoryId: "output",
    description: "Formats log ingestion configurations for Fluent Bit with INPUT, FILTER, PARSER, and OUTPUT blocks supporting structured log parsing.",
    tags: ["output","fluent-bit","logging","observability","devops","parsers"],
    transform: createStandardSkillTransform({
      sectionName: "Fluent Bit Configuration Specification",
      ruSectionName: "Спецификация конфигурации сбора логов Fluent Bit",
      instructions: [
        "Structure configuration into distinct `[INPUT]`, `[FILTER]`, `[PARSER]`, and `[OUTPUT]` blocks.",
        "Define regex-based or JSON log parsers with time formatting directives (`Time_Format`, `Time_Key`).",
        "Incorporate record modifier filters to inject environment, host, and cluster metadata.",
        "Configure resilient output destinations (Elasticsearch, Loki, S3) with retry and buffering limits."
],
      ruInstructions: [
        "Структурируйте конфигурацию по блокам: `[INPUT]`, `[FILTER]`, `[PARSER]` и `[OUTPUT]`.",
        "Задавайте парсеры логов (JSON или Regex) с точным указанием формата времени (`Time_Format`).",
        "Используйте фильтры обогащения для добавления метаданных кластера, окружения и хоста.",
        "Настраивайте параметры отправки (Elasticsearch, Loki) с буферизацией и политиками повтора."
],
      semanticType: "structural_directive",
      tags: ["output","fluent-bit","logging","observability","devops","parsers"],
    }),
  },

  "redis-resp-protocol-stream": {
    id: "redis-resp-protocol-stream",
    name: "RedisRespProtocolStreamSkill",
    displayName: "Redis Serialization Protocol (RESP2 / RESP3) Commands",
    categoryId: "output",
    description: "Formats high-throughput caching and pipeline commands in raw Redis Serialization Protocol (RESP) wire format.",
    tags: ["output","redis","resp","caching","protocols","database"],
    transform: createStandardSkillTransform({
      sectionName: "Redis RESP Protocol Wire Specification",
      ruSectionName: "Спецификация сетевого протокола команд Redis (RESP2 / RESP3)",
      instructions: [
        "Format commands as RESP Arrays (`*<count>\\r\\n`) containing Bulk Strings (`$<len>\\r\\n<data>\\r\\n`).",
        "Demonstrate atomic multi-key batch pipelines (e.g. MULTI / EXEC blocks).",
        "Accompany wire format with corresponding human-readable redis-cli commands.",
        "Ensure exact CRLF (`\\r\\n`) delimiter adherence required by Redis socket parsers."
],
      ruInstructions: [
        "Оформляйте команды в виде массивов RESP (`*<кол-во>\\r\\n`) и строк Bulk Strings (`$<длина>\\r\\n`).",
        "Показывайте примеры атомарных пайплайнов (команды MULTI / EXEC).",
        "Прилагайте эквивалентные текстовые команды для утилиты redis-cli.",
        "Соблюдайте строгие разделители строк CRLF (`\\r\\n`), необходимые сокет-парсерам Redis."
],
      semanticType: "structural_directive",
      tags: ["output","redis","resp","caching","protocols","database"],
    }),
  },

  "spdx-software-bill-of-materials": {
    id: "spdx-software-bill-of-materials",
    name: "SpdxSoftwareBillOfMaterialsSkill",
    displayName: "SPDX v2.3 Software Bill of Materials (SBOM) JSON",
    categoryId: "output",
    description: "Outputs software dependencies formatted as official SPDX v2.3 Software Bill of Materials (SBOM) JSON documents with packages, licenses, and relationships.",
    tags: ["output","sbom","spdx","supply-chain","licensing","security"],
    transform: createStandardSkillTransform({
      sectionName: "SPDX v2.3 SBOM Specification",
      ruSectionName: "Спецификация спецификации состава ПО SPDX v2.3 (SBOM JSON)",
      instructions: [
        "Format document adhering strictly to SPDX 2.3 JSON specification with `spdxVersion: \"SPDX-2.3\"`.",
        "Populate `packages` array with name, versionInfo, downloadLocation, and verified licenseConcluded.",
        "Include cryptographic checksums (SHA-256) for every listed component.",
        "Express dependency links inside the `relationships` array (`DEPENDS_ON`, `CONTAINS`)."
],
      ruInstructions: [
        "Формируйте документ по официальной схеме SPDX 2.3 с указанием `spdxVersion: \"SPDX-2.3\"`.",
        "Заполняйте массив `packages`: имя пакета, версия, URL загрузки и проверенная лицензия `licenseConcluded`.",
        "Указывайте криптографические контрольные суммы (SHA-256) для каждого компонента.",
        "Описывайте граф зависимостей внутри массива `relationships` (`DEPENDS_ON`, `CONTAINS`)."
],
      semanticType: "structural_directive",
      tags: ["output","sbom","spdx","supply-chain","licensing","security"],
    }),
  },

  "apple-shortcuts-workflow-json": {
    id: "apple-shortcuts-workflow-json",
    name: "AppleShortcutsWorkflowJsonSkill",
    displayName: "Apple iOS Shortcuts Action Dictionary Workflow Format",
    categoryId: "output",
    description: "Formats mobile automation workflows as structured Apple Shortcuts action dictionaries with parameters, input pipes, and conditional gates.",
    tags: ["output","apple-shortcuts","ios","automation","workflow"],
    transform: createStandardSkillTransform({
      sectionName: "Apple Shortcuts Action Workflow Specification",
      ruSectionName: "Спецификация структуры автоматизации Apple Shortcuts (iOS)",
      instructions: [
        "Structure the workflow as an ordered sequence of typed Shortcut Action dictionaries.",
        "Specify WFWorkflowActionIdentifier identifiers and corresponding WFWorkflowActionParameters.",
        "Map data passing between actions using explicit input/output variable tokens.",
        "Provide human-readable step-by-step setup guides accompanying the raw action dictionary."
],
      ruInstructions: [
        "Структурируйте сценарий как упорядоченный список словарей действий Apple Shortcuts.",
        "Указывайте идентификаторы действий `WFWorkflowActionIdentifier` и параметры `WFWorkflowActionParameters`.",
        "Описывайте передачу переменных между последовательными блоками сценария.",
        "Прилагайте пошаговую инструкцию по ручной сборке быстрой команды в приложении."
],
      semanticType: "structural_directive",
      tags: ["output","apple-shortcuts","ios","automation","workflow"],
    }),
  },

  "webpack-vite-bundler-config-esm": {
    id: "webpack-vite-bundler-config-esm",
    name: "WebpackViteBundlerConfigEsmSkill",
    displayName: "Production Vite / Webpack Bundler Configuration (ESM)",
    categoryId: "output",
    description: "Formats modern frontend build tooling configurations (vite.config.ts) with plugins, code-splitting chunks, path aliases, and proxy routes.",
    tags: ["output","vite","webpack","bundler","frontend-build","typescript"],
    transform: createStandardSkillTransform({
      sectionName: "Vite / Bundler Configuration Specification",
      ruSectionName: "Спецификация конфигурации сборщика Vite / Webpack (ESM)",
      instructions: [
        "Write modern ESM configuration using `defineConfig` in TypeScript.",
        "Configure manual chunk splitting inside `rollupOptions.output.manualChunks` to optimize browser caching.",
        "Set up path aliases (e.g. `@/*` -> `./src/*`) matching tsconfig.json paths.",
        "Configure development proxy rules for seamless local backend API forwarding."
],
      ruInstructions: [
        "Пишите конфигурацию в формате ESM с использованием `defineConfig` на TypeScript.",
        "Настраивайте разделение чанков (`manualChunks`) для эффективного кэширования в браузере.",
        "Задавайте алиасы путей (`@/*` -> `./src/*`), согласованные с файлом tsconfig.json.",
        "Описывайте правила локального проксирования запросов к API бэкенда в режиме разработки."
],
      semanticType: "structural_directive",
      tags: ["output","vite","webpack","bundler","frontend-build","typescript"],
    }),
  },

  "json-patch-rfc6902-operations": {
    id: "json-patch-rfc6902-operations",
    name: "JsonPatchRfc6902OperationsSkill",
    displayName: "JSON Patch (RFC 6902) Atomic Mutation Operations",
    categoryId: "output",
    description: "Formats atomic document updates strictly as RFC 6902 JSON Patch arrays with op, path, value, and from attributes.",
    tags: ["output","json-patch","rfc6902","mutations","api-standards"],
    transform: createStandardSkillTransform({
      sectionName: "JSON Patch RFC 6902 Specification",
      ruSectionName: "Спецификация атомарных операций JSON Patch (RFC 6902)",
      instructions: [
        "Format output strictly as an array of JSON Patch operation objects.",
        "Use valid RFC 6902 operation verbs: `add`, `remove`, `replace`, `move`, `copy`, `test`.",
        "Format paths strictly using JSON Pointer (RFC 6901) forward-slash notation (e.g. `/users/0/email`).",
        "Include `test` precondition operations to guarantee optimistic concurrency and prevent conflicting writes."
],
      ruInstructions: [
        "Форматируйте вывод строго как массив объектов операций стандарта JSON Patch.",
        "Используйте стандартные глаголы операций: `add`, `remove`, `replace`, `move`, `copy`, `test`.",
        "Указывайте пути строго в нотации JSON Pointer (RFC 6901) через слеши (`/items/0/status`).",
        "Включайте предварительные операции `test` для проверки оптимистической блокировки и защиты от коллизий."
],
      semanticType: "structural_directive",
      tags: ["output","json-patch","rfc6902","mutations","api-standards"],
    }),
  },
  "output-json-schema-strict-draft-07": {
    id: "output-json-schema-strict-draft-07",
    name: "OutputJsonSchemaStrictDraft07Skill",
    displayName: "Strict JSON Schema (Draft-07) Formatted Output",
    categoryId: "output",
    description: "Enforces 100% compliant JSON Schema Draft-07 syntax with typed definitions, required fields, and no additional properties.",
    tags: ["output","json-schema","draft-07","type-safety","api"],
    transform: createStandardSkillTransform({
      sectionName: "Strict JSON Schema (Draft-07) Specification",
      ruSectionName: "Форматирование вывода по схеме JSON Schema Draft-07",
      instructions: [
        "Output strictly valid JSON Schema Draft-07 format: `{ \"$schema\": \"http://json-schema.org/draft-07/schema#\", ... }`.",
        "Explicitly enumerate `required` array and set `additionalProperties: false`.",
        "Include semantic `description` and `type` for every declared property."
],
      ruInstructions: [
        "Форматируйте вывод строго по стандарту JSON Schema Draft-07.",
        "Указывайте список обязательных полей `required` и `additionalProperties: false`.",
        "Добавляйте понятные описания и типы для каждого свойства схемы."
],
      semanticType: "domain_specific",
      tags: ["output","json-schema","draft-07","type-safety","api"],
    }),
  },

  "output-k8s-manifest-yaml-production": {
    id: "output-k8s-manifest-yaml-production",
    name: "OutputK8sManifestYamlProductionSkill",
    displayName: "Production Kubernetes YAML Manifest Standard",
    categoryId: "output",
    description: "Outputs complete, copy-pasteable Kubernetes manifests with resource requests/limits, probes, and securityContext.",
    tags: ["output","kubernetes","yaml","devops","manifests"],
    transform: createStandardSkillTransform({
      sectionName: "Production Kubernetes YAML Manifest Standards",
      ruSectionName: "Стандарт производственных манифестов Kubernetes (YAML)",
      instructions: [
        "Output valid Kubernetes YAML containing `apiVersion`, `kind`, `metadata`, and `spec`.",
        "Include explicit `resources.requests` and `resources.limits` (CPU and Memory).",
        "Embed `livenessProbe`, `readinessProbe`, and hardened `securityContext` (`readOnlyRootFilesystem: true`)."
],
      ruInstructions: [
        "Генерируйте полностью готовые YAML-манифесты Kubernetes со всеми стандартными полями.",
        "Обязательно задавайте лимиты и запросы ресурсов по CPU и оперативной памяти.",
        "Включайте проверки жизнеспособности (Probes) и строгие настройки безопасности (securityContext)."
],
      semanticType: "domain_specific",
      tags: ["output","kubernetes","yaml","devops","manifests"],
    }),
  },

  "output-markdown-executive-memo": {
    id: "output-markdown-executive-memo",
    name: "OutputMarkdownExecutiveMemoSkill",
    displayName: "Standard Executive Memorandum Format (To/From/Date/Subject)",
    categoryId: "output",
    description: "Structures high-stakes executive memos with header metadata, BLUF statement, financial impact, and sign-off.",
    tags: ["output","executive-memo","memo","business-writing","management"],
    transform: createStandardSkillTransform({
      sectionName: "Standard Executive Memorandum Format",
      ruSectionName: "Формат официального исполнительного меморандума (Executive Memo)",
      instructions: [
        "Header block: `MEMORANDUM | TO: [Executive] | FROM: [Author] | DATE: [ISO Date] | SUBJECT: [Topic]`.",
        "Section 1: Executive Summary & Recommendation (BLUF).",
        "Section 2: Strategic Context & Rationale.",
        "Section 3: Financial & Operational Impact Matrix.",
        "Section 4: Next Steps & Immediate Decision Required."
],
      ruInstructions: [
        "Шапка: `МЕМОРАНДУМ | КОМУ | ОТ КОГО | ДАТА | ТЕМА`.",
        "Раздел 1: Краткое резюме и ключевая рекомендация (BLUF).",
        "Раздел 2: Стратегический контекст и обоснование.",
        "Раздел 3: Таблица финансово-операционного эффекта.",
        "Раздел 4: Требуемое решение руководства и следующие шаги."
],
      semanticType: "domain_specific",
      tags: ["output","executive-memo","memo","business-writing","management"],
    }),
  },

  "output-csv-rfc-4180-strict": {
    id: "output-csv-rfc-4180-strict",
    name: "OutputCsvRfc4180StrictSkill",
    displayName: "Strict RFC 4180 CSV Export with Quoting and Escaping",
    categoryId: "output",
    description: "Outputs tabular data formatted strictly to RFC 4180 CSV standard with escaped quotes and standard CRLF endings.",
    tags: ["output","csv","rfc4180","tabular","data-export"],
    transform: createStandardSkillTransform({
      sectionName: "Strict RFC 4180 CSV Formatting Invariants",
      ruSectionName: "Экспорт данных в строгом соответствии со стандартом RFC 4180 CSV",
      instructions: [
        "Format output as clean comma-separated values adhering strictly to RFC 4180.",
        "Wrap fields containing commas, line breaks, or double quotes inside double quotes (`\"...\")`.",
        "Escape internal double quotes with double-quotes (`\"\"`)."
],
      ruInstructions: [
        "Форматируйте данные строго по стандарту RFC 4180 CSV.",
        "Оборачивайте в кавычки поля, содержащие запятые, переносы строк или кавычки.",
        "Экранируйте внутренние кавычки их удвоением (`\"\"`)."
],
      semanticType: "domain_specific",
      tags: ["output","csv","rfc4180","tabular","data-export"],
    }),
  },

  "output-mermaid-sequence-flowchart": {
    id: "output-mermaid-sequence-flowchart",
    name: "OutputMermaidSequenceFlowchartSkill",
    displayName: "Mermaid.js Sequence Diagram & Architecture Flowchart",
    categoryId: "output",
    description: "Generates syntactically pristine Mermaid.js diagram codeblocks for sequence diagrams, ER diagrams, and state charts.",
    tags: ["output","mermaid","diagrams","sequence-diagram","visualization"],
    transform: createStandardSkillTransform({
      sectionName: "Mermaid.js Diagram Specification Standards",
      ruSectionName: "Генерация синтаксически выверенных диаграмм Mermaid.js",
      instructions: [
        "Enclose diagram code inside ````mermaid ... ```` markdown codeblocks.",
        "Use descriptive participant aliases and clear arrow semantics (`->>`, `-->>`, `-.->`).",
        "Verify syntax against standard Mermaid parser rules to prevent frontend rendering crashes."
],
      ruInstructions: [
        "Оборачивайте диаграммы в блоки кода с тегом ````mermaid````.",
        "Используйте понятные имена участников и правильный синтаксис стрелок взаимодействия.",
        "Проверяйте валидность синтаксиса для исключения ошибок рендеринга на клиенте."
],
      semanticType: "domain_specific",
      tags: ["output","mermaid","diagrams","sequence-diagram","visualization"],
    }),
  },

  "output-graphql-schema-sdl-production": {
    id: "output-graphql-schema-sdl-production",
    name: "OutputGraphqlSchemaSdlProductionSkill",
    displayName: "GraphQL Schema Definition Language (SDL) Specification",
    categoryId: "output",
    description: "Outputs production-grade GraphQL SDL schemas with explicit types, inputs, queries, mutations, and docstrings.",
    tags: ["output","graphql","sdl","api","schema-design"],
    transform: createStandardSkillTransform({
      sectionName: "GraphQL Schema Definition Language (SDL) Standard",
      ruSectionName: "Спецификация схемы GraphQL Schema Definition Language (SDL)",
      instructions: [
        "Define clean GraphQL SDL types with non-null modifiers (`!`) and descriptive markdown docstrings `\"\"\"...\"\"\"`.",
        "Segregate read `Query` types from state-mutating `Mutation` and real-time `Subscription` types.",
        "Implement Relay-compliant connection pagination types (`Connection`, `Edge`, `PageInfo`)."
],
      ruInstructions: [
        "Описывайте типы GraphQL SDL с модификаторами обязательности (`!`) и документацией `\"\"\"...\"\"\"`.",
        "Разделяйте типы запросов чтения (Query) и изменения состояния (Mutation).",
        "Используйте стандарт пагинации Relay (Connection, Edge, PageInfo)."
],
      semanticType: "domain_specific",
      tags: ["output","graphql","sdl","api","schema-design"],
    }),
  },

  "output-sql-ddl-postgresql-production": {
    id: "output-sql-ddl-postgresql-production",
    name: "OutputSqlDdlPostgresqlProductionSkill",
    displayName: "Production PostgreSQL 16 DDL with Indexes and Constraints",
    categoryId: "output",
    description: "Outputs complete PostgreSQL DDL with UUID primary keys, foreign keys, CHECK constraints, and btree/gin indexes.",
    tags: ["output","sql","postgresql","ddl","database-design"],
    transform: createStandardSkillTransform({
      sectionName: "Production PostgreSQL DDL Specification",
      ruSectionName: "Промышленный стандарт SQL DDL для PostgreSQL 16",
      instructions: [
        "Use `UUID PRIMARY KEY DEFAULT gen_random_uuid()` and `TIMESTAMPTZ` for all temporal fields.",
        "Define explicit foreign key `ON DELETE CASCADE / SET NULL` constraints.",
        "Create optimized indexes (`CREATE INDEX idx_... ON ... (column);`) for high-cardinality search predicates."
],
      ruInstructions: [
        "Используйте UUID в качестве первичных ключей и TIMESTAMPTZ для временных меток.",
        "Задавайте явные внешние ключи с правилами каскадного удаления.",
        "Создавайте оптимальные B-Tree и GIN индексы для фильтруемых полей."
],
      semanticType: "domain_specific",
      tags: ["output","sql","postgresql","ddl","database-design"],
    }),
  },

  "output-ndjson-json-lines-streaming": {
    id: "output-ndjson-json-lines-streaming",
    name: "OutputNdjsonJsonLinesStreamingSkill",
    displayName: "Newline Delimited JSON (NDJSON / JSONLines) Stream",
    categoryId: "output",
    description: "Outputs high-throughput streaming data formatted as single-line JSON objects separated strictly by newlines.",
    tags: ["output","ndjson","jsonl","streaming","big-data"],
    transform: createStandardSkillTransform({
      sectionName: "Newline Delimited JSON (NDJSON) Stream Standard",
      ruSectionName: "Потоковый формат Newline Delimited JSON (NDJSON / JSONLines)",
      instructions: [
        "Emit each discrete record as a single-line, self-contained JSON object terminated by `\\n`.",
        "Never wrap records inside an outer JSON array or add trailing commas.",
        "Enable instant streaming chunk processing without buffering entire multi-megabyte payloads."
],
      ruInstructions: [
        "Выводите каждую запись в виде отдельного валидного JSON-объекта в одну строку с переносом `\\n`.",
        "Не оборачивайте записи во внешний массив и не ставьте запятые в конце строк.",
        "Обеспечьте возможность потокового построчного чтения без загрузки всего файла в память."
],
      semanticType: "domain_specific",
      tags: ["output","ndjson","jsonl","streaming","big-data"],
    }),
  },

  "output-github-actions-ci-yaml": {
    id: "output-github-actions-ci-yaml",
    name: "OutputGithubActionsCiYamlSkill",
    displayName: "Production GitHub Actions Workflow (.github/workflows)",
    categoryId: "output",
    description: "Outputs battle-hardened GitHub Actions CI/CD YAML workflows with caching, matrix builds, and security scans.",
    tags: ["output","github-actions","ci-cd","yaml","devops","automation"],
    transform: createStandardSkillTransform({
      sectionName: "Production GitHub Actions CI/CD Workflow Standards",
      ruSectionName: "Производственный стандарт пайплайнов GitHub Actions CI/CD",
      instructions: [
        "Generate complete YAML with triggers (`on: [push, pull_request]`), job matrices, and pinned action versions (`actions/checkout@v4`).",
        "Include dependency caching steps (`actions/cache`) to accelerate build execution times.",
        "Integrate automated linting, unit testing, and vulnerability scanning (Trivy/CodeQL)."
],
      ruInstructions: [
        "Создавайте полные YAML-пайплайны с триггерами, матрицами сборки и версионированными экшенами.",
        "Включайте кэширование зависимостей (npm, pip) для ускорения сборки.",
        "Интегрируйте шаги статического анализа, тестирования и сканирования уязвимостей."
],
      semanticType: "domain_specific",
      tags: ["output","github-actions","ci-cd","yaml","devops","automation"],
    }),
  },

  "output-semantic-release-changelog-keepachangelog": {
    id: "output-semantic-release-changelog-keepachangelog",
    name: "OutputSemanticReleaseChangelogKeepachangelogSkill",
    displayName: "Keep a Changelog & Semantic Release Markdown Standard",
    categoryId: "output",
    description: "Outputs changelog entries categorized by Added, Changed, Deprecated, Removed, Fixed, Security adhering to Keep a Changelog.",
    tags: ["output","changelog","keepachangelog","release-notes","documentation"],
    transform: createStandardSkillTransform({
      sectionName: "Keep a Changelog & Semantic Release Standard",
      ruSectionName: "Стандарт ведения истории изменений (Keep a Changelog v1.1.0)",
      instructions: [
        "Categorize release notes under standard H3 headers: `### Added`, `### Changed`, `### Fixed`, `### Security`, `### Deprecated`.",
        "Include version numbers, release dates in ISO format (`[1.4.0] - 2026-09-30`), and comparison diff links.",
        "Write concise, user-focused descriptions in active voice."
],
      ruInstructions: [
        "Группируйте изменения по стандартным разделам: Добавлено, Изменено, Исправлено, Безопасность.",
        "Указывайте версию и дату релиза в формате ISO-8601 со ссылками на коммиты.",
        "Пишите краткие и понятные описания с точки зрения пользователя."
],
      semanticType: "domain_specific",
      tags: ["output","changelog","keepachangelog","release-notes","documentation"],
    }),
  },
  "output-proto3-protocol-buffers-spec": {
    id: "output-proto3-protocol-buffers-spec",
    name: "OutputProto3ProtocolBuffersSpecSkill",
    displayName: "Google Protocol Buffers (Proto3) Service & Message Standard",
    categoryId: "output",
    description: "Outputs syntax-compliant Proto3 definitions with field tags, service RPC definitions, and option annotations.",
    tags: ["output","protobuf","proto3","grpc","serialization"],
    transform: createStandardSkillTransform({
      sectionName: "Google Protocol Buffers (Proto3) Specification",
      ruSectionName: "Стандарт спецификации Google Protocol Buffers (Proto3 / gRPC)",
      instructions: [
        "Output valid `syntax = \"proto3\";` files with package, imports, and options.",
        "Number all message fields sequentially (`string user_id = 1;`).",
        "Define standard gRPC `service` definitions with unary and streaming RPC methods."
],
      ruInstructions: [
        "Форматируйте файл с заголовком `syntax = \"proto3\";` и описанием пакета.",
        "Последовательно нумеруйте теги всех полей структуры данных.",
        "Описывайте gRPC-сервисы с унарными и потоковыми RPC-методами."
],
      semanticType: "domain_specific",
      tags: ["output","protobuf","proto3","grpc","serialization"],
    }),
  },

  "output-dockerfile-multi-stage-hardened": {
    id: "output-dockerfile-multi-stage-hardened",
    name: "OutputDockerfileMultiStageHardenedSkill",
    displayName: "Hardened Multi-Stage Dockerfile Standard",
    categoryId: "output",
    description: "Outputs secure, optimized multi-stage Dockerfiles with non-root users, minimal scratch images, and cache mounts.",
    tags: ["output","dockerfile","containers","multi-stage","devops","security"],
    transform: createStandardSkillTransform({
      sectionName: "Production Hardened Multi-Stage Dockerfile Standards",
      ruSectionName: "Стандарт многоэтапных защищенных Dockerfile (Multi-Stage Build)",
      instructions: [
        "Use Builder stage for dependency compilation (`FROM node:22-alpine AS builder`).",
        "Copy compiled artifacts into a minimal runtime distroless/alpine image.",
        "Create and switch to a non-root unprivileged system user (`USER appuser`)."
],
      ruInstructions: [
        "Используйте этап сборки (Builder) для компиляции и установки зависимостей.",
        "Копируйте только готовые артефакты в минимальный финальный образ (Distroless/Alpine).",
        "Запускайте приложение от имени выделенного непривилегированного пользователя."
],
      semanticType: "domain_specific",
      tags: ["output","dockerfile","containers","multi-stage","devops","security"],
    }),
  },

  "output-terraform-hcl-iac-module": {
    id: "output-terraform-hcl-iac-module",
    name: "OutputTerraformHclIacModuleSkill",
    displayName: "Production Terraform (HCL) Infrastructure-as-Code Module",
    categoryId: "output",
    description: "Outputs clean, modular Terraform HCL code with variables, locals, outputs, and provider version pins.",
    tags: ["output","terraform","hcl","iac","cloud","devops"],
    transform: createStandardSkillTransform({
      sectionName: "Production Terraform (HCL) Module Standard",
      ruSectionName: "Стандарт модулей инфраструктуры как кода Terraform (HCL)",
      instructions: [
        "Structure Terraform code into `main.tf`, `variables.tf`, and `outputs.tf`.",
        "Pin required provider versions (`required_providers { aws = { version = \"~> 5.0\" } }`).",
        "Add explicit types, descriptions, and validation rules to all input variables."
],
      ruInstructions: [
        "Структурируйте код на файлы `main.tf`, `variables.tf`, `outputs.tf`.",
        "Фиксируйте версии провайдеров в блоке `required_providers`.",
        "Задавайте типы, описания и правила валидации для всех входных переменных."
],
      semanticType: "domain_specific",
      tags: ["output","terraform","hcl","iac","cloud","devops"],
    }),
  },

  "output-typescript-zod-schema-validator": {
    id: "output-typescript-zod-schema-validator",
    name: "OutputTypescriptZodSchemaValidatorSkill",
    displayName: "TypeScript & Zod Runtime Schema Validation Standard",
    categoryId: "output",
    description: "Outputs paired Zod schemas (`z.object({...})`) and inferred TypeScript types (`z.infer<typeof schema>`).",
    tags: ["output","zod","typescript","validation","type-safety"],
    transform: createStandardSkillTransform({
      sectionName: "TypeScript Zod Runtime Schema & Type Standards",
      ruSectionName: "Стандарт валидации Zod и генерации типов TypeScript",
      instructions: [
        "Define comprehensive Zod runtime schemas with detailed error messages and string constraints.",
        "Export inferred TypeScript static types using `export type User = z.infer<typeof UserSchema>`.",
        "Include custom refinements and transformations for dates, emails, and UUIDs."
],
      ruInstructions: [
        "Описывайте схемы валидации Zod с проверкой форматов и понятными сообщениями об ошибках.",
        "Экспортируйте статические типы через `z.infer<typeof Schema>`.",
        "Используйте кастомные трансформации для дат и нормализации данных."
],
      semanticType: "domain_specific",
      tags: ["output","zod","typescript","validation","type-safety"],
    }),
  },

  "output-junit-xml-test-reporter": {
    id: "output-junit-xml-test-reporter",
    name: "OutputJunitXmlTestReporterSkill",
    displayName: "JUnit XML Test Results Schema Specification",
    categoryId: "output",
    description: "Outputs automated test execution reports formatted strictly as standard JUnit XML for CI/CD test dashboards.",
    tags: ["output","junit","xml","testing","ci-cd","reports"],
    transform: createStandardSkillTransform({
      sectionName: "JUnit XML Test Results Schema Standard",
      ruSectionName: "Формат отчетов о тестировании JUnit XML для CI/CD",
      instructions: [
        "Output valid XML structure: `<testsuites><testsuite name=\"...\" tests=\"10\" failures=\"0\" time=\"1.2\">`.",
        "Enclose individual tests in `<testcase name=\"...\" classname=\"...\" time=\"...\">`.",
        "Include `<failure message=\"...\">` with stack traces for failed test scenarios."
],
      ruInstructions: [
        "Форматируйте отчет в виде валидного XML-дерева `<testsuites>` и `<testsuite>`.",
        "Описывайте каждый тест тегом `<testcase>` с длительностью выполнения.",
        "Включайте подробный стек ошибки в блок `<failure>` при падении теста."
],
      semanticType: "domain_specific",
      tags: ["output","junit","xml","testing","ci-cd","reports"],
    }),
  },

  "output-asciidoc-technical-documentation": {
    id: "output-asciidoc-technical-documentation",
    name: "OutputAsciidocTechnicalDocumentationSkill",
    displayName: "AsciiDoc (ADOC) Enterprise Technical Manual Standard",
    categoryId: "output",
    description: "Outputs enterprise technical documentation formatted in AsciiDoc with callouts, admonitions, and tables.",
    tags: ["output","asciidoc","adoc","documentation","technical-writing"],
    transform: createStandardSkillTransform({
      sectionName: "AsciiDoc (ADOC) Enterprise Technical Manual Standard",
      ruSectionName: "Стандарт технической документации в формате AsciiDoc (ADOC)",
      instructions: [
        "Use standard AsciiDoc section markers (`= Title`, `== Section`, `=== Subsection`).",
        "Embed standardized Admonition blocks (`NOTE:`, `WARNING:`, `IMPORTANT:`).",
        "Format code callouts (`<1>`, `<2>`) matching numbered annotations below the snippet."
],
      ruInstructions: [
        "Используйте разметку AsciiDoc для заголовков (`=`, `==`, `===`).",
        "Вставляйте блоки предупреждений (`NOTE:`, `WARNING:`, `IMPORTANT:`).",
        "Используйте нумерованные сноски-коллауты (`<1>`, `<2>`) для пояснения строк кода."
],
      semanticType: "domain_specific",
      tags: ["output","asciidoc","adoc","documentation","technical-writing"],
    }),
  },

  "output-plantuml-architecture-diagram": {
    id: "output-plantuml-architecture-diagram",
    name: "OutputPlantumlArchitectureDiagramSkill",
    displayName: "PlantUML C4 Architecture Diagram Standard",
    categoryId: "output",
    description: "Outputs clean PlantUML code enclosed in `@startuml` ... `@enduml` adhering to the C4 Model.",
    tags: ["output","plantuml","c4-model","diagrams","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "PlantUML C4 Architecture Diagram Standard",
      ruSectionName: "Спецификация архитектурных диаграмм PlantUML (C4 Model)",
      instructions: [
        "Enclose diagram code inside `@startuml` and `@enduml` tags.",
        "Use C4 model macros (`Person`, `System`, `Container`, `Component`, `Rel`).",
        "Provide clean layouts and relationship labels with protocols (`Rel(web, api, \"Uses\", \"HTTPS/JSON\")`)."
],
      ruInstructions: [
        "Оборачивайте диаграмму в блок `@startuml` ... `@enduml`.",
        "Используйте макросы стандарта C4 (Person, Container, Component, Rel).",
        "Указывайте протоколы и характер взаимодействия на связях между узлами."
],
      semanticType: "domain_specific",
      tags: ["output","plantuml","c4-model","diagrams","architecture"],
    }),
  },

  "output-sarif-static-analysis-json": {
    id: "output-sarif-static-analysis-json",
    name: "OutputSarifStaticAnalysisJsonSkill",
    displayName: "OASIS SARIF 2.1.0 Static Analysis Results Format",
    categoryId: "output",
    description: "Outputs vulnerability and lint findings in standard Static Analysis Results Interchange Format (SARIF 2.1.0).",
    tags: ["output","sarif","security","static-analysis","github-code-scanning"],
    transform: createStandardSkillTransform({
      sectionName: "OASIS SARIF 2.1.0 Static Analysis Standard",
      ruSectionName: "Стандарт отчетов статического анализа SARIF 2.1.0 (GitHub Code Scanning)",
      instructions: [
        "Output valid SARIF 2.1.0 JSON: `{ \"$schema\": \"...\", \"version\": \"2.1.0\", \"runs\": [...] }`.",
        "Populate `tool.driver.rules` with rule IDs, descriptions, and CWE taxonomy classifications.",
        "Map findings to exact file paths and line/column coordinate ranges."
],
      ruInstructions: [
        "Форматируйте вывод строго по стандарту OASIS SARIF 2.1.0 JSON.",
        "Описывайте правила анализа с указанием идентификаторов уязвимостей (CWE).",
        "Указывайте точные координаты файлов, строк и колонок для каждой находки."
],
      semanticType: "domain_specific",
      tags: ["output","sarif","security","static-analysis","github-code-scanning"],
    }),
  },

  "output-helm-values-yaml-chart": {
    id: "output-helm-values-yaml-chart",
    name: "OutputHelmValuesYamlChartSkill",
    displayName: "Kubernetes Helm Chart values.yaml Production Standard",
    categoryId: "output",
    description: "Outputs structured, self-documenting Helm values.yaml configurations with comments, defaults, and override slots.",
    tags: ["output","helm","kubernetes","values-yaml","devops","charts"],
    transform: createStandardSkillTransform({
      sectionName: "Kubernetes Helm values.yaml Configuration Standard",
      ruSectionName: "Стандарт конфигураций Kubernetes Helm values.yaml",
      instructions: [
        "Organize values hierarchically: `image`, `service`, `ingress`, `resources`, `autoscaling`, `nodeSelector`.",
        "Add descriptive inline comments explaining each configuration toggle and its default.",
        "Include production-ready replicas, resource limits, and TLS ingress annotations."
],
      ruInstructions: [
        "Группируйте параметры по блокам: `image`, `service`, `ingress`, `resources`.",
        "Добавляйте подробные комментарии к каждой опции с пояснением значений.",
        "Включайте готовые настройки автомасштабирования (HPA) и TLS сертификатов."
],
      semanticType: "domain_specific",
      tags: ["output","helm","kubernetes","values-yaml","devops","charts"],
    }),
  },

  "output-curl-bash-api-recipes": {
    id: "output-curl-bash-api-recipes",
    name: "OutputCurlBashApiRecipesSkill",
    displayName: "Production cURL & Bash API Command Recipe Standard",
    categoryId: "output",
    description: "Outputs copy-pasteable, robust multi-line cURL commands with HTTP headers, JSON payloads, and silent error handling.",
    tags: ["output","curl","bash","api-testing","cli","rest"],
    transform: createStandardSkillTransform({
      sectionName: "Production cURL & Bash API Recipe Standards",
      ruSectionName: "Стандарт готовых исполняемых команд cURL и Bash для тестирования API",
      instructions: [
        "Format cURL commands with escaped backslashes for clean multi-line readability.",
        "Include explicit `-H \"Content-Type: application/json\"` and `-H \"Authorization: Bearer $TOKEN\"` headers.",
        "Use `--fail-with-body` and `--silent` flags for reliable scripting and debugging."
],
      ruInstructions: [
        "Оформляйте многострочные команды cURL с переносами строк через обратный слеш `\\`.",
        "Указывайте все необходимые заголовки авторизации и типа контента.",
        "Используйте флаги `--fail-with-body` и `-sS` для надежной работы в скриптах."
],
      semanticType: "domain_specific",
      tags: ["output","curl","bash","api-testing","cli","rest"],
    }),
  },
  "output-openapi-3-1-yaml-production": {
    id: "output-openapi-3-1-yaml-production",
    name: "OutputOpenapi31YamlProductionSkill",
    displayName: "OpenAPI 3.1.0 Strict YAML Specification Standard",
    categoryId: "output",
    description: "Outputs fully compliant OpenAPI 3.1.0 YAML specs with components/schemas, responses, and security schemes.",
    tags: ["output","openapi","yaml","api-spec","swagger"],
    transform: createStandardSkillTransform({
      sectionName: "OpenAPI 3.1.0 Strict YAML Specification Standard",
      ruSectionName: "Стандарт спецификации REST API по стандарту OpenAPI 3.1.0 (YAML)",
      instructions: [
        "Output valid OpenAPI 3.1.0 YAML with `openapi: 3.1.0` declaration.",
        "Declare reusable schemas under `components.schemas` with exact data types.",
        "Define standard bearer authentication under `components.securitySchemes`."
],
      ruInstructions: [
        "Форматируйте спецификацию в формате YAML по стандарту OpenAPI 3.1.0.",
        "Выносите переиспользуемые структуры в раздел `components.schemas`.",
        "Описывайте схемы авторизации (Bearer / OAuth2) в `components.securitySchemes`."
],
      semanticType: "domain_specific",
      tags: ["output","openapi","yaml","api-spec","swagger"],
    }),
  },

  "output-json-ld-schema-org-structured-data": {
    id: "output-json-ld-schema-org-structured-data",
    name: "OutputJsonLdSchemaOrgStructuredDataSkill",
    displayName: "Schema.org JSON-LD SEO Structured Data Standard",
    categoryId: "output",
    description: "Outputs Google-compliant JSON-LD structured data scripts (`SoftwareApplication`, `TechArticle`, `Product`).",
    tags: ["output","json-ld","schema-org","seo","structured-data"],
    transform: createStandardSkillTransform({
      sectionName: "Schema.org JSON-LD Structured Data Standard",
      ruSectionName: "Стандарт микроразметки Schema.org в формате JSON-LD для SEO",
      instructions: [
        "Output valid `<script type=\"application/ld+json\">` blocks containing Schema.org entities.",
        "Populate `@context: \"https://schema.org\"`, `@type`, and mandatory Google Rich Snippet properties.",
        "Validate syntax against Google Rich Results Test standards."
],
      ruInstructions: [
        "Генерируйте структурированные данные внутри тега `<script type=\"application/ld+json\">`.",
        "Задавайте контекст `@context: \"https://schema.org\"` и обязательные свойства для Google Rich Snippets.",
        "Проверяйте корректность разметки по стандартам поисковых систем."
],
      semanticType: "domain_specific",
      tags: ["output","json-ld","schema-org","seo","structured-data"],
    }),
  },

  "output-apache-avro-schema-json": {
    id: "output-apache-avro-schema-json",
    name: "OutputApacheAvroSchemaJsonSkill",
    displayName: "Apache Avro (AVSC) Binary Serialization Schema Standard",
    categoryId: "output",
    description: "Outputs Apache Avro JSON schema specifications for Kafka event streaming with doc annotations.",
    tags: ["output","avro","avsc","kafka","serialization","schemas"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Avro Schema (AVSC) Standard",
      ruSectionName: "Стандарт схем сериализации Apache Avro (AVSC / Kafka)",
      instructions: [
        "Output valid Avro JSON schema: `{ \"type\": \"record\", \"name\": \"...\", \"namespace\": \"...\", \"fields\": [...] }`.",
        "Specify explicit default values for every optional field to maintain schema evolution compatibility.",
        "Add detailed `doc` strings for every field."
],
      ruInstructions: [
        "Форматируйте схему в формате Avro JSON со всеми обязательными полями (name, namespace, fields).",
        "Задавайте значения по умолчанию (`default`) для обеспечения обратной совместимости эволюции схем.",
        "Добавляйте поясняющие описания (`doc`) к каждому атрибуту."
],
      semanticType: "domain_specific",
      tags: ["output","avro","avsc","kafka","serialization","schemas"],
    }),
  },

  "output-postman-collection-v2-1-json": {
    id: "output-postman-collection-v2-1-json",
    name: "OutputPostmanCollectionV21JsonSkill",
    displayName: "Postman Collection v2.1.0 Export Specification",
    categoryId: "output",
    description: "Outputs import-ready Postman Collection v2.1.0 JSON files with pre-request scripts and test assertions.",
    tags: ["output","postman","api-testing","collection","rest"],
    transform: createStandardSkillTransform({
      sectionName: "Postman Collection v2.1.0 Schema Standard",
      ruSectionName: "Стандарт экспорта коллекций запросов Postman v2.1.0 (JSON)",
      instructions: [
        "Output valid Postman Collection schema: `{ \"info\": { \"schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\" }, \"item\": [...] }`.",
        "Include realistic request URLs, query params, headers, and sample JSON bodies.",
        "Embed automated JavaScript test assertions (`pm.test(...)`) verifying HTTP 200 and schema validity."
],
      ruInstructions: [
        "Генерируйте коллекцию по официальной схеме Postman Collection v2.1.0.",
        "Включайте реальные примеры заголовков, параметров и тел запросов.",
        "Добавляйте автоматические тесты на JavaScript (`pm.test`) для проверки статусов ответов."
],
      semanticType: "domain_specific",
      tags: ["output","postman","api-testing","collection","rest"],
    }),
  },

  "output-jest-vitest-test-suite-typescript": {
    id: "output-jest-vitest-test-suite-typescript",
    name: "OutputJestVitestTestSuiteTypescriptSkill",
    displayName: "Jest / Vitest Production TypeScript Test Suite Standard",
    categoryId: "output",
    description: "Outputs complete, runnable Vitest/Jest test files with `describe`, `it`, `beforeEach`, mocks, and type safety.",
    tags: ["output","vitest","jest","typescript","testing","unit-tests"],
    transform: createStandardSkillTransform({
      sectionName: "Vitest / Jest TypeScript Test Suite Standards",
      ruSectionName: "Стандарт модульных тестов на TypeScript (Vitest / Jest)",
      instructions: [
        "Output complete test files importing `{ describe, it, expect, beforeEach, vi }` from `vitest`.",
        "Structure tests with clear AAA pattern: Arrange, Act, Assert.",
        "Mock external modules with type-safe `vi.mock()` definitions."
],
      ruInstructions: [
        "Создавайте готовые файлы тестов с импортами из `vitest` или `@jest/globals`.",
        "Организуйте тесты по шаблону AAA: Arrange (Подготовка), Act (Действие), Assert (Проверка).",
        "Используйте типизированные моки для изоляции внешних модулей."
],
      semanticType: "domain_specific",
      tags: ["output","vitest","jest","typescript","testing","unit-tests"],
    }),
  },

  "output-tailwind-css-shadcn-component-tsx": {
    id: "output-tailwind-css-shadcn-component-tsx",
    name: "OutputTailwindCssShadcnComponentTsxSkill",
    displayName: "Modern React 19 & Tailwind CSS UI Component Standard",
    categoryId: "output",
    description: "Outputs accessible, responsive React components styled with Tailwind CSS utility classes and Lucide icons.",
    tags: ["output","react","tailwind","tsx","ui-components","frontend"],
    transform: createStandardSkillTransform({
      sectionName: "Modern React 19 & Tailwind CSS Component Standard",
      ruSectionName: "Стандарт UI-компонентов на React 19 и Tailwind CSS",
      instructions: [
        "Output pure TypeScript React component (`.tsx`) with explicit props interface.",
        "Use responsive Tailwind utility classes (`sm:`, `md:`, `lg:`) and smooth micro-transitions.",
        "Ensure accessible ARIA labels, semantic HTML tags, and keyboard focus states."
],
      ruInstructions: [
        "Генерируйте чистый компонент React на TypeScript с интерфейсом свойств Props.",
        "Используйте адаптивные классы Tailwind CSS и плавные анимации переходов.",
        "Обеспечьте доступность: семантические HTML-теги, ARIA-атрибуты и фокус с клавиатуры."
],
      semanticType: "domain_specific",
      tags: ["output","react","tailwind","tsx","ui-components","frontend"],
    }),
  },

  "output-env-example-template-dotenv": {
    id: "output-env-example-template-dotenv",
    name: "OutputEnvExampleTemplateDotenvSkill",
    displayName: "Production .env.example Configuration Template",
    categoryId: "output",
    description: "Outputs clean, documented `.env.example` templates with variable descriptions, types, and dummy defaults.",
    tags: ["output","dotenv","env-example","configuration","devops"],
    transform: createStandardSkillTransform({
      sectionName: "Production .env.example Template Standard",
      ruSectionName: "Стандарт шаблона переменных окружения .env.example",
      instructions: [
        "Group variables into logical sections: `# Database`, `# Authentication`, `# API Keys`, `# Feature Flags`.",
        "Add descriptive comments explaining what each variable configures.",
        "Provide safe placeholder dummy values (e.g. `DATABASE_URL=postgresql://user:password@localhost:5432/dbname`)."
],
      ruInstructions: [
        "Группируйте переменные по смысловым блокам: База данных, Авторизация, Внешние API.",
        "Добавляйте комментарии с описанием назначения и формата каждого параметра.",
        "Используйте безопасные фиктивные значения по умолчанию."
],
      semanticType: "domain_specific",
      tags: ["output","dotenv","env-example","configuration","devops"],
    }),
  },

  "output-latex-mathematical-formula-matrix": {
    id: "output-latex-mathematical-formula-matrix",
    name: "OutputLatexMathematicalFormulaMatrixSkill",
    displayName: "LaTeX Mathematical Proof & Equation Matrix Standard",
    categoryId: "output",
    description: "Outputs academic-grade LaTeX equations and formal mathematical proofs enclosed in `$$` display math blocks.",
    tags: ["output","latex","math","equations","formal-methods"],
    transform: createStandardSkillTransform({
      sectionName: "LaTeX Mathematical Formula & Proof Standards",
      ruSectionName: "Стандарт математической верстки формул и доказательств в LaTeX",
      instructions: [
        "Format mathematical equations in standard LaTeX syntax enclosed in `$$ ... $$` for display and `$ ... $` for inline.",
        "Use proper matrix environments (`\\begin{pmatrix} ... \\end{pmatrix}`) and aligned equations (`\\begin{aligned}`).",
        "Ensure all Greek symbols, superscripts, and integrals are rendered with standard notation."
],
      ruInstructions: [
        "Оформляйте формулы в стандартном синтаксисе LaTeX с тегами `$$ ... $$`.",
        "Используйте окружения для матриц и многострочных выравниваний (`aligned`).",
        "Применяйте общепринятые обозначения для греческих символов, индексов и операторов."
],
      semanticType: "domain_specific",
      tags: ["output","latex","math","equations","formal-methods"],
    }),
  },

  "output-nginx-virtual-host-reverse-proxy": {
    id: "output-nginx-virtual-host-reverse-proxy",
    name: "OutputNginxVirtualHostReverseProxySkill",
    displayName: "Hardened Nginx Reverse Proxy & Virtual Host Configuration",
    categoryId: "output",
    description: "Outputs battle-tested Nginx configuration files with SSL/TLS termination, Gzip, proxy headers, and rate limits.",
    tags: ["output","nginx","reverse-proxy","ssl","devops","web-server"],
    transform: createStandardSkillTransform({
      sectionName: "Hardened Nginx Reverse Proxy Configuration Standard",
      ruSectionName: "Стандарт конфигурации защищенного реверс-прокси Nginx",
      instructions: [
        "Output valid `nginx.conf` server blocks with `listen 443 ssl http2;`.",
        "Include standard security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`).",
        "Set proper `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` and proxy buffer limits."
],
      ruInstructions: [
        "Форматируйте конфигурацию Nginx с поддержкой SSL/TLS и HTTP/2.",
        "Включайте стандартные заголовки безопасности браузера.",
        "Настройте корректную передачу IP-адресов клиентов и буферизацию прокси."
],
      semanticType: "domain_specific",
      tags: ["output","nginx","reverse-proxy","ssl","devops","web-server"],
    }),
  },

  "output-sqlite-schema-migration-script": {
    id: "output-sqlite-schema-migration-script",
    name: "OutputSqliteSchemaMigrationScriptSkill",
    displayName: "SQLite 3 Schema & WAL Mode Migration Script",
    categoryId: "output",
    description: "Outputs clean SQLite 3 schema creation scripts with WAL mode pragma, foreign keys, and indexes.",
    tags: ["output","sqlite","sql","embedded-db","migrations"],
    transform: createStandardSkillTransform({
      sectionName: "SQLite 3 Schema & Pragmas Specification",
      ruSectionName: "Спецификация схемы базы данных SQLite 3 (WAL Mode)",
      instructions: [
        "Enable performance and integrity pragmas: `PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;`.",
        "Define clean tables with `INTEGER PRIMARY KEY AUTOINCREMENT` or `TEXT PRIMARY KEY`.",
        "Include explicit unique constraints and covering indexes."
],
      ruInstructions: [
        "Включайте оптимизирующие прагмы: режим журнала WAL и проверку внешних ключей.",
        "Описывайте таблицы с явными первичными ключами и ограничениями целостности.",
        "Создавайте покрывающие индексы для ускорения выборок."
],
      semanticType: "domain_specific",
      tags: ["output","sqlite","sql","embedded-db","migrations"],
    }),
  },
  "output-protobuf-grpcurl-cli-command": {
    id: "output-protobuf-grpcurl-cli-command",
    name: "OutputProtobufGrpcurlCliCommandSkill",
    displayName: "gRPCurl CLI Interactive Request & Payload Recipe",
    categoryId: "output",
    description: "Outputs runnable gRPCurl commands with plaintext reflection flags, JSON data payloads, and service endpoints.",
    tags: ["output","grpcurl","grpc","cli","api-testing"],
    transform: createStandardSkillTransform({
      sectionName: "Production gRPCurl CLI Invocation Standards",
      ruSectionName: "Стандарт вызовов gRPCurl для тестирования gRPC-эндпоинтов",
      instructions: [
        "Output valid `grpcurl` commands with `-plaintext` or TLS certificate flags.",
        "Include structured `-d '{\"user_id\": \"123\"}'` JSON input payloads.",
        "Specify exact fully-qualified service methods (`package.Service/Method`)."
],
      ruInstructions: [
        "Форматируйте команду `grpcurl` с флагами шифрования или `-plaintext`.",
        "Передавайте аргументы в виде структурированного JSON через флаг `-d`.",
        "Указывайте полное имя метода gRPC: `package.ServiceName/MethodName`."
],
      semanticType: "domain_specific",
      tags: ["output","grpcurl","grpc","cli","api-testing"],
    }),
  },

  "output-ansible-playbook-yaml-hardened": {
    id: "output-ansible-playbook-yaml-hardened",
    name: "OutputAnsiblePlaybookYamlHardenedSkill",
    displayName: "Hardened Ansible Automation Playbook (YAML)",
    categoryId: "output",
    description: "Outputs production-grade Ansible playbooks with tasks, handlers, become privilege escalation, and idempotency.",
    tags: ["output","ansible","yaml","automation","devops","sysadmin"],
    transform: createStandardSkillTransform({
      sectionName: "Production Ansible Playbook (YAML) Standard",
      ruSectionName: "Стандарт сценариев автоматизации Ansible Playbook (YAML)",
      instructions: [
        "Output valid Ansible YAML containing `hosts`, `become: true`, `vars`, `tasks`, and `handlers`.",
        "Ensure all tasks are idempotent and have human-readable descriptive `name` fields.",
        "Use native Ansible modules (`ansible.builtin.template`, `systemd`) rather than raw shell commands."
],
      ruInstructions: [
        "Генерируйте валидный YAML-сценарий Ansible со структурой `hosts`, `vars`, `tasks`, `handlers`.",
        "Обеспечьте идемпотентность всех задач и понятные имена шагов.",
        "Используйте встроенные модули Ansible вместо сырых команд bash."
],
      semanticType: "domain_specific",
      tags: ["output","ansible","yaml","automation","devops","sysadmin"],
    }),
  },

  "output-cypress-playwright-e2e-spec-ts": {
    id: "output-cypress-playwright-e2e-spec-ts",
    name: "OutputCypressPlaywrightE2eSpecTsSkill",
    displayName: "Playwright / Cypress E2E End-to-End Test Suite (TypeScript)",
    categoryId: "output",
    description: "Outputs resilient Playwright end-to-end browser automation tests using semantic role selectors and auto-waiting.",
    tags: ["output","playwright","cypress","e2e-testing","typescript","qa"],
    transform: createStandardSkillTransform({
      sectionName: "Playwright E2E Browser Test Suite Standard",
      ruSectionName: "Стандарт сквозных E2E-тестов браузера на Playwright (TypeScript)",
      instructions: [
        "Output complete Playwright test file importing `{ test, expect }` from `@playwright/test`.",
        "Use user-facing accessibility locators (`page.getByRole('button', { name: 'Submit' })`).",
        "Rely on Playwright auto-waiting; strictly forbid hardcoded `page.waitForTimeout()` sleep calls."
],
      ruInstructions: [
        "Создавайте файлы тестов Playwright с импортами из `@playwright/test`.",
        "Используйте селекторы доступности (getByRole, getByLabel) вместо хрупких CSS-путей.",
        "Полагайтесь на автоматическое ожидание элементов, запретив `sleep` и фиксированные паузы."
],
      semanticType: "domain_specific",
      tags: ["output","playwright","cypress","e2e-testing","typescript","qa"],
    }),
  },

  "output-prometheus-alerting-rules-yaml": {
    id: "output-prometheus-alerting-rules-yaml",
    name: "OutputPrometheusAlertingRulesYamlSkill",
    displayName: "Prometheus Alertmanager Rule Specification (YAML)",
    categoryId: "output",
    description: "Outputs PromQL alerting rules with `expr`, `for` duration, severity labels, and actionable runbook annotations.",
    tags: ["output","prometheus","promql","alertmanager","monitoring","sre"],
    transform: createStandardSkillTransform({
      sectionName: "Prometheus Alertmanager Rule Standards",
      ruSectionName: "Стандарт правил алертинга Prometheus и Alertmanager (YAML / PromQL)",
      instructions: [
        "Output valid Prometheus rule group YAML with `alert: AlertName` and optimized `expr: PromQL`.",
        "Set `for: 5m` duration to filter out transient metric spikes.",
        "Include mandatory `labels.severity` (critical/warning) and `annotations.runbook_url`."
],
      ruInstructions: [
        "Генерируйте группы правил Prometheus с понятными именами и выверенными PromQL-выражениями.",
        "Задавайте задержку `for: 5m` для фильтрации кратковременных всплесков метрик.",
        "Обязательно добавляйте лейблы критичности и ссылки на регламенты реагирования (Runbook)."
],
      semanticType: "domain_specific",
      tags: ["output","prometheus","promql","alertmanager","monitoring","sre"],
    }),
  },

  "output-apache-kafka-connect-config-json": {
    id: "output-apache-kafka-connect-config-json",
    name: "OutputApacheKafkaConnectConfigJsonSkill",
    displayName: "Kafka Connect Connector Configuration (JSON)",
    categoryId: "output",
    description: "Outputs production Kafka Connect source/sink JSON configs with converter settings, transforms, and error policies.",
    tags: ["output","kafka-connect","json","streaming","data-engineering"],
    transform: createStandardSkillTransform({
      sectionName: "Kafka Connect Connector JSON Standard",
      ruSectionName: "Стандарт конфигурации коннекторов Kafka Connect (JSON)",
      instructions: [
        "Output valid Kafka Connect configuration JSON with `connector.class` and connection parameters.",
        "Configure Schema Registry Avro/JSON converters for key and value.",
        "Set `errors.tolerance = \"all\"` and `errors.deadletterqueue.topic.name` for robust poison message handling."
],
      ruInstructions: [
        "Форматируйте конфигурацию в виде валидного JSON-объекта с классом коннектора.",
        "Настройте конвертеры Avro со ссылкой на Schema Registry.",
        "Укажите топик для сбойных сообщений (Dead Letter Queue)."
],
      semanticType: "domain_specific",
      tags: ["output","kafka-connect","json","streaming","data-engineering"],
    }),
  },
  "output-graphql-mutation-response-envelope": {
    id: "output-graphql-mutation-response-envelope",
    name: "OutputGraphqlMutationResponseEnvelopeSkill",
    displayName: "GraphQL Mutation Payload & UserErrors Envelope Standard",
    categoryId: "output",
    description: "Outputs Shopify-style mutation payloads with `userErrors: [{ field, message, code }]` and updated entity.",
    tags: ["output","graphql","mutations","error-handling","api"],
    transform: createStandardSkillTransform({
      sectionName: "GraphQL Mutation Result & UserErrors Standard",
      ruSectionName: "Стандарт ответов мутаций GraphQL с массивом UserErrors (Shopify pattern)",
      instructions: [
        "Format mutation results as `{ data: { mutateEntity: { entity: {...}, userErrors: [...] } } }`.",
        "Populate `userErrors` with array of `{ field: [\"path\"], message: \"...\", code: \"INVALID_FORMAT\" }`.",
        "Never throw unhandled top-level GraphQL errors for expected business validation failures."
],
      ruInstructions: [
        "Форматируйте результат мутации в виде объекта с возвращаемой сущностью и массивом `userErrors`.",
        "Заполняйте `userErrors` понятными полями с путями ошибок и машинно-читаемыми кодами.",
        "Не выбрасывайте системные исключения верхнего уровня для штатных ошибок валидации бизнес-логики."
],
      semanticType: "domain_specific",
      tags: ["output","graphql","mutations","error-handling","api"],
    }),
  },

  "output-markdown-architecture-decision-record-adr": {
    id: "output-markdown-architecture-decision-record-adr",
    name: "OutputMarkdownArchitectureDecisionRecordAdrSkill",
    displayName: "Standard Architectural Decision Record (ADR) Document Format",
    categoryId: "output",
    description: "Outputs clean, standardized Architectural Decision Records in GitHub-flavored Markdown.",
    tags: ["output","adr","architecture","markdown","documentation"],
    transform: createStandardSkillTransform({
      sectionName: "Architectural Decision Record (ADR) Document Standard",
      ruSectionName: "Формат документа Архитектурного решения (ADR Markdown)",
      instructions: [
        "Format document with `# [ADR-001] Short Descriptive Title`.",
        "Sections: `## Status`, `## Context and Problem Statement`, `## Decision Drivers`, `## Considered Options`, `## Decision Outcome`, `## Pros and Cons of the Options`.",
        "Provide clean, unambiguous technical justification."
],
      ruInstructions: [
        "Оформляйте документ с заголовком `# [ADR-001] Название решения`.",
        "Разделы: Статус, Контекст и проблема, Факторы принятия решений, Рассмотренные альтернативы, Итоговое решение, Плюсы и минусы.",
        "Приводите ясное техническое обоснование без воды."
],
      semanticType: "domain_specific",
      tags: ["output","adr","architecture","markdown","documentation"],
    }),
  },

  "output-json-api-spec-v1-1": {
    id: "output-json-api-spec-v1-1",
    name: "OutputJsonApiSpecV11Skill",
    displayName: "JSON:API Specification (v1.1) Formatted Response",
    categoryId: "output",
    description: "Outputs responses adhering to the JSON:API v1.1 standard (`data.type`, `data.id`, `attributes`, `relationships`, `included`).",
    tags: ["output","json-api","rest","api-standards","serialization"],
    transform: createStandardSkillTransform({
      sectionName: "JSON:API (v1.1) Specification Standards",
      ruSectionName: "Стандарт формирования ответов по спецификации JSON:API (v1.1)",
      instructions: [
        "Format top-level payload with `data: { type: \"users\", id: \"1\", attributes: {...}, relationships: {...} }`.",
        "Sideload related resources in the `included: [...]` top-level array with compound documents.",
        "Include self-referential hypermedia links (`links.self`, `links.related`)."
],
      ruInstructions: [
        "Форматируйте объект с полями `data.type`, `data.id`, `attributes` и `relationships`.",
        "Передавайте связанные сущности в массиве `included` верхнего уровня.",
        "Добавляйте гипермедиа-ссылки для навигации (`links.self`)."
],
      semanticType: "domain_specific",
      tags: ["output","json-api","rest","api-standards","serialization"],
    }),
  },

  "output-docker-compose-v2-production": {
    id: "output-docker-compose-v2-production",
    name: "OutputDockerComposeV2ProductionSkill",
    displayName: "Production Docker Compose (Compose v2) Specification",
    categoryId: "output",
    description: "Outputs multi-container Docker Compose v2 YAML with healthchecks, networks, named volumes, and resource limits.",
    tags: ["output","docker-compose","yaml","devops","containers"],
    transform: createStandardSkillTransform({
      sectionName: "Production Docker Compose v2 YAML Standards",
      ruSectionName: "Производственный стандарт конфигураций Docker Compose (v2)",
      instructions: [
        "Output valid `docker-compose.yml` with top-level `services`, `networks`, and `volumes`.",
        "Configure explicit `healthcheck` testing service availability before dependent services start.",
        "Enforce container resource constraints (`deploy.resources.limits.memory: 512M`)."
],
      ruInstructions: [
        "Генерируйте файл `docker-compose.yml` со всеми сервисами, сетями и именованными томами.",
        "Настраивайте `healthcheck` для контроля готовности зависимых баз данных и брокеров.",
        "Задавайте жесткие лимиты оперативной памяти и ядер процессора для контейнеров."
],
      semanticType: "domain_specific",
      tags: ["output","docker-compose","yaml","devops","containers"],
    }),
  },

  "output-fastapi-pydantic-v2-schema": {
    id: "output-fastapi-pydantic-v2-schema",
    name: "OutputFastapiPydanticV2SchemaSkill",
    displayName: "Python FastAPI & Pydantic v2 Model Specification",
    categoryId: "output",
    description: "Outputs clean Python 3.12 FastAPI endpoint route handlers with Pydantic v2 `BaseModel`, `Field`, and docstrings.",
    tags: ["output","fastapi","pydantic","python","api-design"],
    transform: createStandardSkillTransform({
      sectionName: "Python FastAPI & Pydantic v2 Standards",
      ruSectionName: "Стандарт моделей Pydantic v2 и маршрутов FastAPI (Python 3.12)",
      instructions: [
        "Define Pydantic v2 models using `BaseModel`, `Field(description=\"...\", ge=0)`, and type annotations.",
        "Use FastAPI path operations with explicit `response_model`, `status_code`, and dependency injection.",
        "Include complete type hints and Google-style docstrings."
],
      ruInstructions: [
        "Описывайте модели Pydantic v2 с аннотациями типов и валидацией `Field`.",
        "Оформляйте эндпоинты FastAPI с указанием `response_model` и кодов ответов.",
        "Используйте строгие подсказки типов Python 3.12 и понятные докстринги."
],
      semanticType: "domain_specific",
      tags: ["output","fastapi","pydantic","python","api-design"],
    }),
  },

  "output-mermaid-c4-component-diagram": {
    id: "output-mermaid-c4-component-diagram",
    name: "OutputMermaidC4ComponentDiagramSkill",
    displayName: "Mermaid.js C4 Component Diagram Standard",
    categoryId: "output",
    description: "Outputs Mermaid.js C4Component architecture diagrams detailing controllers, services, repositories, and databases.",
    tags: ["output","mermaid","c4-model","component-diagram","visualization"],
    transform: createStandardSkillTransform({
      sectionName: "Mermaid.js C4 Component Diagram Standard",
      ruSectionName: "Стандарт компонентных диаграмм Mermaid C4Component",
      instructions: [
        "Enclose diagram inside ````mermaid C4Component ... ```` block.",
        "Declare `Container_Boundary`, `Component(name, desc, tech)`, and `ComponentDb` nodes.",
        "Define directed relationships with labels and protocols (`Rel(api, db, \"Queries\", \"SQL/TCP\")`)."
],
      ruInstructions: [
        "Оборачивайте диаграмму в блок ````mermaid C4Component ... ````.",
        "Объявляйте границы контейнеров и компоненты с указанием используемых технологий.",
        "Соединяйте компоненты направленными связями с протоколами взаимодействия."
],
      semanticType: "domain_specific",
      tags: ["output","mermaid","c4-model","component-diagram","visualization"],
    }),
  },

  "output-swagger-ui-html-bundle": {
    id: "output-swagger-ui-html-bundle",
    name: "OutputSwaggerUiHtmlBundleSkill",
    displayName: "Standalone Swagger UI Interactive HTML Documentation Bundle",
    categoryId: "output",
    description: "Outputs a self-contained, offline-compatible HTML file rendering interactive Swagger UI documentation.",
    tags: ["output","swagger-ui","html","documentation","api"],
    transform: createStandardSkillTransform({
      sectionName: "Standalone Swagger UI HTML Bundle Standard",
      ruSectionName: "Автономный HTML-бандл с интерактивной документацией Swagger UI",
      instructions: [
        "Output complete HTML5 file with embedded Swagger UI CSS/JS bundles.",
        "Inline the OpenAPI 3.1 JSON specification directly into the `SwaggerUIBundle({ spec: {...} })` initializer.",
        "Deliver 100% interactive 'Try It Out' API testing in a single portable file."
],
      ruInstructions: [
        "Создайте полноценный автономный HTML5-файл с подключением стилей и скриптов Swagger UI.",
        "Встройте полную спецификацию OpenAPI JSON внутрь скрипта инициализации.",
        "Обеспечьте возможность тестирования API прямо из одного портативного файла."
],
      semanticType: "domain_specific",
      tags: ["output","swagger-ui","html","documentation","api"],
    }),
  },

  "output-github-issue-template-yaml": {
    id: "output-github-issue-template-yaml",
    name: "OutputGithubIssueTemplateYamlSkill",
    displayName: "GitHub Issue Form (YAML) Bug & Feature Template",
    categoryId: "output",
    description: "Outputs structured GitHub Issue Forms (.github/ISSUE_TEMPLATE/*.yml) with dropdowns, textareas, and validations.",
    tags: ["output","github-issue","yaml","open-source","templates"],
    transform: createStandardSkillTransform({
      sectionName: "GitHub Issue Form (YAML) Standard",
      ruSectionName: "Стандарт шаблонов тикетов GitHub Issue Forms (YAML)",
      instructions: [
        "Output valid YAML adhering to GitHub Issue Forms schema: `name`, `description`, `body: [...]`.",
        "Include `type: textarea` with validation requirements and `type: dropdown` for component selection.",
        "Embed a pre-filled checklist for reproduction steps and environment details."
],
      ruInstructions: [
        "Генерируйте валидный YAML-файл для каталога `.github/ISSUE_TEMPLATE`.",
        "Используйте поля ввода, выпадающие списки выбора компонентов и обязательные чек-боксы.",
        "Включайте разделы для шагов воспроизведения ошибки и логов окружения."
],
      semanticType: "domain_specific",
      tags: ["output","github-issue","yaml","open-source","templates"],
    }),
  },

  "output-markdown-user-story-acceptance-criteria": {
    id: "output-markdown-user-story-acceptance-criteria",
    name: "OutputMarkdownUserStoryAcceptanceCriteriaSkill",
    displayName: "Agile User Story & Gherkin Acceptance Criteria (Given/When/Then)",
    categoryId: "output",
    description: "Structures user stories with Persona, Goal, Value, and Cucumber/Gherkin acceptance criteria scenarios.",
    tags: ["output","user-story","agile","gherkin","acceptance-criteria","scrum"],
    transform: createStandardSkillTransform({
      sectionName: "Agile User Story & Gherkin Acceptance Criteria Standard",
      ruSectionName: "Стандарт пользовательских историй (User Stories) и критериев приемки Gherkin",
      instructions: [
        "Format User Story: `As a [Persona], I want [Goal], so that [Business Benefit]`.",
        "Define 3-5 distinct acceptance criteria scenarios using Gherkin syntax: `Scenario: ... | Given ... | When ... | Then ...`.",
        "Include explicit edge-case negative test scenarios."
],
      ruInstructions: [
        "Форматируйте историю: `Как [Роль], я хочу [Действие], чтобы [Ценность]`.",
        "Опишите критерии приемки на синтаксисе Gherkin: `Сценарий | Дано | Когда | Тогда`.",
        "Включайте сценарии обработки некорректных данных и сбоев."
],
      semanticType: "domain_specific",
      tags: ["output","user-story","agile","gherkin","acceptance-criteria","scrum"],
    }),
  },

  "output-prometheus-grafana-dashboard-json": {
    id: "output-prometheus-grafana-dashboard-json",
    name: "OutputPrometheusGrafanaDashboardJsonSkill",
    displayName: "Grafana 10 Dashboard Model (JSON) Specification",
    categoryId: "output",
    description: "Outputs import-ready Grafana 10 dashboard JSON with panels, time-series graphs, thresholds, and PromQL targets.",
    tags: ["output","grafana","prometheus","json","dashboards","observability"],
    transform: createStandardSkillTransform({
      sectionName: "Grafana 10 Dashboard Model (JSON) Standards",
      ruSectionName: "Стандарт дашбордов Grafana 10 (JSON)",
      instructions: [
        "Output valid Grafana 10 dashboard schema: `{ \"title\": \"...\", \"panels\": [...], \"templating\": {...} }`.",
        "Configure time-series panels with optimized PromQL queries (`rate(http_requests_total[5m])`).",
        "Set standardized color thresholds (Green: Normal, Yellow: Warning, Red: Critical)."
],
      ruInstructions: [
        "Генерируйте валидную схему дашборда Grafana с панелями и переменными шаблонов.",
        "Настраивайте панели графиков временных рядов с PromQL-запросами.",
        "Задавайте стандартные цветовые пороги (зеленый / желтый / красный)."
],
      semanticType: "domain_specific",
      tags: ["output","grafana","prometheus","json","dashboards","observability"],
    }),
  },
};

