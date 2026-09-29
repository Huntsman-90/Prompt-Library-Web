import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const RESEARCH_SKILLS: Record<string, SkillDefinition> = {
  'literature-synthesis': {
    id: 'literature-synthesis',
    name: 'LiteratureSynthesisSkill',
    displayName: 'Academic Literature Cross-Synthesis',
    categoryId: 'research',
    description: 'Synthesizes disparate academic papers, extracting core consensus, open controversies, and methodologies.',
    tags: ['research', 'literature-review', 'academic', 'synthesis', 'papers'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Синтез Академической Литературы (Literature Synthesis)',
        'Academic Literature Cross-Synthesis Protocol',
        [
          '- **Научный консенсус**: Зафиксировать общепринятые фундаментальные положения в предметной области.',
          '- **Поле дискуссии и противоречия**: Сопоставить конкурирующие исследовательские школы и расхождения в данных.',
          '- **Белые пятна (Research Gaps)**: Указать неисследованные области, требующие дальнейших экспериментов.',
        ],
        [
          '- **Scientific Consensus**: Establish accepted foundational paradigms across reviewed literature.',
          '- **Emerging Controversies**: Contrast competing empirical findings and methodological divergences.',
          '- **Identified Research Gaps**: Highlight unaddressed questions and uncharted experimental terrain.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'methodology-critique': {
    id: 'methodology-critique',
    name: 'MethodologyCritiqueSkill',
    displayName: 'Rigorous Research Methodology Critique',
    categoryId: 'research',
    description: 'Audits scientific methodologies for sample selection bias, confounding variables, p-hacking, and reproducibility.',
    tags: ['research', 'methodology', 'critique', 'bias', 'p-hacking', 'validity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Критический Аудит Методологии Исследования',
        'Methodological Validity & Bias Audit Protocol',
        [
          '- **Внутренняя валидность (Internal Validity)**: Проверить контроль вмешивающихся факторов (confounders).',
          '- **Внешняя валидность (External Validity)**: Оценить переносимость результатов на реальную генеральную совокупность.',
          '- **Риск p-hacking и HARKing**: Проверить гипотезы на предварительную регистрацию протокола (Pre-registration).',
        ],
        [
          '- **Internal Validity**: Audit experimental controls against confounding variables and selection bias.',
          '- **External Validity**: Assess generalizability of experimental cohorts to target production populations.',
          '- **Statistical Integrity**: Scrutinize data for p-hacking, data dredging, and post-hoc hypothesis fabrication (HARKing).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'hypothesis-falsification': {
    id: 'hypothesis-falsification',
    name: 'HypothesisFalsificationSkill',
    displayName: 'Popperian Falsification & Null Hypothesis (H0)',
    categoryId: 'research',
    description: 'Formulates explicit, mathematically falsifiable null (H0) and alternative (H1) hypotheses with rejection criteria.',
    tags: ['research', 'hypothesis', 'popper', 'falsification', 'h0', 'statistics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Фальсифицируемость Гипотез (Попперианский Подход)',
        'Popperian Hypothesis Falsification Protocol',
        [
          '- **Нулевая гипотеза (H0)**: Сформулировать базовое предположение об отсутствии эффекта.',
          '- **Альтернативная гипотеза (H1)**: Сформулировать проверяемый измеримый эффект.',
          '- **Критерий опровержения (Falsification Criteria)**: Указать точный результат эксперимента, который полностью опровергнет H1.',
        ],
        [
          '- **Null Hypothesis (H0)**: Formulate conservative baseline assumption of zero statistical delta.',
          '- **Alternative Hypothesis (H1)**: Specify explicit, directional, measurable effect size.',
          '- **Falsification Threshold**: Define the empirical test outcome that definitively invalidates H1.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'systematic-literature-review': {
    id: 'systematic-literature-review',
    name: 'SystematicLiteratureReviewSkill',
    displayName: 'PRISMA Systematic Review Protocol',
    categoryId: 'research',
    description: 'Designs reproducible literature search queries (Boolean strings) across PubMed, IEEE Xplore, and arXiv.',
    tags: ['research', 'systematic-review', 'prisma', 'boolean-search', 'arxiv'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Протокол Систематического Обзора Литературы',
        'PRISMA Systematic Literature Search Protocol',
        [
          '- Сформировать логический поисковый запрос (Boolean Search String: `("distributed systems" OR "raft") AND ("byzantine")`).',
          '- Указать критерии включения и исключения (Inclusion / Exclusion Criteria).',
        ],
        [
          '- Formulate reproducible Boolean search strings optimized for academic databases (`("latency" OR "throughput") AND ("caching")`).',
          '- Establish transparent, pre-determined Inclusion and Exclusion criteria.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'citation-attribution-rigor': {
    id: 'citation-attribution-rigor',
    name: 'CitationAttributionRigorSkill',
    displayName: 'APA / IEEE Academic Citation Attribution',
    categoryId: 'research',
    description: 'Formats references in standardized APA 7th / IEEE style with DOIs, author lists, and publication years.',
    tags: ['research', 'citation', 'apa', 'ieee', 'attribution', 'doi'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Формат Библиографических Ссылок (APA 7th / IEEE)',
        'Academic Citation & Attribution Standard (APA / IEEE)',
        [
          'Оформить список литературы по стандарту APA 7th: `Автор, И. И. (Год). Название статьи. Журнал, Том(Номер), Страницы. DOI`.',
        ],
        [
          'Format all cited claims in standard APA 7th / IEEE notation with mandatory author names, publication year, and canonical DOI links.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'sample-size-statistical-power': {
    id: 'sample-size-statistical-power',
    name: 'SampleSizeStatisticalPowerSkill',
    displayName: 'Sample Size & Statistical Power Calculation',
    categoryId: 'research',
    description: 'Calculates statistical power (1 - Beta = 0.80), alpha error (0.05), and minimum detectable effect size (MDE).',
    tags: ['research', 'power-analysis', 'sample-size', 'mde', 'statistics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Расчет Объема Выборки и Статистической Мощности',
        'Sample Size & Statistical Power Calculation Protocol',
        [
          '- Зафиксировать параметры: Уровень значимости alpha = 0.05, Мощность теста (1 - beta) = 0.80, Минимально различимый эффект (MDE = 2%).',
        ],
        [
          '- Model statistical sample size parameters: Significance level alpha = 0.05, Power (1 - beta) = 0.80, Minimum Detectable Effect (MDE).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'confounding-variable-audit': {
    id: 'confounding-variable-audit',
    name: 'ConfoundingVariableAuditSkill',
    displayName: 'Confounding Variable & Selection Bias Audit',
    categoryId: 'research',
    description: 'Detects hidden third-variable confounders and Simpson\'s Paradox anomalies in research datasets.',
    tags: ['research', 'confounders', 'bias', 'simpsons-paradox', 'causality'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Аудит Вмешивающихся Факторов (Confounders)',
        'Confounding Variable & Selection Bias Audit',
        [
          '- Проверить данные на наличие парадокса Симпсона (когда тренд исчезает при разбиении на подгруппы) и скрытых сопутствующих факторов.',
        ],
        [
          '- Audit dataset for hidden third-variable confounders and Simpson\'s Paradox anomalies reversing subgroup trends.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'research-gap-identification': {
    id: 'research-gap-identification',
    name: 'ResearchGapIdentificationSkill',
    displayName: 'Scientific Research Gap & White-Space Discovery',
    categoryId: 'research',
    description: 'Identifies methodological, conceptual, and empirical white spaces in the existing body of scientific literature.',
    tags: ['research', 'research-gap', 'white-space', 'novelty', 'discovery'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Выявление Исследовательских Пробелов (Research Gaps)',
        'Scientific Research Gap & Opportunity Discovery',
        [
          '- Сформулировать 3 конкретных пробела в существующих исследованиях, которые не закрыты текущими научными статьями.',
        ],
        [
          '- Delineate 3 concrete empirical or theoretical research gaps remaining unaddressed in published literature.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'meta-analysis-weighting': {
    id: 'meta-analysis-weighting',
    name: 'MetaAnalysisWeightingSkill',
    displayName: 'Meta-Analysis Random-Effects Weighting',
    categoryId: 'research',
    description: 'Applies inverse-variance and DerSimonian-Laird random-effects weighting across aggregated study results.',
    tags: ['research', 'meta-analysis', 'weighting', 'statistics', 'random-effects'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Мета-Аналитическое Взвешивание Результатов',
        'Meta-Analysis Inverse-Variance Weighting Protocol',
        [
          '- Рассчитать веса исследований обратно пропорционально их выборочной дисперсии (обратно-дисперсионное взвешивание).',
        ],
        [
          '- Apply inverse-variance weighting and DerSimonian-Laird random-effects pooling across aggregated experimental effect sizes.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'theoretical-framework-mapping': {
    id: 'theoretical-framework-mapping',
    name: 'TheoreticalFrameworkMappingSkill',
    displayName: 'Theoretical Framework Grounding & Taxonomy',
    categoryId: 'research',
    description: 'Grounds empirical research into recognized scientific theoretical paradigms (e.g. Actor-Network Theory, Diffusion of Innovations).',
    tags: ['research', 'theoretical-framework', 'paradigms', 'theory', 'academic'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Привязка к Теоретическому Фреймворку',
        'Theoretical Framework Grounding & Mapping',
        [
          '- Явно опереться на фундаментальную научную теорию и показать, как переменные исследования соотносятся с теоретическими концептами.',
        ],
        [
          '- Anchor investigation within an established theoretical framework, mapping observed variables to core theoretical constructs.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'qualitative-coding-schema': {
    id: 'qualitative-coding-schema',
    name: 'QualitativeCodingSchemaSkill',
    displayName: 'Grounded Theory Qualitative Coding Schema',
    categoryId: 'research',
    description: 'Executes Open Coding, Axial Coding, and Selective Coding across unstructured interview transcripts.',
    tags: ['research', 'qualitative', 'grounded-theory', 'coding', 'thematic-analysis'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Качественное Кодирование Данных (Grounded Theory)',
        'Grounded Theory Qualitative Thematic Coding Schema',
        [
          '- 1. Открытое кодирование (Open Coding) -> 2. Осевое кодирование (Axial Coding) -> 3. Выборочное кодирование (Selective Coding).',
        ],
        [
          '- 3-Phase Coding: 1. Open Coding (atomic labels) -> 2. Axial Coding (category relationships) -> 3. Selective Coding (core unifying theory).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'peer-review-constructive-critique': {
    id: 'peer-review-constructive-critique',
    name: 'PeerReviewConstructiveCritiqueSkill',
    displayName: 'Blind Academic Peer-Review Referee Report',
    categoryId: 'research',
    description: 'Drafts a formal peer-review referee report: Summary, Major Compulsory Revisions, Minor Improvements, and Recommendation.',
    tags: ['research', 'peer-review', 'referee', 'academic', 'journal'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Рецензия на Научную Статью (Peer-Review Report)',
        'Academic Peer-Review Referee Report Architecture',
        [
          'Структура рецензии:',
          '1. **Общая оценка новизны и вклада** (Summary of Novelty).',
          '2. **Критические замечания, требующие доработки** (Major Revisions).',
          '3. **Незначительные стилистические правки** (Minor Revisions).',
          '4. **Итоговая рекомендация** (Accept / Minor / Major / Reject).',
        ],
        [
          'Formal Peer-Review Report Architecture:',
          '1. **Summary of Scientific Contribution & Novelty**.',
          '2. **Major Methodological Deficiencies & Revisions** (Compulsory).',
          '3. **Minor Typographical & Citation Corrections**.',
          '4. **Editorial Recommendation** (Accept / Minor Revision / Major Revision / Reject).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'reproducibility-verification': {
    id: 'reproducibility-verification',
    name: 'ReproducibilityVerificationSkill',
    displayName: 'Reproducibility & Open Science Protocol',
    categoryId: 'research',
    description: 'Validates that code, random seeds, datasets, and execution environments are fully reproducible by independent researchers.',
    tags: ['research', 'reproducibility', 'open-science', 'seeds', 'artifacts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Требования к Воспроизводимости (Reproducibility)',
        'Reproducibility & Open Science Directives',
        [
          '- Зафиксировать сиды генератора случайных чисел (`seed = 42`), версии пакетов и предоставить скрипт детерминированного воспроизведения результатов.',
        ],
        [
          '- Lock pseudo-random generator seeds (`seed = 42`), pin deterministic dependency trees, and provide a 1-click replication script.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'research-dissemination-brief': {
    id: 'research-dissemination-brief',
    name: 'ResearchDisseminationBriefSkill',
    displayName: 'Policy & Executive Research Dissemination Brief',
    categoryId: 'research',
    description: 'Converts complex 50-page academic papers into 1-page policy briefs with actionable recommendations for policymakers.',
    tags: ['research', 'dissemination', 'policy-brief', 'executive-summary'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Краткая Аналитическая Записка (Policy Brief)',
        'Policy & Executive Research Dissemination Brief',
        [
          '- Сформировать 1-страничную выжимку: 1. Ключевой тезис исследования, 2. Доказательная база, 3. Три конкретные рекомендации для лиц, принимающих решения.',
        ],
        [
          '- Emit a 1-page high-impact policy brief: 1. Core Thesis, 2. Empirical Evidence Base, 3. Three Concrete Strategic Recommendations.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
