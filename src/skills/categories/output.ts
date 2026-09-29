import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
