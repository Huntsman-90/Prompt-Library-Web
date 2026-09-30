const { appendSkills } = require('../appendSkills.cjs');

const METAPROMPTING_10 = [
  {
    id: "metaprompt-few-shot-hard-negative-miner",
    name: "MetapromptFewShotHardNegativeMinerSkill",
    displayName: "Hard Negative Mining for Few-Shot Prompts",
    categoryId: "metaprompting",
    description: "Mines and crafts high-value negative few-shot examples illustrating subtle misconceptions to avoid.",
    tags: ["metaprompting", "few-shot", "hard-negatives", "contrastive", "prompt-tuning"],
    sectionName: "Hard Negative Few-Shot Exemplar Contrast",
    ruSectionName: "Контрастные примеры с разбором ошибок (Hard Negative Mining)",
    instructions: [
      "Provide paired examples: 1 Common Incorrect Anti-Pattern vs 1 Correct Canonical Implementation.",
      "Highlight the exact point of failure in the anti-pattern (e.g. subtle race condition or missing bounds check).",
      "Reinforce the correct behavioral invariant."
    ],
    ruInstructions: [
      "Приведите парные примеры: частая типичная ошибка vs каноническое решение.",
      "Укажите точную причину сбоя в ошибочном варианте.",
      "Закрепите правильный алгоритм действий."
    ],
    semanticType: "metaprompt_directive"
  },
  {
    id: "metaprompt-structured-json-patch-rfc6902",
    name: "MetapromptStructuredJsonPatchRfc6902Skill",
    displayName: "RFC 6902 JSON Patch & Pointer Transformation Specification",
    categoryId: "metaprompting",
    description: "Instructs models to output mutations strictly as RFC 6902 JSON Patch arrays (`add`, `remove`, `replace`).",
    tags: ["metaprompting", "json-patch", "rfc6902", "data-mutations", "api"],
    sectionName: "RFC 6902 JSON Patch Specification",
    ruSectionName: "Спецификация точечных мутаций RFC 6902 JSON Patch",
    instructions: [
      "Format output as a valid RFC 6902 JSON array: `[{ \"op\": \"replace\", \"path\": \"/status\", \"value\": \"active\" }]`.",
      "Use precise JSON Pointers for array indices and nested keys.",
      "Ensure atomicity: either all patch operations apply cleanly or none do."
    ],
    ruInstructions: [
      "Форматируйте результат в виде массива операций стандарта RFC 6902 JSON Patch.",
      "Используйте точные пути JSON Pointers для вложенных структур.",
      "Гарантируйте атомарность применения всех операций патча."
    ],
    semanticType: "metaprompt_directive"
  },
  {
    id: "metaprompt-algorithmic-pseudocode-first",
    name: "MetapromptAlgorithmicPseudocodeFirstSkill",
    displayName: "Algorithmic Pseudocode & Mathematical Pre-Condition Protocol",
    categoryId: "metaprompting",
    description: "Requires the model to write clean, unambiguous algorithmic pseudocode before generating language-specific code.",
    tags: ["metaprompting", "pseudocode", "algorithms", "formal-spec", "code-generation"],
    sectionName: "Algorithmic Pseudocode & Invariant Specification",
    ruSectionName: "Формулирование алгоритмического псевдокода перед реализацией",
    instructions: [
      "Write high-level, language-agnostic structured pseudocode outlining core state mutations.",
      "State explicit loop invariants, entry preconditions, and exit postconditions.",
      "Translate verified pseudocode directly into production-ready typed code."
    ],
    ruInstructions: [
      "Опишите логику решения на структурированном платформонезависимом псевдокоде.",
      "Зафиксируйте инварианты циклов и предусловия функций.",
      "Транслируйте проверенный псевдокод в готовый код на целевом языке программирования."
    ],
    semanticType: "metaprompt_directive"
  },
  {
    id: "metaprompt-prompt-chaining-step-schema",
    name: "MetapromptPromptChainingStepSchemaSkill",
    displayName: "Multi-Step Prompt Chain & Intermediate State Schema",
    categoryId: "metaprompting",
    description: "Architects decoupled prompt chains where the output of Prompt N strictly conforms to the input schema of Prompt N+1.",
    tags: ["metaprompting", "prompt-chaining", "orchestration", "pipelines", "architecture"],
    sectionName: "Prompt Chain Step Specification & Interface Schema",
    ruSectionName: "Проектирование цепочек промптов (Prompt Chaining) и передача состояния",
    instructions: [
      "Define discrete input and output schemas for each step in the multi-prompt pipeline.",
      "Isolate heavy reasoning into Step 1 (Analysis), schema extraction into Step 2, and synthesis into Step 3.",
      "Prevent context bloat by passing only structured JSON variables between consecutive chain steps."
    ],
    ruInstructions: [
      "Определите четкие входные и выходные схемы для каждого шага цепочки.",
      "Разделите логику: Шаг 1 (Анализ), Шаг 2 (Извлечение сущностей), Шаг 3 (Синтез ответа).",
      "Передавайте между шагами только структурированные переменные, исключая накопление лишнего контекста."
    ],
    semanticType: "metaprompt_directive"
  },
  {
    id: "metaprompt-token-efficiency-telegraphic-compression",
    name: "MetapromptTokenEfficiencyTelegraphicCompressionSkill",
    displayName: "Telegraphic Prompt Syntax & Dense Directive Encoding",
    categoryId: "metaprompting",
    description: "Encodes complex rules using dense symbolic notation, minimizing token footprint while maximizing execution fidelity.",
    tags: ["metaprompting", "token-efficiency", "telegraphic", "compression", "syntax"],
    sectionName: "Telegraphic Syntax & Dense Directive Encoding",
    ruSectionName: "Телеграфный синтаксис и сверхплотное кодирование директив",
    instructions: [
      "Replace verbose sentence prose with compact key-value directives: `Format: JSON | Schema: UserV2 | Constraint: NoNulls`.",
      "Use bulleted operator shorthand for boolean conditions.",
      "Achieve 50% prompt token reduction while maintaining 100% rule compliance."
    ],
    ruInstructions: [
      "Замените длинные фразы компактными директивами вида `Формат: JSON | Схема: V2 | Запрет: Null`.",
      "Используйте короткие операторы для логических условий.",
      "Сократите объем промпта в 2 раза при сохранении строгости соблюдения правил."
    ],
    semanticType: "metaprompt_directive"
  },
  {
    id: "metaprompt-domain-boundary-invariant-lock",
    name: "MetapromptDomainBoundaryInvariantLockSkill",
    displayName: "Domain Boundary & Out-of-Scope Task Rejection Filter",
    categoryId: "metaprompting",
    description: "Equips prompts with clear boundary filters that immediately refuse out-of-scope requests outside designated domain expertise.",
    tags: ["metaprompting", "domain-boundary", "scope-filter", "guardrails", "precision"],
    sectionName: "Domain Scope & Out-of-Scope Rejection Policy",
    ruSectionName: "Фильтр границ предметной области и отсечение нерелевантных задач",
    instructions: [
      "Explicitly define the strict in-scope domain boundaries (e.g. 'Only answer questions regarding PostgreSQL database performance').",
      "Politely and immediately decline tasks falling outside designated boundaries.",
      "Prevent model from giving mediocre amateur advice on unspecialized topics."
    ],
    ruInstructions: [
      "Четко очертите границы компетенции роли (например, «Исключительно вопросы оптимизации PostgreSQL»).",
      "Вежливо отклоняйте задачи, выходящие за пределы выделенной специализации.",
      "Не допускайте генерации дилетантских ответов на непрофильные темы."
    ],
    semanticType: "metaprompt_directive"
  },
  {
    id: "metaprompt-structured-decision-tree-prompt",
    name: "MetapromptStructuredDecisionTreePromptSkill",
    displayName: "Deterministic Decision Tree & Branching Prompt Architecture",
    categoryId: "metaprompting",
    description: "Structures prompts into deterministic decision trees with numbered evaluation branches.",
    tags: ["metaprompting", "decision-tree", "branching", "deterministic", "logic"],
    sectionName: "Deterministic Decision Tree Branching Protocol",
    ruSectionName: "Дерево решений в промптах и детерминированное ветвление логики",
    instructions: [
      "Structure instructions into numbered evaluation gates: Gate 1 (Input Validity) -> Gate 2 (Classification) -> Gate 3 (Action).",
      "Specify exact branch routes for all condition outcomes.",
      "Eliminate ambiguity by making each branch mutually exclusive."
    ],
    ruInstructions: [
      "Оформите промпт в виде последовательных гейтов: Гейт 1 (Валидация) -> Гейт 2 (Классификация) -> Гейт 3 (Действие).",
      "Укажите точные маршруты для каждого исхода проверки.",
      "Сделайте ветви логики взаимоисключающими."
    ],
    semanticType: "metaprompt_directive"
  },
  {
    id: "metaprompt-automated-rubric-grading-prompt",
    name: "MetapromptAutomatedRubricGradingPromptSkill",
    displayName: "Automated LLM-as-a-Judge Evaluation & Grading Prompt",
    categoryId: "metaprompting",
    description: "Constructs rigorous LLM-as-a-Judge grading rubrics with 1-5 scoring anchors and calibration guidelines.",
    tags: ["metaprompting", "llm-judge", "evaluation", "grading", "rubric", "benchmarks"],
    sectionName: "LLM-as-a-Judge Calibration & Grading Rubric",
    ruSectionName: "Промпт для оценки качества модели (LLM-as-a-Judge) с калибровочной шкалой",
    instructions: [
      "Define 5-point scoring rubrics with concrete qualitative descriptions for Score 1, Score 3, and Score 5.",
      "Require the judge to write an analytical justification before assigning numeric scores.",
      "Mitigate position bias and verbosity bias with standardized comparison protocols."
    ],
    ruInstructions: [
      "Задайте 5-балльную шкалу с четкими критериями для баллов 1, 3 и 5.",
      "Требуйте развернутого обоснования оценки перед выставлением итогового балла.",
      "Устраните предвзятость к длине текста и порядку вывода кандидатов."
    ],
    semanticType: "metaprompt_directive"
  },
  {
    id: "metaprompt-variable-extraction-regex-schema",
    name: "MetapromptVariableExtractionRegexSchemaSkill",
    displayName: "Information Extraction & Regular Expression Entity Parser",
    categoryId: "metaprompting",
    description: "Structures prompts that extract structured entity tuples from raw text with regex verification.",
    tags: ["metaprompting", "extraction", "regex", "ner", "structured-data"],
    sectionName: "Entity Extraction & Regular Expression Schema",
    ruSectionName: "Извлечение структурированных сущностей и валидация регулярными выражениями",
    instructions: [
      "Extract entity tuples `[Entity Name, Entity Type, Normalized Value]` from unstructured text.",
      "Validate extracted strings against strict regular expression patterns (e.g. ISO-8601 dates, UUIDs, Email).",
      "Return extracted records in clean, parsable JSON array format."
    ],
    ruInstructions: [
      "Извлекайте сущности в виде кортежей `[Имя, Тип, Нормализованное значение]`.",
      "Проверяйте извлеченные данные регулярными выражениями (даты ISO-8601, UUID, email).",
      "Возвращайте результат в виде чистого JSON-массива."
    ],
    semanticType: "metaprompt_directive"
  },
  {
    id: "metaprompt-production-ready-deliverable-gate",
    name: "MetapromptProductionReadyDeliverableGateSkill",
    displayName: "Production-Ready Deliverable Sign-Off & Completeness Gate",
    categoryId: "metaprompting",
    description: "Enforces that all generated code, configs, and documentation are 100% complete with zero placeholders.",
    tags: ["metaprompting", "production-ready", "completeness", "no-placeholders", "quality-gate"],
    sectionName: "Production-Ready Deliverable Completeness Invariants",
    ruSectionName: "Критерий 100% производственной готовности без заглушек (Production-Ready)",
    instructions: [
      "Strictly forbid placeholder comments like `// TODO: implement logic` or `...rest of code here`.",
      "Deliver 100% functional, complete, copy-pasteable files ready for immediate deployment.",
      "Include all necessary imports, configuration files, and type annotations."
    ],
    ruInstructions: [
      "Категорически запрещены заглушки вида `// TODO: дописать потом` или `...остальной код`.",
      "Предоставляйте полностью готовые файлы, пригодные к немедленному запуску.",
      "Включайте все импорты, конфигурации и аннотации типов."
    ],
    semanticType: "metaprompt_directive"
  }
];

console.log('Appending Metaprompting 10...');
appendSkills('metaprompting', METAPROMPTING_10);
console.log('Metaprompting complete.');
