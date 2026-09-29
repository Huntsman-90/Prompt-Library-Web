import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const OUTPUT_SKILLS: Record<string, SkillDefinition> = {
  'json-schema-strict': {
    id: 'json-schema-strict',
    name: 'JsonSchemaStrictSkill',
    displayName: 'Strict JSON Schema Output',
    categoryId: 'output',
    description: 'Enforces pure, parseable JSON conforming strictly to schema with zero markdown wrapper.',
    tags: ['output', 'json', 'schema', 'strict', 'machine-readable'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Формат Вывода: Строгий JSON',
        'Output Format: Strict Valid JSON',
        [
          'Вернуть исключительно валидный JSON-объект без окружающего текста и Markdown-тегов:',
          '```json',
          '{',
          '  "status": "success",',
          '  "summary": "...",',
          '  "data": {},',
          '  "action_items": []',
          '}',
          '```',
          'Запрещено добавлять вводные слова до и после блока JSON.',
        ],
        [
          'Output MUST be 100% valid, parseable JSON conforming strictly to schema:',
          '```json',
          '{',
          '  "status": "success",',
          '  "summary": "...",',
          '  "data": {},',
          '  "action_items": []',
          '}',
          '```',
          'Zero conversational text or commentary outside the raw JSON object.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'executive-markdown-table': {
    id: 'executive-markdown-table',
    name: 'ExecutiveMarkdownTableSkill',
    displayName: 'Executive Decision Matrix (Table)',
    categoryId: 'output',
    description: 'Structures deliverables into high-impact Markdown tables with priority rankings and DoD.',
    tags: ['output', 'table', 'matrix', 'raci', 'executive', 'dod'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Формат Вывода: Исполнительная Матрица',
        'Output Format: Executive Decision Matrix',
        [
          '| Элемент / Задача | Ответственный (RACI) | Приоритет (P0/P1/P2) | Влияние (ROI) | Срок | Критерий Готовности (DoD) |',
          '|---|---|---|---|---|---|',
          '| [[задача_1]] | [[владелец]] | P0 | Высокое | [[срок]] | [[критерий_проверки]] |',
        ],
        [
          '| Item / Deliverable | Owner (RACI) | Priority (P0/P1/P2) | Impact (ROI) | Target Date | Definition of Done (DoD) |',
          '|---|---|---|---|---|---|',
          '| [[task_item_1]] | [[owner]] | P0 | High | [[target_date]] | [[verification_criteria]] |',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'action-items-matrix': {
    id: 'action-items-matrix',
    name: 'ActionItemsMatrixSkill',
    displayName: 'Preventative Action Items Matrix',
    categoryId: 'output',
    description: 'Generates an actionable Markdown matrix with P0/P1 prioritization, owner roles, SLAs, and verifiable tests.',
    tags: ['output', 'matrix', 'action-items', 'retrospective', 'prevention', 'sla'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Матрица Превентивных Мер (Action Items Matrix)',
        'Preventative Action Items Matrix',
        [
          '| Приоритет | Превентивное Действие | Ответственная Роль | Срок (SLA) | Критерий Приемки / Тест |',
          '|---|---|---|---|---|',
          '| P0 (Блокирующий) | Устранение дефекта в коде/конфигурации | Staff Backend / DevOps | 24 часа | Автотест воспроизведения + canary |',
          '| P1 (Системный) | Настройка опережающих алертов и лимитов | SRE Lead | 1 неделя | Проверка дашборда на синтетическом трафике |',
          '| P2 (Долгосрочный) | Архитектурный редизайн и изоляция отказов | Principal Architect | 1 месяц | Нагрузочное стресс-тестирование (Chaos test) |',
        ],
        [
          '| Priority | Preventative Work Item | Owner Role | Target SLA | Acceptance Criterion / Verification |',
          '|---|---|---|---|---|',
          '| P0 (Blocker) | Hard architectural patch & automated regression test | Staff Backend / DevOps | 24h | Automated failure reproduction test passes |',
          '| P1 (Structural) | Telemetry burn-rate alert & resource quotas | SRE Lead | 1 week | Synthetic alert validation in staging |',
          '| P2 (Long-term) | Subsystem failure isolation & circuit breaking | Principal Architect | 1 month | Chaos engineering stress-test verification |',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'hierarchical-report': {
    id: 'hierarchical-report',
    name: 'HierarchicalReportSkill',
    displayName: 'Hierarchical Executive Brief',
    categoryId: 'output',
    description: 'Structures deliverable into Executive Summary, Technical Deep Dive, and Action Matrix.',
    tags: ['output', 'report', 'brief', 'executive-summary'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Структура Итогового Отчета',
        'Output Architecture: Hierarchical Brief',
        [
          'Отчет должен быть строго структурирован по разделам:',
          '1. **Executive Summary** (Максимум 2-3 предложения с выжимкой сути).',
          '2. **Технический / Стратегический Разбор** (Детальное изложение аргументов, кода или спецификаций).',
          '3. **Матрица Рисков и Компромиссов** (Анализ угроз и цена выбора).',
          '4. **План Действий (Next Steps)** (Конкретный перечень следующих шагов).',
        ],
        [
          'Deliverable MUST adhere to three-tier hierarchical architecture:',
          '1. **Executive Summary** (Strict 2-3 sentence bottom-line upfront thesis).',
          '2. **Substantive Architecture / Deep Dive** (Technical breakdown, code contracts, or strategic mechanics).',
          '3. **Risk & Trade-off Matrix** (Exposure surface, dependencies, and mitigation).',
          '4. **Actionable Implementation Roadmap** (Sequenced operational next steps).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'yaml-configuration-schema': {
    id: 'yaml-configuration-schema',
    name: 'YamlConfigurationSchemaSkill',
    displayName: 'Clean YAML Configuration Spec',
    categoryId: 'output',
    description: 'Formats configuration files into typed, documented, standard YAML with inline comments.',
    tags: ['output', 'yaml', 'config', 'devops', 'kubernetes'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Формат Вывода: Валидный YAML',
        'Output Format: Valid YAML Specification',
        [
          'Вывод строго в формате YAML с 2 пробелами отступа и поясняющими комментариями к каждому блоку параметров.',
        ],
        [
          'Deliverable must be pristine YAML with 2-space indentation and explicit inline parameter documentation.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'markdown-callout-blocks': {
    id: 'markdown-callout-blocks',
    name: 'MarkdownCalloutBlocksSkill',
    displayName: 'Markdown Visual Callouts & Admonitions',
    categoryId: 'output',
    description: 'Uses GitHub/Obsidian callout blocks (> [!NOTE], > [!WARNING], > [!TIP]) for visual emphasis.',
    tags: ['output', 'callouts', 'admonitions', 'markdown', 'visual'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Использование Визуальных Callout-Блоков',
        'Visual Callout & Admonition Syntax',
        [
          'Использовать стандартные блоки внимания для ключевых моментов:',
          '> [!IMPORTANT] Важные инварианты системы.',
          '> [!WARNING] Критические риски и точки отказа.',
          '> [!TIP] Практические рекомендации по оптимизации.',
        ],
        [
          'Structure critical callouts using GitHub/Obsidian admonition syntax:',
          '> [!IMPORTANT] Critical system invariants.',
          '> [!WARNING] Production risk and failure modes.',
          '> [!TIP] Practical optimization heuristics.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'ascii-diagram-flowchart': {
    id: 'ascii-diagram-flowchart',
    name: 'AsciiDiagramFlowchartSkill',
    displayName: 'ASCII Architecture Diagrams & Flowcharts',
    categoryId: 'output',
    description: 'Embeds legible ASCII text diagrams illustrating topology, data flow, and state transitions.',
    tags: ['output', 'ascii', 'diagram', 'flowchart', 'visual'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Текстовые ASCII-Диаграммы Архитектуры',
        'ASCII Architecture Diagram Specifications',
        [
          'Сопроводить архитектурное решение наглядной ASCII-диаграммой потоков данных:',
          '```',
          '[Client] --> (API Gateway) --> [Service A] --> [(DB)]',
          '                                   |',
          '                                   +--> [Queue] --> [Worker]',
          '```',
        ],
        [
          'Illustrate component interactions with clean ASCII data-flow diagrams:',
          '```',
          '[Client] --> (API Gateway) --> [Service A] --> [(DB)]',
          '                                   |',
          '                                   +--> [Queue] --> [Worker]',
          '```',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'csv-delimited-stream': {
    id: 'csv-delimited-stream',
    name: 'CsvDelimitedStreamSkill',
    displayName: 'CSV Delimited Data Stream',
    categoryId: 'output',
    description: 'Outputs raw tabular data as comma-separated or tab-separated values ready for spreadsheets.',
    tags: ['output', 'csv', 'stream', 'tabular', 'excel'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Формат Вывода: CSV Data Stream',
        'Output Format: CSV Tabular Stream',
        [
          'Вывести данные в формате CSV с экранированием строк, содержащих запятые, и обязательной строкой заголовков.',
        ],
        [
          'Deliver payload as standard RFC-4180 CSV with mandatory header row and proper quote escaping.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'typed-interface-contracts': {
    id: 'typed-interface-contracts',
    name: 'TypedInterfaceContractsSkill',
    displayName: 'TypeScript Type & Interface Contracts',
    categoryId: 'output',
    description: 'Formats all data models as strict, compile-time verified TypeScript interfaces with JSDoc.',
    tags: ['output', 'typescript', 'interfaces', 'types', 'jsdoc'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Контракты Типов TypeScript',
        'TypeScript Interface Contracts',
        [
          'Все структуры данных описать в виде строгих TypeScript `interface` / `type` с readonly-полями и JSDoc комментариями.',
        ],
        [
          'All data models must be specified as immutable, strict TypeScript interfaces with comprehensive JSDoc annotations.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'diff-patch-format': {
    id: 'diff-patch-format',
    name: 'DiffPatchFormatSkill',
    displayName: 'Unified Git Diff / Patch Format',
    categoryId: 'output',
    description: 'Formats code modifications as clean unified git diffs with + and - line changes.',
    tags: ['output', 'diff', 'patch', 'git', 'refactoring'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Формат Изменений: Unified Git Diff',
        'Unified Git Diff Patch Format',
        [
          'Представить изменения в коде в формате unified diff (`diff --git a/... b/...`) с четким контекстом 3 строк.',
        ],
        [
          'Format all code updates as unified Git diff blocks (`--- a/...`, `+++ b/...`) with 3 lines of surrounding context.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'semantic-html-structure': {
    id: 'semantic-html-structure',
    name: 'SemanticHtmlStructureSkill',
    displayName: 'Semantic Accessible HTML5 Output',
    categoryId: 'output',
    description: 'Enforces clean semantic HTML5 markup with ARIA landmarks and zero unsemantic div-soup.',
    tags: ['output', 'html', 'semantic', 'aria', 'accessibility'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Семантическая Разметка HTML5',
        'Semantic Accessible HTML5 Markup',
        [
          'Использовать семантические теги (`<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`) и корректные ARIA-атрибуты.',
        ],
        [
          'Enforce strict semantic HTML5 tags (`<main>`, `<article>`, `<header>`, `<footer>`) with explicit WCAG ARIA attributes.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'key-value-manifest': {
    id: 'key-value-manifest',
    name: 'KeyValueManifestSkill',
    displayName: 'Key-Value Configuration Manifest (.env / INI)',
    categoryId: 'output',
    description: 'Formats secrets and environmental parameters into key-value configuration manifest format.',
    tags: ['output', 'env', 'key-value', 'manifest', 'configuration'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Манифест Переменных Окружения (.env)',
        'Environment Variable Key-Value Manifest',
        [
          'Сформировать блок переменных окружения в формате `KEY=value` с подробными комментариями `#` по каждому параметру.',
        ],
        [
          'Emit environment parameters in standard `KEY=value` manifest format with inline `#` configuration notes.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'executive-summary-brevity': {
    id: 'executive-summary-brevity',
    name: 'ExecutiveSummaryBrevitySkill',
    displayName: 'Executive 3-Sentence Bottom-Line Upfront (BLUF)',
    categoryId: 'output',
    description: 'Places an ultra-crisp 3-sentence BLUF summary at the very top before any technical breakdown.',
    tags: ['output', 'bluf', 'executive', 'brevity', 'summary'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Структура BLUF (Bottom-Line Upfront)',
        'Bottom-Line Upfront (BLUF) Structure',
        [
          'Первые 3 предложения ответа обязаны сформулировать суть решения, финансовый/технический эффект и главный вывод.',
        ],
        [
          'The first 3 sentences must deliver a crisp BLUF: Core Conclusion, Primary Impact, and Immediate Work Item.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'sql-ddl-schema': {
    id: 'sql-ddl-schema',
    name: 'SqlDdlSchemaSkill',
    displayName: 'Idempotent PostgreSQL DDL Schema Output',
    categoryId: 'output',
    description: 'Emits valid, idempotent SQL DDL scripts with CREATE TABLE IF NOT EXISTS, indexes, and constraints.',
    tags: ['output', 'sql', 'ddl', 'postgres', 'schema'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Формат SQL DDL Схемы',
        'PostgreSQL SQL DDL Schema Format',
        [
          'Вывод в виде идемпотентного SQL-скрипта (CREATE TABLE IF NOT EXISTS, внешние ключи, составные индексы, триггеры updated_at).',
        ],
        [
          'Emit hardened, idempotent PostgreSQL DDL with explicit foreign keys, composite indexes, and timestamp triggers.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'latex-mathematical-formulas': {
    id: 'latex-mathematical-formulas',
    name: 'LatexMathematicalFormulasSkill',
    displayName: 'LaTeX Mathematical Typography',
    categoryId: 'output',
    description: 'Renders all mathematical proofs, algorithms, and equations in standardized LaTeX notation.',
    tags: ['output', 'latex', 'math', 'formulas', 'equations'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Математическая Нотация LaTeX',
        'LaTeX Mathematical Typography Spec',
        [
          'Все математические формулы и статистические выкладки оформлять в блоках LaTeX (`$$...$$` для формул, `$...$` в тексте).',
        ],
        [
          'Format all mathematical equations, cost functions, and probability formulas in clean LaTeX notation (`$$...$$`).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
