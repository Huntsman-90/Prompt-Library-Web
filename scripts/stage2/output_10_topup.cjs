const { appendSkills } = require('../appendSkills.cjs');

const OUTPUT_TOPUP = [
  {
    id: "output-graphql-mutation-response-envelope",
    name: "OutputGraphqlMutationResponseEnvelopeSkill",
    displayName: "GraphQL Mutation Payload & UserErrors Envelope Standard",
    categoryId: "output",
    description: "Outputs Shopify-style mutation payloads with `userErrors: [{ field, message, code }]` and updated entity.",
    tags: ["output", "graphql", "mutations", "error-handling", "api"],
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
    semanticType: "format_directive"
  },
  {
    id: "output-markdown-architecture-decision-record-adr",
    name: "OutputMarkdownArchitectureDecisionRecordAdrSkill",
    displayName: "Standard Architectural Decision Record (ADR) Document Format",
    categoryId: "output",
    description: "Outputs clean, standardized Architectural Decision Records in GitHub-flavored Markdown.",
    tags: ["output", "adr", "architecture", "markdown", "documentation"],
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
    semanticType: "format_directive"
  },
  {
    id: "output-json-api-spec-v1-1",
    name: "OutputJsonApiSpecV11Skill",
    displayName: "JSON:API Specification (v1.1) Formatted Response",
    categoryId: "output",
    description: "Outputs responses adhering to the JSON:API v1.1 standard (`data.type`, `data.id`, `attributes`, `relationships`, `included`).",
    tags: ["output", "json-api", "rest", "api-standards", "serialization"],
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
    semanticType: "format_directive"
  },
  {
    id: "output-docker-compose-v2-production",
    name: "OutputDockerComposeV2ProductionSkill",
    displayName: "Production Docker Compose (Compose v2) Specification",
    categoryId: "output",
    description: "Outputs multi-container Docker Compose v2 YAML with healthchecks, networks, named volumes, and resource limits.",
    tags: ["output", "docker-compose", "yaml", "devops", "containers"],
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
    semanticType: "format_directive"
  },
  {
    id: "output-fastapi-pydantic-v2-schema",
    name: "OutputFastapiPydanticV2SchemaSkill",
    displayName: "Python FastAPI & Pydantic v2 Model Specification",
    categoryId: "output",
    description: "Outputs clean Python 3.12 FastAPI endpoint route handlers with Pydantic v2 `BaseModel`, `Field`, and docstrings.",
    tags: ["output", "fastapi", "pydantic", "python", "api-design"],
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
    semanticType: "format_directive"
  },
  {
    id: "output-mermaid-c4-component-diagram",
    name: "OutputMermaidC4ComponentDiagramSkill",
    displayName: "Mermaid.js C4 Component Diagram Standard",
    categoryId: "output",
    description: "Outputs Mermaid.js C4Component architecture diagrams detailing controllers, services, repositories, and databases.",
    tags: ["output", "mermaid", "c4-model", "component-diagram", "visualization"],
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
    semanticType: "format_directive"
  },
  {
    id: "output-swagger-ui-html-bundle",
    name: "OutputSwaggerUiHtmlBundleSkill",
    displayName: "Standalone Swagger UI Interactive HTML Documentation Bundle",
    categoryId: "output",
    description: "Outputs a self-contained, offline-compatible HTML file rendering interactive Swagger UI documentation.",
    tags: ["output", "swagger-ui", "html", "documentation", "api"],
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
    semanticType: "format_directive"
  },
  {
    id: "output-github-issue-template-yaml",
    name: "OutputGithubIssueTemplateYamlSkill",
    displayName: "GitHub Issue Form (YAML) Bug & Feature Template",
    categoryId: "output",
    description: "Outputs structured GitHub Issue Forms (.github/ISSUE_TEMPLATE/*.yml) with dropdowns, textareas, and validations.",
    tags: ["output", "github-issue", "yaml", "open-source", "templates"],
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
    semanticType: "format_directive"
  },
  {
    id: "output-markdown-user-story-acceptance-criteria",
    name: "OutputMarkdownUserStoryAcceptanceCriteriaSkill",
    displayName: "Agile User Story & Gherkin Acceptance Criteria (Given/When/Then)",
    categoryId: "output",
    description: "Structures user stories with Persona, Goal, Value, and Cucumber/Gherkin acceptance criteria scenarios.",
    tags: ["output", "user-story", "agile", "gherkin", "acceptance-criteria", "scrum"],
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
    semanticType: "format_directive"
  },
  {
    id: "output-prometheus-grafana-dashboard-json",
    name: "OutputPrometheusGrafanaDashboardJsonSkill",
    displayName: "Grafana 10 Dashboard Model (JSON) Specification",
    categoryId: "output",
    description: "Outputs import-ready Grafana 10 dashboard JSON with panels, time-series graphs, thresholds, and PromQL targets.",
    tags: ["output", "grafana", "prometheus", "json", "dashboards", "observability"],
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
    semanticType: "format_directive"
  }
];

console.log('Appending final 10 Output skills...');
appendSkills('output', OUTPUT_TOPUP);
console.log('Output skills completed.');
