import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const RESEARCH_SKILLS: Record<string, SkillDefinition> = {
  'literature-review-synthesis': {
    id: 'literature-review-synthesis',
    name: 'LiteratureReviewSynthesisSkill',
    displayName: 'Systematic Literature Review & Thematic Matrix',
    categoryId: 'research',
    description: 'Synthesizes academic literature into structured thematic review matrices, identifying consensus, controversies, and research gaps.',
    tags: ['research', 'literature-review', 'academic', 'synthesis', 'scholar', 'state-of-the-art'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Тематический Синтез Научной Литературы (Literature Review)',
        'Systematic Literature Review & Synthesis Matrix',
        [
          '- **Таблица источников (Thematic Matrix)**: `[Автор / Год | Методология ($N$, выборка) | Ключевые результаты | Ограничения исследования | Вклад в тему]`.',
          '- **Научный консенсус vs. Разногласия**: Выделить положения, общепринятые в научном сообществе, и спорные дискуссионные вопросы.',
          '- **Выделение белых пятен (Research Gaps)**: Четко сформулировать нерешенные исследовательские вопросы, требующие дальнейшего изучения.',
        ],
        [
          '- **Synthesis Matrix**: Tabulate: `[Study Citation (Year) | Methodology / Sample Size $N$ | Core Empirical Findings | Methodological Limitations | Thematic Contribution]`.',
          '- **Consensus vs. Controversy Delineation**: Demarcate validated empirical consensus from contentious methodological debates.',
          '- **Research Gap Demarcation**: Explicitly formulate unaddressed research gaps representing prime vectors for original investigation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'methodology-critique-peer-review': {
    id: 'methodology-critique-peer-review',
    name: 'MethodologyCritiquePeerReviewSkill',
    displayName: 'Peer-Review Academic Methodology Audit',
    categoryId: 'research',
    description: 'Conducts rigorous academic peer-review: evaluates sample size power, confounding variables, internal/external validity, and statistical rigor.',
    tags: ['research', 'peer-review', 'methodology', 'validity', 'critique', 'academic-review'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Академическое Рецензирование (Peer-Review Protocol)',
        'Academic Peer-Review & Methodology Audit Protocol',
        [
          '- **Внутренняя валидность (Internal Validity)**: Проверить наличие неучтенных конфаундеров, систематических ошибок отбора и дрейфа измерений.',
          '- **Внешняя валидность (External Validity)**: Оценить обобщаемость выводов за пределы исследованной выборки.',
          '- **Статистическая строгость**: Проверить адекватность выбранных критериев, поправки на множественные сравнения (Bonferroni / FDR) и размер эффекта.',
        ],
        [
          '- **Internal Validity Audit**: Intercept confounding variables, selection bias, attrition distortions, and instrumentation drift.',
          '- **External Validity & Generalizability**: Evaluate ecological validity and sample representativeness across broader populations.',
          '- **Statistical Rigor Verification**: Audit test assumptions, multiple hypothesis testing corrections (Bonferroni/FDR), and effect size reporting.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'hypothesis-deduction-protocol': {
    id: 'hypothesis-deduction-protocol',
    name: 'HypothesisDeductionProtocolSkill',
    displayName: 'Falsifiable Scientific Hypothesis Deduction',
    categoryId: 'research',
    description: 'Deduces crisp, testable, Popperian falsifiable hypotheses with operationalized independent and dependent variables.',
    tags: ['research', 'hypothesis', 'popper', 'falsifiability', 'variables', 'experiment-design'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Формулирование Фальсифицируемых Научных Гипотез',
        'Falsifiable Scientific Hypothesis Deduction Protocol',
        [
          '- **Операционализация переменных**: Четко задать независимую переменную (IV), зависимую переменную (DV) и контролируемые переменные.',
          '- **Формула гипотезы**: «Если [Манипуляция с IV], то [Наблюдаемое изменение в DV], при условии [Контрольные параметры]».',
          '- **Критерий опровержения**: Указать, какой именно результат эксперимента однозначно опровергнет (фальсифицирует) гипотезу.',
        ],
        [
          '- **Variable Operationalization**: Strictly define Independent Variable (IV), Dependent Variable (DV), and Controlled Variables.',
          '- **Directional Hypothesis Statement**: Format: "If [IV manipulation], then [predicted directional shift in DV], assuming [controlled bounds]".',
          '- **Popperian Refutation Criteria**: Define the exact quantitative threshold that would decisively falsify the working hypothesis.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'bibtex-citation-formatter': {
    id: 'bibtex-citation-formatter',
    name: 'BibtexCitationFormatterSkill',
    displayName: 'BibTeX & APA 7th Academic Citation Formatter',
    categoryId: 'research',
    description: 'Generates clean BibTeX entries with DOIs, alongside standard APA 7th edition formatted bibliographic references.',
    tags: ['research', 'bibtex', 'apa', 'citations', 'bibliography', 'latex', 'doi'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Форматирование Библиографии (BibTeX & APA 7th)',
        'BibTeX & APA 7th Academic Citation Specification',
        [
          '- **Синтаксис BibTeX**: Сгенерировать корректный `@article{...}` или `@inproceedings{...}` с полями `title`, `author`, `journal`, `year`, `doi`.',
          '- **Стандарт APA 7th**: Продублировать список источников в стиле APA 7 (Автор, И. О. (Год). Название статьи. *Журнал*, Том(Выпуск), Страницы. DOI).',
          '- **Точность метаданных**: Все авторы должны быть перечислены через `and` в BibTeX.',
        ],
        [
          '- **Valid BibTeX Entry**: Emit pristine `@article{key, ...}` or `@inproceedings{key, ...}` with full author, year, title, journal, volume, and DOI.',
          '- **APA 7th Reference List**: Mirror citations in standard APA 7 format (*Author, A. A. (Year). Title. Journal, Vol(Issue), Pages. https://doi.org/...*).',
          '- **Metadata Accuracy**: Ensure canonical author name formatting joined with standard `and` delimiters in BibTeX.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'prism-systematic-review-flow': {
    id: 'prism-systematic-review-flow',
    name: 'PrismSystematicReviewFlowSkill',
    displayName: 'PRISMA Systematic Review Protocol',
    categoryId: 'research',
    description: 'Implements PRISMA 2020 guidelines: Identification, Screening, Eligibility, and Included records flow diagrams.',
    tags: ['research', 'prisma', 'systematic-review', 'meta-analysis', 'screening', 'evidence'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Протокол Систематического Обзора PRISMA 2020',
        'PRISMA 2020 Systematic Review Flow Specification',
        [
          '- **1. Identification**: Число записей, найденных в базах данных (PubMed, Scopus, IEEE) и дубликатов.',
          '- **2. Screening**: Число проверенных аннотаций и отклоненных статей с указанием причин.',
          '- **3. Eligibility**: Оценка полнотекстовых статей на соответствие критериям включения.',
          '- **4. Included**: Финальное количество исследований, включенных в качественный и количественный синтез.',
        ],
        [
          '- **1. Identification Phase**: Database records discovered (PubMed, Scopus, arXiv) and duplicate removal count.',
          '- **2. Screening Phase**: Title/abstract screenings completed and excluded record volume with explicit reasons.',
          '- **3. Eligibility Phase**: Full-text articles assessed against strict inclusion/exclusion criteria.',
          '- **4. Included Phase**: Final corpus count synthesized into qualitative and quantitative meta-analysis.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'survey-instrument-design': {
    id: 'survey-instrument-design',
    name: 'SurveyInstrumentDesignSkill',
    displayName: 'Survey Instrument & Psychometric Validity',
    categoryId: 'research',
    description: 'Constructs psychometrically valid survey instruments: balanced Likert scales, reverse-coded items, and Cronbach\'s alpha reliability.',
    tags: ['research', 'survey', 'questionnaire', 'psychometrics', 'likert', 'validity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Опросника (Survey Instrument Design)',
        'Psychometric Survey Instrument & Scale Specification',
        [
          '- **Сбалансированные шкалы Лайкерта (5 или 7 точек)**: 1 (Категорически не согласен) до 5 (Полностью согласен).',
          '- **Реверсивные вопросы (Reverse-Coded Items)**: Включить инвертированные вопросы для проверки добросовестности заполнения и борьбы с acquiescence bias.',
          '- **Конструктная валидность**: Группировать вопросы по измеряемым латентным конструктам с расчетом надежности (Cronbach\'s $\\alpha > 0.70$).',
        ],
        [
          '- **Balanced 5/7-Point Likert Scales**: Calibrated bipolar anchors (1: Strongly Disagree to 5/7: Strongly Agree).',
          '- **Reverse-Coded Verification Items**: Inject reverse-scored statements to detect and neutralize acquiescence response bias.',
          '- **Construct Reliability & Alpha**: Group items under defined psychological constructs targeting Cronbach\'s alpha $\\alpha > 0.75$.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'qualitative-grounded-theory-coding': {
    id: 'qualitative-grounded-theory-coding',
    name: 'QualitativeGroundedTheoryCodingSkill',
    displayName: 'Grounded Theory Qualitative Coding (Open/Axial/Selective)',
    categoryId: 'research',
    description: 'Codes qualitative interview transcripts using Grounded Theory: Open coding (concepts), Axial coding (categories), and Selective coding (core story).',
    tags: ['research', 'grounded-theory', 'qualitative', 'coding', 'interviews', 'thematic-analysis'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Качественное Кодирование по Обоснованной Теории (Grounded Theory)',
        'Grounded Theory Qualitative Coding Protocol (Open — Axial — Selective)',
        [
          '- **Открытое кодирование (Open Coding)**: Построчный разбор текста и присвоение первичных концептуальных кодов.',
          '- **Осевое кодирование (Axial Coding)**: Группировка кодов в категории, связывание условий, контекста и последствий.',
          '- **Выборочное кодирование (Selective Coding)**: Формирование центральной объединяющей теории (Core Category), объясняющей весь феномен.',
        ],
        [
          '- **Open Coding Phase**: Line-by-line micro-analysis assigning discrete initial conceptual codes to raw participant quotes.',
          '- **Axial Coding Phase**: Consolidating open codes into robust categorical networks linking causal conditions, actions, and consequences.',
          '- **Selective Coding Phase**: Formulating the overarching core theoretical paradigm explaining the emergent qualitative phenomenon.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'meta-analysis-forest-plot': {
    id: 'meta-analysis-forest-plot',
    name: 'MetaAnalysisForestPlotSkill',
    displayName: 'Meta-Analysis Effect Sizing & Forest Plot',
    categoryId: 'research',
    description: 'Calculates pooled standardized effect sizes (Cohen\'s d, Hedges\' g) and models heterogeneity ($I^2$, Cochran\'s Q, Funnel Plot asymmetry).',
    tags: ['research', 'meta-analysis', 'forest-plot', 'effect-size', 'heterogeneity', 'statistics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Статистика Мета-Анализа и Данные Форест-Плота',
        'Meta-Analysis Pooled Effect Sizing & Heterogeneity Metrics',
        [
          '- **Расчет стандартизованных размеров эффекта**: Вычислить Hedges\' $g$ или Cohen\'s $d$ с 95% доверительными интервалами для каждого исследования.',
          '- **Оценка неоднородности (Heterogeneity)**: Рассчитать статистику $I^2$ ($I^2 > 50\\%$ указывает на высокую гетерогенность) и критерий Кохрана $Q$.',
          '- **Модель случайных эффектов (Random-Effects Model)**: Рассчитать объединенный суммарный размер эффекта (Pooled Effect Size).',
        ],
        [
          '- **Standardized Effect Sizing**: Compute Hedges\' $g$ and Cohen\'s $d$ point estimates bounded by 95% confidence intervals per study.',
          '- **Heterogeneity Metrics**: Report Higgins $I^2$ metric ($I^2 > 50\\%$ indicates substantial heterogeneity) and Cochran\'s $Q$ test $p$-value.',
          '- **Random-Effects Pooled Synthesis**: Synthesize aggregate pooled effect estimate using DerSimonian-Laird random-effects weighting.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'research-ethics-irb-protocol': {
    id: 'research-ethics-irb-protocol',
    name: 'ResearchEthicsIrbProtocolSkill',
    displayName: 'Institutional Review Board (IRB) Ethics Protocol',
    categoryId: 'research',
    description: 'Drafts IRB ethical approval protocols: informed consent procedures, risk-benefit ratios, data anonymization, and vulnerable populations.',
    tags: ['research', 'irb', 'ethics', 'human-subjects', 'consent', 'compliance'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Этического Комитета (IRB Ethics Application)',
        'Institutional Review Board (IRB) Ethics Protocol Specification',
        [
          '- **Оценка соотношения риска и пользы**: Подтвердить, что риски для участников минимальны и оправданы научной ценностью.',
          '- **Процедура информированного согласия (Informed Consent)**: Разработать форму согласия с разъяснением добровольности и права на отзыв в любой момент.',
          '- **Анонимизация и защита данных**: Описать протокол де-идентификации и безопасного хранения данных на зашифрованных серверах.',
        ],
        [
          '- **Risk-Benefit Balance**: Formulate evidence that participant risks are minimal and outweighed by scientific knowledge gains.',
          '- **Informed Consent Protocol**: Draft plain-language consent forms detailing voluntary participation and unconditional withdrawal rights.',
          '- **De-Identification & Confidentiality**: Specify cryptographic data anonymization procedures and access controls.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'reproducibility-artifact-badge': {
    id: 'reproducibility-artifact-badge',
    name: 'ReproducibilityArtifactBadgeSkill',
    displayName: 'Open Science Reproducibility & Artifact Package',
    categoryId: 'research',
    description: 'Packages research for 100% computational reproducibility: deterministic random seeds, Docker environment lockfiles, and raw data schemas.',
    tags: ['research', 'reproducibility', 'open-science', 'docker', 'seeds', 'artifacts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Чеклист Воспроизводимости Исследования (Artifact Badge)',
        'Open Science Reproducibility & Artifact Specification',
        [
          '- **Фиксация случайных сидов (Random Seeds)**: Явно указать фиксированный `seed=42` для всех стохастических генераторов и разделений выборки.',
          '- **Среда выполнения (Environment Lockfile)**: Предоставить `Dockerfile` или `requirements.txt` с точными зафиксированными версиями библиотек.',
          '- **Скрипт репликации в 1 команду**: Включить `run_all.sh` для автоматического воспроизведения всех графиков и таблиц из сырых данных.',
        ],
        [
          '- **Deterministic Seed Pinning**: Enforce fixed pseudorandom seeds (`seed=42`) across all stochastic algorithms and cross-validation splits.',
          '- **Hermetic Environment Manifest**: Provide pinned `Dockerfile` or locked dependency manifests guaranteeing computational reproducibility.',
          '- **One-Click Replication Harness**: Include an automated `reproduce.sh` pipeline generating all figures and statistical tables from raw data.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'inter-rater-reliability-kappa': {
    id: 'inter-rater-reliability-kappa',
    name: 'InterRaterReliabilityKappaSkill',
    displayName: 'Inter-Rater Reliability & Cohen\'s Kappa (κ)',
    categoryId: 'research',
    description: 'Calculates inter-coder agreement metrics: Cohen\'s Kappa ($\\kappa$), Fleiss\' Kappa, and Krippendorff\'s Alpha.',
    tags: ['research', 'inter-rater', 'reliability', 'kappa', 'coding', 'statistics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Оценка Надежности Кодирования (Cohen\'s Kappa $\\kappa$)',
        'Inter-Rater Reliability & Cohen\'s Kappa Protocol',
        [
          '- **Формула расчета $\\kappa$**: Вычислить $\\kappa = (P_o - P_e) / (1 - P_e)$, где $P_o$ — наблюдаемое согласие, $P_e$ — случайное совпадение.',
          '- **Шкала интерпретации Лэндиса-Коха**: Оценить надежность: $< 0.40$ (Слабая), $0.61 - 0.80$ (Существенная), $> 0.81$ (Почти идеальная).',
          '- **Протокол разрешения разногласий**: Описать процедуру привлечения третьего эксперта для разрешения спорных случаев.',
        ],
        [
          '- **Cohen\'s Kappa Calculation**: Compute $\\kappa = (P_o - P_e) / (1 - P_e)$ correcting observed agreement $P_o$ for chance probability $P_e$.',
          '- **Landis & Koch Benchmark Grading**: Grade agreement: $0.61 - 0.80$ (Substantial Agreement), $> 0.81$ (Near-Perfect Agreement).',
          '- **Discrepancy Arbitration Protocol**: Formulate a structured tie-breaking protocol involving a third independent senior reviewer.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'abstract-executive-synthesis': {
    id: 'abstract-executive-synthesis',
    name: 'AbstractExecutiveSynthesisSkill',
    displayName: 'Structured Academic Abstract (250 Words)',
    categoryId: 'research',
    description: 'Formats high-impact 250-word structured academic abstracts: Background, Objectives, Methods, Results, and Conclusions.',
    tags: ['research', 'abstract', 'academic-writing', 'summary', 'paper', 'concise'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Структурированный Академический Аннотация (Abstract / 250 слов)',
        'Structured Academic Abstract Specification (250-Word Target)',
        [
          '- **Background (Актуальность)**: 1–2 предложения о нерешенной научной проблеме.',
          '- **Methods (Методы)**: Выборка, экспериментальный дизайн и ключевые инструменты анализа.',
          '- **Results (Результаты)**: Главные численные результаты с доверительными интервалами и p-value.',
          '- **Conclusions (Выводы)**: Практическое значение открытия для науки и индустрии.',
        ],
        [
          '- **Background & Objective**: 1-2 opening sentences defining the unresolved scientific bottleneck and primary objective.',
          '- **Methods**: Design topology, cohort sample size $N$, and statistical evaluation framework.',
          '- **Results**: Quantitative headline findings with exact effect sizes, 95% CIs, and $p$-value metrics.',
          '- **Conclusions**: Definitive theoretical and practical implications advancing the state of the art.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'null-hypothesis-significance-audit': {
    id: 'null-hypothesis-significance-audit',
    name: 'NullHypothesisSignificanceAuditSkill',
    displayName: 'Anti-P-Hacking & Preregistration Audit',
    categoryId: 'research',
    description: 'Audits studies against p-hacking, HARKing (Hypothesizing After Results are Known), data snooping, and publication bias.',
    tags: ['research', 'p-hacking', 'preregistration', 'statistics', 'scientific-rigor', 'reproducibility'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Защита от P-Hacking и Манипуляций со Статистикой',
        'Anti-P-Hacking & Preregistration Quality Standards',
        [
          '- **Запрет HARKing**: Запрещено формулировать гипотезы задним числом после просмотра результатов данных.',
          '- **Раскрытие всех проверенных исходов**: Обязательно сообщать обо всех протестированных переменных, а не только о тех, где $p < 0.05$.',
          '- **Пре-регистрация протокола**: Проверять наличие зарегистрированного на OSF / ClinicalTrials.gov плана анализа до сбора данных.',
        ],
        [
          '- **Strict Anti-HARKing Prohibition**: Prohibit post-hoc hypothesis fabrication fitted to emergent dataset noise.',
          '- **Complete Variable Disclosure**: Mandate reporting of all collected covariates and tested endpoints, eliminating selective publication.',
          '- **Preregistration Verification**: Verify alignment with preregistered analysis plans on OSF or AsPredicted prior to data ingestion.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'grant-proposal-aims-page': {
    id: 'grant-proposal-aims-page',
    name: 'GrantProposalAimsPageSkill',
    displayName: 'NIH/NSF Specific Aims Grant Architecture',
    categoryId: 'research',
    description: 'Formats high-conviction 1-page Specific Aims grant proposals: Significance, Innovation, Preliminary Data, and Aim 1 / Aim 2 / Aim 3.',
    tags: ['research', 'grant', 'funding', 'nih', 'nsf', 'specific-aims', 'proposals'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Заявка на Грант: Страница Specific Aims (NIH/NSF)',
        'NIH/NSF Specific Aims Grant Proposal Specification',
        [
          '- **Вводный хук и нерешенная проблема (Intro & Gap)**: Актуальность проблемы и непреодолимое препятствие в текущих подходах.',
          '- **Инновационность и наша гипотеза**: Прорывная идея и сильные предварительные данные команды.',
          '- **Aim 1, Aim 2, Aim 3**: 3 независимых, логически дополняющих исследовательских блока с критериями успеха.',
          '- **Ожидаемый результат (Impact)**: Трансформационный эффект успешной реализации проекта на науку и технологии.',
        ],
        [
          '- **Significance & Critical Gap**: High-urgency opening paragraph articulating the critical barrier bounding domain progress.',
          '- **Central Hypothesis & Innovation**: The transformative hypothesis supported by rigorous preliminary feasibility data.',
          '- **Specific Aims Matrix (Aim 1 / Aim 2 / Aim 3)**: 3 mutually non-dependent, complementary research work packages with testable milestones.',
          '- **Transformative Impact Statement**: Summary articulating how completing these aims transforms scientific and clinical capability.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'cochrane-risk-of-bias-tool': {
    id: 'cochrane-risk-of-bias-tool',
    name: 'CochraneRiskOfBiasToolSkill',
    displayName: 'Cochrane RoB 2 Risk of Bias Assessment',
    categoryId: 'research',
    description: 'Systematically assesses randomized trial bias across five domains using the Cochrane RoB 2 standard tool.',
    tags: ['research', 'cochrane', 'risk-of-bias', 'systematic-review', 'methodology'],
    transform: createStandardSkillTransform({
sectionName: 'Cochrane RoB 2 Risk of Bias Protocol',
      ruSectionName: 'Оценка систематической ошибки исследований по Cochrane RoB 2',
      instructions: [
        'Evaluate randomized trials across the 5 mandatory Cochrane domains: 1) Randomization process, 2) Deviations from intended interventions, 3) Missing outcome data, 4) Measurement of outcome, and 5) Selection of reported result.',
        'Apply domain signaling questions to determine categorical judgments: "Low risk of bias", "Some concerns", or "High risk of bias".',
        'Distinguish intention-to-treat (ITT) effects from per-protocol adherence effects.',
        'Synthesize domain ratings into an overall trial risk-of-bias judgment with transparent empirical justifications.',
      ],
      ruInstructions: [
        'Оценивайте рандомизированные клинические исследования по 5 обязательным доменам Cochrane RoB 2: процесс рандомизации, отклонения от протокола вмешательства, пропущенные данные, измерение исходов и выборочное представление результатов.',
        'Используйте проверочные сигнальные вопросы для присвоения статуса риска: «Низкий риск», «Некоторые опасения» или «Высокий риск ошибки».',
        'Четко разграничивайте анализ по назначенному лечению (intention-to-treat) и анализ завершивших лечение (per-protocol).',
        'Формулируйте общее обоснованное суждение о качестве исследования с приведением прямых цитат и фактов из статьи.',
      ],
      semanticType: 'process_directive',
      tags: ['research', 'cochrane', 'risk-of-bias', 'systematic-review', 'methodology'],
    }),
  },

  'power-sample-size-estimation': {
    id: 'power-sample-size-estimation',
    name: 'PowerSampleSizeEstimationSkill',
    displayName: 'Statistical Power & Sample Size Estimation',
    categoryId: 'research',
    description: 'Calculates minimum required sample sizes based on alpha significance, statistical power (1-beta), and expected effect sizes (Cohen\'s d, OR).',
    tags: ['research', 'statistics', 'sample-size', 'statistical-power', 'hypothesis-testing'],
    transform: createStandardSkillTransform({
      sectionName: 'Statistical Power & Sample Size Estimation',
      ruSectionName: 'Расчет статистической мощности и размера выборки (Power Analysis)',
      instructions: [
        'Specify statistical parameters explicitly: Type I error rate (alpha, typically 0.05), Statistical power (1 - beta, typically 0.80 or 0.90), and expected Effect Size (Cohen\'s d, f², Odds Ratio).',
        'State the precise primary statistical hypothesis test (e.g., two-tailed independent samples t-test, repeated measures ANOVA, Cox proportional hazards regression).',
        'Account for anticipated participant attrition, drop-out rates, and non-compliance by inflating baseline sample size by 10-25%.',
        'Provide sensitivity analyses demonstrating the minimum detectable effect size (MDES) given potential recruiting constraints.',
      ],
      ruInstructions: [
        'Явно задавайте параметры расчета: вероятность ошибки I рода (альфа, обычно 0.05), статистическую мощность (1 - бета, обычно 0.80 или 0.90) и ожидаемый размер эффекта (d Коэна, отношение шансов).',
        'Указывайте точный статистический тест для первичной гипотезы (двусторонний t-критерий, дисперсионный анализ ANOVA, регрессия Кокса).',
        'Закладывайте поправку на естественное выбывание участников (attrition rate), увеличивая расчетную выборку на 10–25%.',
        'Приводите анализ чувствительности (Sensitivity Power Analysis) с расчетом минимально уловимого эффекта (MDES) при ограничении ресурсов.',
      ],
      semanticType: 'process_directive',
      tags: ['research', 'statistics', 'sample-size', 'statistical-power', 'hypothesis-testing'],
    }),
  },

  'bibliometric-citation-network-mapping': {
    id: 'bibliometric-citation-network-mapping',
    name: 'BibliometricCitationNetworkMappingSkill',
    displayName: 'Bibliometric Co-Citation & Network Density Mapping',
    categoryId: 'research',
    description: 'Maps scientific literature landscapes: co-citation clusters, bibliographic coupling, keyword co-occurrence, and author h-index impact.',
    tags: ['research', 'bibliometrics', 'citation-analysis', 'literature-review', 'scientometrics'],
    transform: createStandardSkillTransform({
sectionName: 'Bibliometric Network Mapping Protocol',
      ruSectionName: 'Библиометрический анализ и картирование цитирований',
      instructions: [
        'Analyze scientific corpora using dual bibliometric techniques: direct citation links, co-citation clustering, and bibliographic coupling.',
        'Extract high-frequency keyword co-occurrence trends to map the historical evolution and emerging frontiers of a research domain.',
        'Identify seminal foundational papers, bridge publications linking disparate fields, and dominant research clusters (Louvain modularity).',
        'Quantify academic impact indicators beyond raw citation counts: journal impact factor quartiles (Q1-Q4), author h-index, and field-weighted citation impact (FWCI).',
      ],
      ruInstructions: [
        'Анализируйте массив публикаций методами совместного цитирования (co-citation) и библиографического сочетания (bibliographic coupling).',
        'Выявляйте динамику совместной встречаемости ключевых слов для отслеживания зарождения новых исследовательских трендов.',
        'Находите фундаментальные классические работы, статьи-мосты между смежными дисциплинами и ведущие научные школы.',
        'Оценивайте наукометрические показатели исследователей: квартили журналов (Q1–Q4), индекс Хирша и нормированное по области цитирование (FWCI).',
      ],
      semanticType: 'process_directive',
      tags: ['research', 'bibliometrics', 'citation-analysis', 'literature-review', 'scientometrics'],
    }),
  },

  'thematic-analysis-braun-clarke': {
    id: 'thematic-analysis-braun-clarke',
    name: 'ThematicAnalysisBraunClarkeSkill',
    displayName: 'Braun & Clarke 6-Phase Thematic Analysis',
    categoryId: 'research',
    description: 'Executes qualitative data synthesis following Braun & Clarke\'s rigorous 6-phase reflexive thematic analysis framework.',
    tags: ['research', 'qualitative', 'thematic-analysis', 'braun-clarke', 'coding'],
    transform: createStandardSkillTransform({
      sectionName: 'Braun & Clarke Reflexive Thematic Analysis Protocol',
      ruSectionName: 'Тематический анализ качественных данных по Браун и Кларк (6 фаз)',
      instructions: [
        'Execute Phase 1 (Familiarization): Immersive reading of transcripts, noting initial impressions and reflexive subjectivities.',
        'Execute Phase 2 (Initial Code Generation): Systematic inductive or deductive coding across the complete dataset with excerpt tags.',
        'Execute Phase 3-4 (Searching & Reviewing Themes): Cluster codes into candidate themes, testing themes against full coded extracts and original dataset.',
        'Execute Phase 5-6 (Defining Themes & Producing Report): Name themes precisely, construct conceptual thematic map, and select compelling verbatim quotes.',
      ],
      ruInstructions: [
        'Фаза 1 (Погружение в материал): Глубокое прочтение расшифровок интервью с фиксацией первичных рефлексивных заметок.',
        'Фаза 2 (Первичное кодирование): Систематическое открытое кодирование текстовых фрагментов с присвоением смысловых меток.',
        'Фазы 3–4 (Формирование и ревизия тем): Объединение кодов в предварительные темы и их валидация относительно всего массива данных.',
        'Фазы 5–6 (Определение тем и отчет): Точная формулировка названий тем, построение тематической карты и подбор ярких подтверждающих цитат.',
      ],
      semanticType: 'process_directive',
      tags: ['research', 'qualitative', 'thematic-analysis', 'braun-clarke', 'coding'],
    }),
  },

  'delphi-panel-consensus-protocol': {
    id: 'delphi-panel-consensus-protocol',
    name: 'DelphiPanelConsensusProtocolSkill',
    displayName: 'Modified Delphi Expert Consensus Protocol',
    categoryId: 'research',
    description: 'Structures iterative multi-round expert panel consensus: anonymous questionnaires, controlled feedback, and statistical convergence.',
    tags: ['research', 'delphi-method', 'expert-consensus', 'panel', 'methodology'],
    transform: createStandardSkillTransform({
sectionName: 'Delphi Expert Consensus Panel Architecture',
      ruSectionName: 'Протокол экспертного консенсуса по методу Дельфи (Delphi Method)',
      instructions: [
        'Define explicit expert panel selection criteria ensuring diverse multidisciplinary representation and independence.',
        'Round 1: Administer open-ended or semi-structured questionnaires to identify key issues, perspectives, and candidate statements.',
        'Round 2+: Administer rating rounds (e.g., 9-point Likert scale) with statistical feedback (median, interquartile range IQR) from prior iterations.',
        'Define a priori consensus criteria (e.g., ≥75% agreement with ratings 7-9, IQR ≤ 1) and explicit dropping rules for non-convergent items.',
      ],
      ruInstructions: [
        'Определяйте прозрачные критерии отбора экспертов панели, обеспечивающие междисциплинарность и независимость суждений.',
        'Раунд 1: Сбор первичных качественных мнений через опросные листы для выявления спектра проблем и предварительных тезисов.',
        'Раунд 2+: Количественное голосование (шкала Лайкерта 1–9) с предоставлением обратной связи о медиане и межквартильном размахе (IQR) группы.',
        'Фиксируйте априорные критерии достижения консенсуса (например, ≥75% голосов в диапазоне 7–9 при IQR ≤ 1) и правила исключения спорных вопросов.',
      ],
      semanticType: 'process_directive',
      tags: ['research', 'delphi-method', 'expert-consensus', 'panel', 'methodology'],
    }),
  },

  'triangulation-mixed-methods-design': {
    id: 'triangulation-mixed-methods-design',
    name: 'TriangulationMixedMethodsDesignSkill',
    displayName: 'Convergent Mixed-Methods Triangulation Design',
    categoryId: 'research',
    description: 'Integrates quantitative survey/experimental data with qualitative interviews to achieve methodological triangulation and convergent validity.',
    tags: ['research', 'mixed-methods', 'triangulation', 'creswell', 'data-integration'],
    transform: createStandardSkillTransform({
sectionName: 'Convergent Mixed-Methods Triangulation Protocol',
      ruSectionName: 'Триангуляция данных в смешанных исследованиях (Mixed Methods)',
      instructions: [
        'Adopt a formal mixed-methods typology (Creswell): Convergent Parallel, Explanatory Sequential, or Exploratory Sequential design.',
        'Collect and analyze quantitative (QUAN) and qualitative (QUAL) strands independently with equal or declared priority.',
        'Structure a joint display matrix directly comparing statistical quantitative metrics alongside verbatim qualitative narratives.',
        'Identify points of convergence, expansion, or discordance (divergence), generating integrative meta-inferences resolving discrepancies.',
      ],
      ruInstructions: [
        'Используйте формальную классификацию Кресвелла: параллельный сходящийся дизайн, последовательный объяснительный или поисковый.',
        'Проводите сбор и анализ количественных (QUAN) и качественных (QUAL) данных независимо, с явным указанием их приоритета.',
        'Формируйте совместную матрицу сопоставления (joint display), где числовые показатели прямо соотносятся с нарративными цитатами участников.',
        'Анализируйте зоны схождения, взаимного дополнения или противоречий, формулируя интегрированные мета-выводы (meta-inferences).',
      ],
      semanticType: 'structural_directive',
      tags: ['research', 'mixed-methods', 'triangulation', 'creswell', 'data-integration'],
    }),
  },

  'preregistration-osf-protocol': {
    id: 'preregistration-osf-protocol',
    name: 'PreregistrationOsfProtocolSkill',
    displayName: 'Open Science Framework (OSF) Study Preregistration',
    categoryId: 'research',
    description: 'Drafts time-stamped study preregistrations to prevent HARKing, p-hacking, and outcome switching in scientific experiments.',
    tags: ['research', 'preregistration', 'open-science', 'osf', 'p-hacking-prevention'],
    transform: createStandardSkillTransform({
sectionName: 'Open Science Preregistration Architecture',
      ruSectionName: 'Пререгистрация научного протокола по стандартам OSF',
      instructions: [
        'Specify confirmatory research questions and directional hypotheses explicitly before data collection or inspection begins.',
        'Document full sampling plan: population, eligibility criteria, sample size justification, and data collection termination stopping rules.',
        'Define operational variable definitions, exact survey instruments, planned data transformations, and outlier exclusion criteria.',
        'Delineate statistical model specifications: exact regression formulas, covariates, multiple comparison correction methods, and sensitivity tests.',
      ],
      ruInstructions: [
        'Формулируйте подтверждающие гипотезы и направление ожидаемых эффектов до начала сбора данных или ознакомления с выборкой.',
        'Описывайте план формирования выборки: критерии включения/невключения, расчет мощности и точные правила остановки сбора данных.',
        'Задавайте операционализацию переменных, планируемые преобразования шкал, обработку пропусков и критерии отсева выбросов.',
        'Фиксируйте точную математическую спецификацию аналитических моделей, состав ковариат и методы поправки на множественные сравнения.',
      ],
      semanticType: 'process_directive',
      tags: ['research', 'preregistration', 'open-science', 'osf', 'p-hacking-prevention'],
    }),
  },

  'funnel-plot-publication-bias-eggers': {
    id: 'funnel-plot-publication-bias-eggers',
    name: 'FunnelPlotPublicationBiasEggersSkill',
    displayName: 'Publication Bias Audit & Egger\'s Regression Test',
    categoryId: 'research',
    description: 'Diagnoses publication bias and small-study effects in meta-analyses via funnel plot asymmetry and Egger\'s linear regression.',
    tags: ['research', 'meta-analysis', 'funnel-plot', 'publication-bias', 'eggers-test'],
    transform: createStandardSkillTransform({
      sectionName: 'Publication Bias & Funnel Plot Asymmetry Audit',
      ruSectionName: 'Аудит публикационного смещения и тест Эггера (Publication Bias)',
      instructions: [
        'Plot study effect sizes (x-axis) against measures of study precision/standard error (y-axis, inverted) to generate funnel plots.',
        'Inspect visually for funnel plot asymmetry: an absence of small studies with null/negative findings indicates probable publication bias.',
        'Perform Egger\'s linear regression test on standard normal deviates against precision; report intercept, t-statistic, and p-value.',
        'Apply Duval & Tweedie\'s Trim-and-Fill method to estimate missing studies and calculate imputed adjusted overall effect sizes.',
      ],
      ruInstructions: [
        'Стройте воронкообразный график (funnel plot), откладывая величину эффекта по оси X и стандартную ошибку (точность) по оси Y.',
        'Анализируйте асимметрию графика: отсутствие малых исследований с нулевыми или отрицательными результатами сигнализирует о систематическом смещении.',
        'Проводите линейный регрессионный тест Эггера на асимметрию; фиксируйте величину сдвига, t-статистику и p-значение.',
        'Применяйте метод «обрезки и заполнения» Дюваля и Твиди (Trim and Fill) для моделирования недостающих публикаций и пересчета истинного эффекта.',
      ],
      semanticType: 'process_directive',
      tags: ['research', 'meta-analysis', 'funnel-plot', 'publication-bias', 'eggers-test'],
    }),
  },

  'phenomenological-hermeneutic-bracket': {
    id: 'phenomenological-hermeneutic-bracket',
    name: 'PhenomenologicalHermeneuticBracketSkill',
    displayName: 'Phenomenological Epoché & Hermeneutic Bracketing',
    categoryId: 'research',
    description: 'Executes phenomenological bracketing (epoché) and hermeneutic circle analysis to interpret lived human experiences.',
    tags: ['research', 'phenomenology', 'qualitative', 'epoche', 'hermeneutics'],
    transform: createStandardSkillTransform({
sectionName: 'Phenomenological Epoché & Hermeneutic Bracketing',
      ruSectionName: 'Феноменологическое эпохе и герменевтическое эпохе (Bracketing)',
      instructions: [
        'Document researcher prior assumptions, theoretical baggage, and personal biases into an explicit reflexivity log (epoché).',
        'Bracket presuppositions during data interpretation to encounter the phenomenon as lived and described by informants.',
        'Apply the hermeneutic circle: oscillate iteratively between individual verbatim utterances and the overarching existential meaning.',
        'Synthesize findings into invariant core structures (essences) of the lived experience across time, space, body, and relation (lifeworld).',
      ],
      ruInstructions: [
        'Фиксируйте личные предубеждения исследователя, теоретические догмы и ожидания в открытом журнале рефлексивности (эпохе).',
        'Выносите за скобки априорные суждения при чтении нарративов, воспринимая опыт именно так, как его переживал сам информант.',
        'Используйте герменевтический круг: двигайтесь от отдельных высказываний к общему смыслу и возвращайтесь обратно для углубления понимания.',
        'Выделяйте инвариантные экзистенциальные структуры прожитого опыта по категориям жизненного мира: время, пространство, телесность и отношения.',
      ],
      semanticType: 'behavior_directive',
      tags: ['research', 'phenomenology', 'qualitative', 'epoche', 'hermeneutics'],
    }),
  },

  'causal-dag-confounder-identification': {
    id: 'causal-dag-confounder-identification',
    name: 'CausalDagConfounderIdentificationSkill',
    displayName: 'Causal Directed Acyclic Graph (DAG) Modeling',
    categoryId: 'research',
    description: 'Models causal relationships using DAGs, identifying confounding backdoors, colliders, and minimal sufficient adjustment sets.',
    tags: ['research', 'causality', 'dag', 'confounding', 'epidemiology', 'pearl'],
    transform: createStandardSkillTransform({
sectionName: 'Causal DAG & Confounder Identification Architecture',
      ruSectionName: 'Каузальные графы (DAG) и выявление конфаундеров',
      instructions: [
        'Construct a Directed Acyclic Graph (DAG) explicitly mapping causal pathways between Exposure (X), Outcome (Y), and auxiliary covariates.',
        'Apply Pearl\'s d-separation rules to identify open backdoor paths transmitting non-causal spurious associations.',
        'Determine the minimal sufficient adjustment set of confounding variables required to block all confounding bias.',
        'Warn against collider stratification bias: strictly avoid conditioning on variables that are common effects of exposure and outcome.',
      ],
      ruInstructions: [
        'Стройте направленный ациклический граф (DAG), связывающий исследуемое воздействие (X), исход (Y) и сопутствующие факторы.',
        'Применяйте правила d-сепарации Джуды Перла для нахождения открытых обходных путей (backdoor paths), создающих ложную корреляцию.',
        'Определяйте минимально достаточный набор контрольных переменных (adjustment set), исключающий конфаундинг.',
        'Предостерегайте от ловушки коллайдеров: категорически запрещайте контролировать переменные, являющиеся общим следствием воздействия и исхода.',
      ],
      semanticType: 'structural_directive',
      tags: ['research', 'causality', 'dag', 'confounding', 'epidemiology', 'pearl'],
    }),
  },

  'longitudinal-cohort-attrition-audit': {
    id: 'longitudinal-cohort-attrition-audit',
    name: 'LongitudinalCohortAttritionAuditSkill',
    displayName: 'Longitudinal Cohort Attrition & Missingness Audit',
    categoryId: 'research',
    description: 'Audits participant drop-out patterns in longitudinal cohorts, diagnosing MCAR/MAR/MNAR mechanisms and imputation validity.',
    tags: ['research', 'longitudinal', 'cohort', 'missing-data', 'attrition', 'statistics'],
    transform: createStandardSkillTransform({
sectionName: 'Longitudinal Attrition & Missing Data Protocol',
      ruSectionName: 'Аудит выбывания и пропущенных данных в когортных исследованиях',
      instructions: [
        'Diagnose the underlying missing data mechanism: Missing Completely at Random (MCAR), Missing at Random (MAR), or Missing Not at Random (MNAR).',
        'Compare baseline characteristics of participants retained versus lost to follow-up to detect differential attrition bias.',
        'Reject naive complete-case listwise deletion when missingness exceeds 5%; implement Multiple Imputation by Chained Equations (MICE) or Full Information Maximum Likelihood (FIML).',
        'Conduct sensitivity pattern-mixture modeling to assess how violations of the MAR assumption impact study conclusions.',
      ],
      ruInstructions: [
        'Диагностируйте механизм пропусков в данных: абсолютно случайные (MCAR), случайные (MAR) или неслучайные (MNAR).',
        'Сравнивайте исходные характеристики участников, оставшихся в когорте и выбывших, для выявления избирательного отсева.',
        'Отвергайте простое удаление строк с пропусками (listwise deletion) при доле пропусков >5%; применяйте множественную импутацию (MICE) или FIML.',
        'Проводите анализ чувствительности для оценки устойчивости выводов при нарушении гипотезы случайного характера пропусков.',
      ],
      semanticType: 'process_directive',
      tags: ['research', 'longitudinal', 'cohort', 'missing-data', 'attrition', 'statistics'],
    }),
  },

  'reproducible-jupyter-docker-provenance': {
    id: 'reproducible-jupyter-docker-provenance',
    name: 'ReproducibleJupyterDockerProvenanceSkill',
    displayName: 'Computational Reproducibility & Environment Provenance',
    categoryId: 'research',
    description: 'Guarantees 100% bit-for-bit computational reproducibility: locked seeds, Docker containerization, and environment lockfiles.',
    tags: ['research', 'reproducibility', 'docker', 'data-provenance', 'open-science'],
    transform: createStandardSkillTransform({
sectionName: 'Computational Reproducibility Architecture',
      ruSectionName: 'Архитектура воспроизводимости вычислений и контейнеризации',
      instructions: [
        'Set and document deterministic global pseudo-random seeds across all libraries (NumPy, PyTorch, R set.seed).',
        'Pin exact package dependencies with cryptographic checksums using Conda environment.yml or poetry.lock / requirements.txt.',
        'Provide self-contained Dockerfile specs locking OS distribution, CUDA drivers, language runtimes, and external C libraries.',
        'Structure analysis pipelines as idempotent DAG workflows (Makefile, Snakemake, or Nextflow) with raw-to-processed data lineage.',
      ],
      ruInstructions: [
        'Явно задавайте и фиксируйте псевдослучайные сиды (random seeds) для всех используемых библиотек (NumPy, PyTorch, R).',
        'Фиксируйте точные версии пакетов с контрольными суммами зависимостей (poetry.lock, conda environment.yml).',
        'Создавайте воспроизводимый Dockerfile с фиксацией версии ОС, драйверов и компиляторов для запуска в один клик.',
        'Оформляйте пайплайн обработки данных в виде идемпотентного рабочего процесса (Makefile, Snakemake) с прозрачной историей происхождения данных.',
      ],
      semanticType: 'structural_directive',
      tags: ['research', 'reproducibility', 'docker', 'data-provenance', 'open-science'],
    }),
  },

  'systematic-scoping-review-jbi': {
    id: 'systematic-scoping-review-jbi',
    name: 'SystematicScopingReviewJbiSkill',
    displayName: 'JBI Scoping Review Methodology Protocol',
    categoryId: 'research',
    description: 'Conducts scoping reviews following Joanna Briggs Institute (JBI) guidance and PRISMA-ScR reporting checklists.',
    tags: ['research', 'scoping-review', 'jbi', 'prisma-scr', 'evidence-mapping'],
    transform: createStandardSkillTransform({
sectionName: 'JBI Scoping Review Methodology Protocol',
      ruSectionName: 'Методология обзорных систематических исследований по стандартам JBI',
      instructions: [
        'Define review boundaries using the PCC mnemonic: Population, Concept, and Context.',
        'Clarify primary purpose: mapping key concepts, identifying knowledge gaps, clarifying working definitions, or informing future systematic reviews.',
        'Execute a comprehensive, iterative three-step literature search strategy across multi-disciplinary databases and grey literature sources.',
        'Chart data systematically using standardized extraction forms and map findings thematically or diagrammatically aligned to PRISMA-ScR.',
      ],
      ruInstructions: [
        'Формулируйте рамки исследования по мнемонике PCC: популяция (Population), концепция (Concept) и контекст (Context).',
        'Четко определяйте цель: картирование ключевых понятий области, выявление пробелов в доказательной базе или предварительный анализ перед полным мета-анализом.',
        'Реализуйте трехэтапную стратегию поиска литературы по электронным базам данных и источникам серой литературы (grey literature).',
        'Извлекайте данные по стандартизированной форме и представляйте результаты в виде сводных тематических карт по стандарту PRISMA-ScR.',
      ],
      semanticType: 'process_directive',
      tags: ['research', 'scoping-review', 'jbi', 'prisma-scr', 'evidence-mapping'],
    }),
  },

  'quasi-experimental-did-synth-control': {
    id: 'quasi-experimental-did-synth-control',
    name: 'QuasiExperimentalDidSynthControlSkill',
    displayName: 'Quasi-Experimental Difference-in-Differences & Synthetic Controls',
    categoryId: 'research',
    description: 'Evaluates policy interventions without randomization using Difference-in-Differences (DiD) and Synthetic Control Methods.',
    tags: ['research', 'econometrics', 'difference-in-differences', 'synthetic-control', 'causal-inference'],
    transform: createStandardSkillTransform({
sectionName: 'Quasi-Experimental Causal Inference Architecture',
      ruSectionName: 'Квазиэкспериментальные методы (DiD и синтетический контроль)',
      instructions: [
        'Test and substantiate the Parallel Trends Assumption prior to policy intervention; run event-study lead/lag coefficient plots.',
        'Formulate Difference-in-Differences regression: Outcome = beta0 + beta1(Post) + beta2(Treated) + beta3(Post x Treated) + epsilon.',
        'When evaluating a single treated unit, construct a Synthetic Control as a convex combination of donor pool control units.',
        'Execute in-space and in-time placebo placebo falsification tests to prove observed causal treatment effects are not statistical noise.',
      ],
      ruInstructions: [
        'Проверяйте и обосновывайте предпосылку параллельных трендов (Parallel Trends) до момента введения интервенции с помощью графиков динамики коэффициентов.',
        'Специфицируйте базовое регрессионное уравнение DiD с оценкой коэффициента взаимодействия (Post x Treated).',
        'При наличии единственного исследуемого объекта конструируйте синтетическую контрольную группу из пула доноров методами выпуклой оптимизации.',
        'Проводите плацебо-тесты во времени и по контрольным объектам (in-space / in-time placebos) для подтверждения статистической значимости эффекта.',
      ],
      semanticType: 'process_directive',
      tags: ['research', 'econometrics', 'difference-in-differences', 'synthetic-control', 'causal-inference'],
    }),
  },

  'consort-strobe-reporting-guidelines': {
    id: 'consort-strobe-reporting-guidelines',
    name: 'ConsortStrobeReportingGuidelinesSkill',
    displayName: 'EQUATOR Network Reporting Standards (CONSORT / STROBE)',
    categoryId: 'research',
    description: 'Enforces complete reporting transparently aligned with CONSORT (trials) and STROBE (observational studies) checklists.',
    tags: ['research', 'equator-network', 'consort', 'strobe', 'scientific-writing', 'transparency'],
    transform: createStandardSkillTransform({
sectionName: 'EQUATOR Reporting Guidelines Compliance',
      ruSectionName: 'Стандарты научной отчетности EQUATOR (CONSORT / STROBE)',
      instructions: [
        'Select the appropriate EQUATOR Network guideline: CONSORT for randomized trials, STROBE for observational cohorts/case-controls, STARD for diagnostic accuracy.',
        'Verify inclusion of all mandatory checklist items: specific title descriptors, structured abstracts, registration IDs, and sample size rationale.',
        'Require a complete participant flow diagram accounting for all assessed, eligible, randomized, allocated, and analyzed subjects.',
        'Report absolute effect sizes and 95% confidence intervals alongside p-values; prohibit relying exclusively on null-hypothesis p-value thresholds.',
      ],
      ruInstructions: [
        'Выбирайте профильное руководство сети EQUATOR: CONSORT для рандомизированных исследований, STROBE для наблюдательных когорт, STARD для диагностических тестов.',
        'Контролируйте наличие всех обязательных пунктов чек-листа: структурированная аннотация, номер регистрации протокола и обоснование размера выборки.',
        'Требуйте наличия блок-схемы движения участников (Flow Diagram) с точным учетом выбывших на каждом этапе.',
        'Указывайте абсолютные размеры эффекта и 95% доверительные интервалы вместе с p-значениями, не ограничиваясь одной лишь констатацией значимости.',
      ],
      semanticType: 'compliance_directive',
      tags: ['research', 'equator-network', 'consort', 'strobe', 'scientific-writing', 'transparency'],
    }),
  },

  'academic-rebuttal-letter-to-reviewers': {
    id: 'academic-rebuttal-letter-to-reviewers',
    name: 'AcademicRebuttalLetterToReviewersSkill',
    displayName: 'Peer Review Point-by-Point Author Rebuttal Letter',
    categoryId: 'research',
    description: 'Crafts persuasive, respectful, and transparent point-by-point author responses to peer reviewers and journal editors.',
    tags: ['research', 'peer-review', 'rebuttal-letter', 'academic-publishing', 'response-to-reviewers'],
    transform: createStandardSkillTransform({
sectionName: 'Peer Review Author Rebuttal Architecture',
      ruSectionName: 'Письмо-ответ авторов на замечания рецензентов (Rebuttal Letter)',
      instructions: [
        'Open with an executive overview: thank reviewers sincerely for constructive insights and summarize major manuscript enhancements.',
        'Format responses systematically: 1) Verbatim Reviewer Comment, 2) Direct Author Response, 3) Exact Quoted Text Changes with page/line numbers.',
        'Maintain an unfailingly polite, scholarly tone even when defending against inaccurate reviewer critiques.',
        'When disagreeing with a reviewer recommendation, provide empirical citations and robust data explanations rather than emotional refutations.',
      ],
      ruInstructions: [
        'Начинайте с вводной части: поблагодарите рецензентов за ценные замечания и кратко перечислите главные изменения в рукописи.',
        'Оформляйте ответ строго по трехчастной структуре: 1) Цитата замечания рецензента, 2) Развернутый ответ авторов, 3) Цитата измененного фрагмента текста с номерами страниц.',
        'Сохраняйте академическую вежливость и уважительный тон, даже отвечая на ошибочные или резкие замечания.',
        'При несогласии с предложением рецензента приводите убедительную научную аргументацию и ссылки на литературу вместо эмоциональных возражений.',
      ],
      semanticType: 'structural_directive',
      tags: ['research', 'peer-review', 'rebuttal-letter', 'academic-publishing', 'response-to-reviewers'],
    }),
  },
  "prisma-systematic-review-flowchart": {
    id: "prisma-systematic-review-flowchart",
    name: "PrismaSystematicReviewFlowchartSkill",
    displayName: "PRISMA 2020 Systematic Review & Meta-Analysis Protocol",
    categoryId: "research",
    description: "Structures literature searching, deduplication, screening, eligibility, and inclusion following the PRISMA 2020 27-item checklist.",
    tags: ["research","prisma","systematic-review","meta-analysis","literature-search"],
    transform: createStandardSkillTransform({
      sectionName: "PRISMA Systematic Review Protocol",
      ruSectionName: "Протокол систематического обзора по стандарту PRISMA 2020",
      instructions: [
        "Document explicit database search strings, date boundaries, and language filters.",
        "Record study numbers across Identification, Screening, Eligibility, and Final Inclusion stages.",
        "Assess study risk of bias and heterogeneity across extracted cohorts."
],
      ruInstructions: [
        "Зафиксируйте поисковые запросы по базам данных, временные рамки и фильтры.",
        "Отразите количество работ на этапах идентификации, скрининга, проверки критериев и включения.",
        "Оцените риск систематической ошибки (bias) и гетерогенность включенных исследований."
],
      semanticType: "process_directive",
      tags: ["research","prisma","systematic-review","meta-analysis","literature-search"],
    }),
  },

  "ab-test-sample-size-power-analysis": {
    id: "ab-test-sample-size-power-analysis",
    name: "AbTestSampleSizePowerAnalysisSkill",
    displayName: "Statistical Power Analysis & Sample Size Determination",
    categoryId: "research",
    description: "Calculates minimum required sample size based on statistical power (1 - beta = 0.80), significance (alpha = 0.05), and Minimum Detectable Effect (MDE).",
    tags: ["research","statistics","ab-testing","power-analysis","sample-size"],
    transform: createStandardSkillTransform({
      sectionName: "Statistical Power & Sample Size Protocol",
      ruSectionName: "Расчет статистической мощности и необходимого размера выборки",
      instructions: [
        "Define baseline conversion rate and specify Minimum Detectable Effect (MDE) in relative %.",
        "Set alpha = 0.05 (two-tailed) and statistical power (1 - beta) = 0.80.",
        "Calculate required sample size per variant and estimate required runtime in days to avoid peeking bias."
],
      ruInstructions: [
        "Определите базовую конверсию и минимальный обнаруживаемый эффект (MDE).",
        "Задайте уровень значимости alpha = 0.05 и мощность теста (1 - beta) = 0.80.",
        "Рассчитайте объем выборки на каждую группу и длительность теста для исключения ошибки подглядывания."
],
      semanticType: 'protocol',
      tags: ["research","statistics","ab-testing","power-analysis","sample-size"],
    }),
  },

  "qualitative-thematic-analysis-braun-clarke": {
    id: "qualitative-thematic-analysis-braun-clarke",
    name: "QualitativeThematicAnalysisBraunClarkeSkill",
    displayName: "Braun & Clarke 6-Phase Thematic Analysis",
    categoryId: "research",
    description: "Executes qualitative transcript coding: Familiarization, Generating Initial Codes, Searching for Themes, Reviewing Themes, Defining Themes, and Reporting.",
    tags: ["research","qualitative","thematic-analysis","coding","grounded-theory"],
    transform: createStandardSkillTransform({
      sectionName: "Braun & Clarke Thematic Analysis",
      ruSectionName: "Шестиэтапный тематический анализ по Браун и Кларк",
      instructions: [
        "Familiarize with interview transcripts and generate granular inductive line-by-line codes.",
        "Cluster open codes into candidate overarching themes and sub-themes.",
        "Produce a thematic map supported by verbatim interview excerpts."
],
      ruInstructions: [
        "Изучите транскрипты интервью и проведите построчное индуктивное кодирование.",
        "Сгруппируйте первичные коды в смысловые темы и подтемы.",
        "Постройте тематическую карту с цитатами респондентов."
],
      semanticType: "process_directive",
      tags: ["research","qualitative","thematic-analysis","coding","grounded-theory"],
    }),
  },

  "causal-inference-diff-in-diff-synthetic-control": {
    id: "causal-inference-diff-in-diff-synthetic-control",
    name: "CausalInferenceDiffInDiffSyntheticControlSkill",
    displayName: "Causal Inference (Difference-in-Differences & Synthetic Controls)",
    categoryId: "research",
    description: "Evaluates policy interventions and product feature rollouts using Difference-in-Differences (DiD) and Synthetic Control econometric methods.",
    tags: ["research","econometrics","causal-inference","diff-in-diff","synthetic-control"],
    transform: createStandardSkillTransform({
      sectionName: "Causal Inference & Econometric Protocol",
      ruSectionName: "Причинно-следственный вывод (Diff-in-Diff и синтетический контроль)",
      instructions: [
        "Test parallel trends assumption in pre-treatment baseline periods.",
        "Estimate DiD interaction coefficient: (Y_treatment_post - Y_treatment_pre) - (Y_control_post - Y_control_pre).",
        "Construct a synthetic control unit via weighted combination of untreated units when control groups are non-parallel."
],
      ruInstructions: [
        "Проверьте гипотезу параллельных трендов в доинтервенционный период.",
        "Рассчитайте коэффициент разности разностей (Difference-in-Differences).",
        "Сформируйте синтетическую контрольную группу на основе взвешенной комбинации наблюдений."
],
      semanticType: 'protocol',
      tags: ["research","econometrics","causal-inference","diff-in-diff","synthetic-control"],
    }),
  },

  "double-blind-rct-protocol-generator": {
    id: "double-blind-rct-protocol-generator",
    name: "DoubleBlindRctProtocolGeneratorSkill",
    displayName: "Randomized Controlled Trial (RCT) Clinical Protocol",
    categoryId: "research",
    description: "Drafts gold-standard double-blind RCT protocols covering block randomization, sham/placebo controls, and primary endpoint definitions.",
    tags: ["research","rct","clinical-trials","experimental-design","placebo-control"],
    transform: createStandardSkillTransform({
      sectionName: "Double-Blind RCT Protocol Specification",
      ruSectionName: "Спецификация протокола двойного слепого рандомизированного исследования",
      instructions: [
        "Define clear Primary and Secondary Endpoints with explicit clinical measurement timeframes.",
        "Specify computer-generated block stratification randomization to balance covariates.",
        "Describe unblinding safety emergency criteria and Independent Data Monitoring Committee (IDMC) charters."
],
      ruInstructions: [
        "Определите первичные и вторичные конечные точки с точными сроками измерения.",
        "Опишите стратифицированную блочную рандомизацию для выравнивания ковариат.",
        "Зафиксируйте правила экстренного раскрытия слепоты и регламент работы комитета по мониторингу данных."
],
      semanticType: 'protocol',
      tags: ["research","rct","clinical-trials","experimental-design","placebo-control"],
    }),
  },

  "delphi-expert-consensus-panel-method": {
    id: "delphi-expert-consensus-panel-method",
    name: "DelphiExpertConsensusPanelMethodSkill",
    displayName: "Modified Delphi Expert Consensus Method",
    categoryId: "research",
    description: "Facilitates multi-round anonymous expert consensus polling with inter-round statistical feedback and predefined agreement thresholds.",
    tags: ["research","delphi-method","expert-consensus","panel-survey","forecasting"],
    transform: createStandardSkillTransform({
      sectionName: "Delphi Consensus Protocol",
      ruSectionName: "Протокол экспертного консенсуса по методу Дельфи",
      instructions: [
        "Round 1: Open-ended qualitative issue identification.",
        "Round 2-3: Quantitative Likert ratings with statistical summary feedback (median and IQR).",
        "Define consensus threshold (e.g. >=80% agreement in ratings 7-9 on a 9-point scale)."
],
      ruInstructions: [
        "Раунд 1: Качественный сбор экспертных мнений в свободной форме.",
        "Раунды 2-3: Количественная оценка по шкале Лайкерта с показом распределения (медиана и квартили).",
        "Установите порог консенсуса (например, >=80% согласия по ключевым утверждениям)."
],
      semanticType: "process_directive",
      tags: ["research","delphi-method","expert-consensus","panel-survey","forecasting"],
    }),
  },

  "multivariate-regression-multicollinearity-diagnostics": {
    id: "multivariate-regression-multicollinearity-diagnostics",
    name: "MultivariateRegressionMulticollinearityDiagnosticsSkill",
    displayName: "Multivariate Regression & Collinearity Diagnostics (VIF)",
    categoryId: "research",
    description: "Validates OLS/GLM regression assumptions: Variance Inflation Factor (VIF < 5), heteroscedasticity (Breusch-Pagan), and normality of residuals.",
    tags: ["research","statistics","regression","vif","multicollinearity","ols"],
    transform: createStandardSkillTransform({
      sectionName: "Regression Diagnostics Protocol",
      ruSectionName: "Диагностика мультиколлинеарности и предпосылок регрессии (VIF)",
      instructions: [
        "Compute Variance Inflation Factors (VIF); flag variables with VIF > 5 for dimensionality reduction.",
        "Test for heteroscedasticity and apply Huber-White robust standard errors if detected.",
        "Inspect Cook’s distance to identify influential outlier observations."
],
      ruInstructions: [
        "Рассчитайте фактор инфляции дисперсии (VIF); исключите переменные с VIF > 5.",
        "Проверьте гетероскедастичность и примените робастные стандартные ошибки Хубера-Уайта.",
        "Проанализируйте расстояние Кука для выявления искажающих выбросов."
],
      semanticType: 'protocol',
      tags: ["research","statistics","regression","vif","multicollinearity","ols"],
    }),
  },

  "factor-analysis-cronbach-alpha-validation": {
    id: "factor-analysis-cronbach-alpha-validation",
    name: "FactorAnalysisCronbachAlphaValidationSkill",
    displayName: "Exploratory Factor Analysis & Cronbach’s Alpha",
    categoryId: "research",
    description: "Evaluates psychometric survey validity: Kaiser-Meyer-Olkin (KMO > 0.8), Bartlett’s sphericity, eigenvalue scree plots, and Cronbach’s alpha internal consistency.",
    tags: ["research","psychometrics","factor-analysis","cronbachs-alpha","survey-design"],
    transform: createStandardSkillTransform({
      sectionName: "Psychometric & Factor Analysis Protocol",
      ruSectionName: "Факторный анализ и оценка надежности (Альфа Кронбаха)",
      instructions: [
        "Verify sampling adequacy with KMO test (> 0.70) and Bartlett’s test of sphericity (p < 0.05).",
        "Perform Exploratory Factor Analysis (EFA) with Promax or Varimax rotation.",
        "Calculate Cronbach’s alpha internal consistency for each extracted factor (target alpha >= 0.80)."
],
      ruInstructions: [
        "Проверьте применимость выборки по тесту KMO (> 0.70) и сферичности Бартлетта.",
        "Проведите эксплораторный факторный анализ с варимакс- или промакс-вращением.",
        "Рассчитайте коэффициент альфа Кронбаха для каждой шкалы (целевое значение >= 0.80)."
],
      semanticType: 'protocol',
      tags: ["research","psychometrics","factor-analysis","cronbachs-alpha","survey-design"],
    }),
  },

  "propensity-score-matching-observational-studies": {
    id: "propensity-score-matching-observational-studies",
    name: "PropensityScoreMatchingObservationalStudiesSkill",
    displayName: "Propensity Score Matching (PSM) for Observational Data",
    categoryId: "research",
    description: "Mitigates confounding selection bias in observational cohorts via logistic propensity modeling and nearest-neighbor caliper matching.",
    tags: ["research","statistics","propensity-score","matching","observational-data"],
    transform: createStandardSkillTransform({
      sectionName: "Propensity Score Matching Protocol",
      ruSectionName: "Протокол псевдорандомизации (Propensity Score Matching)",
      instructions: [
        "Fit logistic regression estimating treatment probability given baseline covariates.",
        "Perform 1:1 nearest-neighbor matching within caliper width (e.g. 0.2 * SD of logit score).",
        "Check post-match covariate balance using standardized mean differences (SMD < 0.10)."
],
      ruInstructions: [
        "Постройте логистическую регрессию для расчета вероятности назначения лечения по ковариатам.",
        "Проведите сопоставление 1:1 ближайшего соседа в пределах заданного калипера.",
        "Проверьте баланс групп после сопоставления по стандартизованной разности средних (SMD < 0.10)."
],
      semanticType: 'protocol',
      tags: ["research","statistics","propensity-score","matching","observational-data"],
    }),
  },

  "survival-analysis-kaplan-meier-cox-proportional": {
    id: "survival-analysis-kaplan-meier-cox-proportional",
    name: "SurvivalAnalysisKaplanMeierCoxProportionalSkill",
    displayName: "Survival Analysis (Kaplan-Meier & Cox Proportional Hazards)",
    categoryId: "research",
    description: "Models time-to-event outcomes, right-censored data, log-rank curve comparisons, and Cox proportional hazards regression ratios.",
    tags: ["research","survival-analysis","kaplan-meier","cox-hazards","time-to-event"],
    transform: createStandardSkillTransform({
      sectionName: "Survival Analysis Protocol",
      ruSectionName: "Анализ выживаемости (Каплан-Мейер и регрессия Кокса)",
      instructions: [
        "Plot Kaplan-Meier survival curves and perform Log-Rank tests between cohorts.",
        "Fit Cox Proportional Hazards model and test proportional hazards assumption (Schoenfeld residuals).",
        "Report Hazard Ratios (HR) with 95% confidence intervals and p-values."
],
      ruInstructions: [
        "Постройте кривые дожития Каплана-Мейера и сравните группы лог-ранговым тестом.",
        "Постройте модель Кокса и проверьте гипотезу пропорциональности рисков (остатки Шенфельда).",
        "Приведите отношения рисков (Hazard Ratios) с 95% доверительными интервалами."
],
      semanticType: 'protocol',
      tags: ["research","survival-analysis","kaplan-meier","cox-hazards","time-to-event"],
    }),
  },

  "academic-grant-proposal-aims-significance-nih": {
    id: "academic-grant-proposal-aims-significance-nih",
    name: "AcademicGrantProposalAimsSignificanceNihSkill",
    displayName: "NIH R01 Grant Proposal Structure (Specific Aims & Significance)",
    categoryId: "research",
    description: "Drafts competitive scientific grant proposals matching NIH scoring criteria: Significance, Innovation, Approach, and Specific Aims.",
    tags: ["research","grant-writing","nih-r01","funding-proposals","academic"],
    transform: createStandardSkillTransform({
      sectionName: "NIH Grant Specific Aims Architecture",
      ruSectionName: "Структура грантовой заявки (NIH Specific Aims & Significance)",
      instructions: [
        "Draft a 1-page Specific Aims document with hook, critical barrier, overarching hypothesis, and 2-3 independent aims.",
        "Articulate scientific Significance and Paradigm-Shifting Innovation explicitly.",
        "Include preliminary data proof points and potential pitfalls with alternative contingency paths."
],
      ruInstructions: [
        "Составьте 1-страничный документ Specific Aims с гипотезой и 2-3 независимыми задачами.",
        "Опишите научную новизну, значимость для отрасли и сдвиг парадигмы.",
        "Укажите предварительные данные и план действий при возникновении методологических рисков."
],
      semanticType: 'protocol',
      tags: ["research","grant-writing","nih-r01","funding-proposals","academic"],
    }),
  },

  "bayesian-ab-testing-posterior-loss-function": {
    id: "bayesian-ab-testing-posterior-loss-function",
    name: "BayesianAbTestingPosteriorLossFunctionSkill",
    displayName: "Bayesian A/B Testing & Expected Loss Modeling",
    categoryId: "research",
    description: "Calculates Beta-Binomial posterior distributions, probability of being best, and expected loss to enable continuous test decision-making.",
    tags: ["research","bayesian","ab-testing","expected-loss","statistics"],
    transform: createStandardSkillTransform({
      sectionName: "Bayesian A/B Testing Protocol",
      ruSectionName: "Байесовское A/B тестирование и моделирование ожидаемых потерь",
      instructions: [
        "Set prior distributions (Beta conjugate prior for binomial conversion metrics).",
        "Update posterior distributions with observed successes and trials: Beta(alpha + wins, beta + losses).",
        "Compute Probability to be Best and Expected Loss; declare winner when Expected Loss is below threshold."
],
      ruInstructions: [
        "Задайте априорные распределения (сопряженное бета-распределение).",
        "Обновите апостериорные распределения на основе фактических конверсий: Beta(alpha + k, beta + n - k).",
        "Рассчитайте вероятность превосходства и ожидаемые потери (Expected Loss) для принятия решения."
],
      semanticType: 'protocol',
      tags: ["research","bayesian","ab-testing","expected-loss","statistics"],
    }),
  },

  "user-interview-open-ended-funneling-guide": {
    id: "user-interview-open-ended-funneling-guide",
    name: "UserInterviewOpenEndedFunnelingGuideSkill",
    displayName: "User Research Interview Guide & TED Funneling",
    categoryId: "research",
    description: "Constructs unbiased qualitative interview scripts using TED questions (Tell me, Explain to me, Describe to me) without leading prompts.",
    tags: ["research","user-research","interviews","ux-research","funneling"],
    transform: createStandardSkillTransform({
      sectionName: "Qualitative Interview Script Protocol",
      ruSectionName: "Гайд глубинного интервью и методика вопросов TED",
      instructions: [
        "Eliminate leading, binary, or future-predictive questions (\"Would you buy X?\").",
        "Deploy TED format: \"Tell me about the last time you...\", \"Describe what happened when...\", \"Explain why...\".",
        "Follow the 5-Whys root cause probing sequence to uncover unarticulated emotional friction."
],
      ruInstructions: [
        "Исключите наводящие и гипотетические вопросы (\"Купили бы вы...?\").",
        "Используйте формулу TED: \"Расскажите о последнем случае...\", \"Опишите, как вы...\", \"Объясните, почему...\".",
        "Примените технику 5 почему для выявления истинных скрытых мотивов."
],
      semanticType: "process_directive",
      tags: ["research","user-research","interviews","ux-research","funneling"],
    }),
  },

  "mixed-methods-convergent-triangulation-design": {
    id: "mixed-methods-convergent-triangulation-design",
    name: "MixedMethodsConvergentTriangulationDesignSkill",
    displayName: "Mixed Methods Convergent Parallel Triangulation",
    categoryId: "research",
    description: "Integrates quantitative survey datasets and qualitative contextual interviews to cross-validate convergent findings.",
    tags: ["research","mixed-methods","triangulation","creswell","data-synthesis"],
    transform: createStandardSkillTransform({
      sectionName: "Mixed Methods Triangulation Protocol",
      ruSectionName: "Смешанные методы и параллельная триангуляция данных (Mixed Methods)",
      instructions: [
        "Collect quantitative and qualitative datasets concurrently.",
        "Map quantitative statistical distributions against qualitative user quotes in a joint display matrix.",
        "Investigate and resolve discordant or divergent findings with secondary probing."
],
      ruInstructions: [
        "Соберите количественные метрики и качественные интервью параллельно.",
        "Сопоставьте статистические тренды с цитатами респондентов в сводной матрице.",
        "Детально разберите расхождения и парадоксы между цифрами и словами пользователей."
],
      semanticType: 'protocol',
      tags: ["research","mixed-methods","triangulation","creswell","data-synthesis"],
    }),
  },

  "card-sorting-information-architecture-analysis": {
    id: "card-sorting-information-architecture-analysis",
    name: "CardSortingInformationArchitectureAnalysisSkill",
    displayName: "Open & Closed Card Sorting Information Architecture Analysis",
    categoryId: "research",
    description: "Analyzes similarity matrices, dendrogram clustering, and category naming from user card sorting studies to design navigation taxonomies.",
    tags: ["research","card-sorting","information-architecture","ux-research","navigation"],
    transform: createStandardSkillTransform({
      sectionName: "Card Sorting & Taxonomy Protocol",
      ruSectionName: "Анализ карточной сортировки и информационной архитектуры",
      instructions: [
        "Calculate item co-occurrence similarity matrix from open/closed card sorting sessions.",
        "Generate hierarchical cluster dendrograms identifying natural conceptual clusters.",
        "Derive intuitive navigation menu labeling matching the mental models of >=80% of participants."
],
      ruInstructions: [
        "Постройте матрицу парной совместной встречаемости элементов.",
        "Проанализируйте дендрограмму кластеризации для выделения естественных категорий.",
        "Сформируйте структуру меню и навигационные метки, понятные 80%+ участников."
],
      semanticType: 'protocol',
      tags: ["research","card-sorting","information-architecture","ux-research","navigation"],
    }),
  },

  "synthetic-persona-validation-sampling": {
    id: "synthetic-persona-validation-sampling",
    name: "SyntheticPersonaValidationSamplingSkill",
    displayName: "Synthetic Persona Validation & Grounded Micro-Surveys",
    categoryId: "research",
    description: "Constructs research-grounded synthetic persona cohorts conditioned on real demographic and behavioral distributions for rapid hypothesis testing.",
    tags: ["research","synthetic-personas","validation","sampling","ai-research"],
    transform: createStandardSkillTransform({
      sectionName: "Synthetic Persona Sampling Protocol",
      ruSectionName: "Валидация синтетических персон и микро-опросы",
      instructions: [
        "Ground synthetic persona attributes in verified demographic distributions.",
        "Run simulated micro-surveys probing cognitive friction and decision triggers.",
        "Audit synthetic findings against empirical baseline samples to prevent model bias."
],
      ruInstructions: [
        "Опишите профили синтетических персон на основе проверенных рыночных данных.",
        "Проведите симуляцию опроса с оценкой барьеров и триггеров выбора.",
        "Сверьте результаты симуляции с контрольной эмпирической выборкой."
],
      semanticType: "process_directive",
      tags: ["research","synthetic-personas","validation","sampling","ai-research"],
    }),
  },

  "scientific-manuscript-peer-review-critique": {
    id: "scientific-manuscript-peer-review-critique",
    name: "ScientificManuscriptPeerReviewCritiqueSkill",
    displayName: "Scientific Peer Review & Methodological Critique",
    categoryId: "research",
    description: "Conducts thorough peer review audits of scientific papers: methodology validity, statistical appropriateness, claim overreach, and reproducibility.",
    tags: ["research","peer-review","academic","methodology","reproducibility"],
    transform: createStandardSkillTransform({
      sectionName: "Scientific Peer Review Protocol",
      ruSectionName: "Научное рецензирование (Peer Review) и методологический аудит",
      instructions: [
        "Evaluate clarity of hypothesis and appropriateness of experimental controls.",
        "Audit statistical tests for p-hacking, multiple testing corrections (Bonferroni/FDR), and small sample bias.",
        "Distinguish major revisions (threats to validity) from minor presentation improvements."
],
      ruInstructions: [
        "Оцените четкость гипотезы и адекватность контрольных групп.",
        "Проверьте статистику на p-hacking, множественные сравнения и искажения малых выборок.",
        "Разделите замечания на критические (угрозы валидности) и косметические."
],
      semanticType: 'protocol',
      tags: ["research","peer-review","academic","methodology","reproducibility"],
    }),
  },

  "longitudinal-panel-attrition-weighting": {
    id: "longitudinal-panel-attrition-weighting",
    name: "LongitudinalPanelAttritionWeightingSkill",
    displayName: "Longitudinal Study Panel Attrition & Inverse Probability Weighting",
    categoryId: "research",
    description: "Diagnoses non-random participant drop-out in longitudinal multi-wave studies and applies Inverse Probability Weighting (IPW).",
    tags: ["research","longitudinal","attrition-bias","ipw","panel-studies"],
    transform: createStandardSkillTransform({
      sectionName: "Longitudinal Attrition & Weighting Protocol",
      ruSectionName: "Анализ оттока в лонгитюдных исследованиях и взвешивание IPW",
      instructions: [
        "Compare wave-1 characteristics between retained and dropped participants to detect attrition bias.",
        "Fit logistic regression predicting probability of response retention across waves.",
        "Apply Inverse Probability Weights to restore representative sample balance."
],
      ruInstructions: [
        "Сравните характеристики оставшихся и выбывших участников для выявления смещения.",
        "Постройте модель вероятности удержания участника в последующих волнах.",
        "Примените веса обратной вероятности (IPW) для восстановления репрезентативности."
],
      semanticType: 'protocol',
      tags: ["research","longitudinal","attrition-bias","ipw","panel-studies"],
    }),
  },

  "eye-tracking-gaze-fixation-heatmap-analytics": {
    id: "eye-tracking-gaze-fixation-heatmap-analytics",
    name: "EyeTrackingGazeFixationHeatmapAnalyticsSkill",
    displayName: "Eye-Tracking Gaze Fixation & Area of Interest (AOI) Analytics",
    categoryId: "research",
    description: "Analyzes visual attention: Time to First Fixation (TTFF), Total Fixation Duration, and scanpath transitions across UI Areas of Interest.",
    tags: ["research","eye-tracking","aoi","gaze-fixation","visual-attention"],
    transform: createStandardSkillTransform({
      sectionName: "Eye-Tracking & AOI Analytics Protocol",
      ruSectionName: "Анализ фиксации взгляда и зон внимания (Eye-Tracking AOI)",
      instructions: [
        "Define visual Areas of Interest (AOIs) around primary value proposition, hero visuals, and CTA elements.",
        "Quantify Time to First Fixation (TTFF) and Total Dwell Time per AOI.",
        "Map gaze scanpaths to eliminate banner blindness and visual distraction traps."
],
      ruInstructions: [
        "Выделите зоны интереса (AOI) вокруг ключевого оффера, графики и кнопки действия (CTA).",
        "Измерьте время до первой фиксации (TTFF) и суммарную длительность взгляда по зонам.",
        "Постройте путь взгляда (scanpath) для устранения баннерной слепоты и отвлекающих пятен."
],
      semanticType: 'protocol',
      tags: ["research","eye-tracking","aoi","gaze-fixation","visual-attention"],
    }),
  },

  "open-science-osf-preregistration-specification": {
    id: "open-science-osf-preregistration-specification",
    name: "OpenScienceOsfPreregistrationSpecificationSkill",
    displayName: "Open Science Framework (OSF) Preregistration Specification",
    categoryId: "research",
    description: "Drafts time-stamped study preregistrations locking hypotheses, sample sizes, exclusion criteria, and planned analyses prior to data collection.",
    tags: ["research","preregistration","open-science","osf","reproducibility"],
    transform: createStandardSkillTransform({
      sectionName: "OSF Study Preregistration Protocol",
      ruSectionName: "Спецификация пререгистрации исследования (Open Science Framework)",
      instructions: [
        "State directional hypotheses and operationalized dependent/independent variables explicitly.",
        "Specify exact data exclusion rules, outlier truncation criteria, and missing data imputation methods.",
        "Lock in primary statistical analysis scripts to eliminate post-hoc exploratory bias (HARKing)."
],
      ruInstructions: [
        "Зафиксируйте гипотезы и операционализированные переменные до сбора данных.",
        "Опишите правила отсева выбросов и методы заполнения пропусков.",
        "Зафиксируйте план статистического анализа для исключения подгонки гипотез под результаты (HARKing)."
],
      semanticType: "process_directive",
      tags: ["research","preregistration","open-science","osf","reproducibility"],
    }),
  },
  "research-systematic-literature-review-prisma-workflow": {
    id: "research-systematic-literature-review-prisma-workflow",
    name: "SystematicLiteratureReviewPRISMAWorkflowSkill",
    displayName: "Systematic Literature Review PRISMA Workflow",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Systematic Literature Review PRISMA Workflow.",
    tags: ["research","systematic","literature","review"],
    transform: createStandardSkillTransform({
      sectionName: "PRISMA Literature Review Architecture",
      ruSectionName: "Стандарты и практические требования: Systematic Literature Review PRISMA Workflow",
      instructions: [
        "Apply core domain tenets and industry best practices for Systematic Literature Review PRISMA Workflow.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Systematic Literature Review PRISMA Workflow.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","systematic","literature","review"],
    }),
  },

  "research-empirical-grounded-theory-qualitative-coding": {
    id: "research-empirical-grounded-theory-qualitative-coding",
    name: "EmpiricalGroundedTheoryQualitativeCodingSkill",
    displayName: "Empirical Grounded Theory Qualitative Coding",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Empirical Grounded Theory Qualitative Coding.",
    tags: ["research","empirical","grounded","theory"],
    transform: createStandardSkillTransform({
      sectionName: "Grounded Theory Qualitative Protocol",
      ruSectionName: "Стандарты и практические требования: Empirical Grounded Theory Qualitative Coding",
      instructions: [
        "Apply core domain tenets and industry best practices for Empirical Grounded Theory Qualitative Coding.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Empirical Grounded Theory Qualitative Coding.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","empirical","grounded","theory"],
    }),
  },

  "research-double-blind-randomized-controlled-trial-rct-design": {
    id: "research-double-blind-randomized-controlled-trial-rct-design",
    name: "DoubleBlindRandomizedControlledTrialRCTDesignSkill",
    displayName: "Double-Blind Randomized Controlled Trial (RCT) Design",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Double-Blind Randomized Controlled Trial (RCT) Design.",
    tags: ["research","double","blind","randomized"],
    transform: createStandardSkillTransform({
      sectionName: "RCT Experimental Design Standards",
      ruSectionName: "Стандарты и практические требования: Double-Blind Randomized Controlled Trial (RCT) Design",
      instructions: [
        "Apply core domain tenets and industry best practices for Double-Blind Randomized Controlled Trial (RCT) Design.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Double-Blind Randomized Controlled Trial (RCT) Design.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","double","blind","randomized"],
    }),
  },

  "research-bibliometric-citation-co-occurrence-network-mapping": {
    id: "research-bibliometric-citation-co-occurrence-network-mapping",
    name: "BibliometricCitationCoOccurrenceNetworkMappingSkill",
    displayName: "Bibliometric Citation Co-Occurrence Network Mapping",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Bibliometric Citation Co-Occurrence Network Mapping.",
    tags: ["research","bibliometric","citation","co"],
    transform: createStandardSkillTransform({
      sectionName: "Bibliometric Network Mapping Protocol",
      ruSectionName: "Стандарты и практические требования: Bibliometric Citation Co-Occurrence Network Mapping",
      instructions: [
        "Apply core domain tenets and industry best practices for Bibliometric Citation Co-Occurrence Network Mapping.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Bibliometric Citation Co-Occurrence Network Mapping.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","bibliometric","citation","co"],
    }),
  },

  "research-likert-scale-survey-reliability-cronbach-alpha": {
    id: "research-likert-scale-survey-reliability-cronbach-alpha",
    name: "LikertScaleSurveyReliabilityCronbachAlphaSkill",
    displayName: "Likert Scale Survey Reliability & Cronbach Alpha",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Likert Scale Survey Reliability & Cronbach Alpha.",
    tags: ["research","likert","scale","survey"],
    transform: createStandardSkillTransform({
      sectionName: "Survey Psychometrics & Alpha Standards",
      ruSectionName: "Стандарты и практические требования: Likert Scale Survey Reliability & Cronbach Alpha",
      instructions: [
        "Apply core domain tenets and industry best practices for Likert Scale Survey Reliability & Cronbach Alpha.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Likert Scale Survey Reliability & Cronbach Alpha.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","likert","scale","survey"],
    }),
  },

  "research-statistical-power-calculation-g-power-sample-sizing": {
    id: "research-statistical-power-calculation-g-power-sample-sizing",
    name: "StatisticalPowerCalculationGPowerSampleSizingSkill",
    displayName: "Statistical Power Calculation (G*Power Sample Sizing)",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Statistical Power Calculation (G*Power Sample Sizing).",
    tags: ["research","statistical","power","calculation"],
    transform: createStandardSkillTransform({
      sectionName: "Statistical Power Sample Sizing Protocol",
      ruSectionName: "Стандарты и практические требования: Statistical Power Calculation (G*Power Sample Sizing)",
      instructions: [
        "Apply core domain tenets and industry best practices for Statistical Power Calculation (G*Power Sample Sizing).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Statistical Power Calculation (G*Power Sample Sizing).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","statistical","power","calculation"],
    }),
  },

  "research-meta-analysis-forest-plot-effect-size-estimation": {
    id: "research-meta-analysis-forest-plot-effect-size-estimation",
    name: "MetaAnalysisForestPlotEffectSizeEstimationSkill",
    displayName: "Meta-Analysis Forest Plot Effect Size Estimation",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Meta-Analysis Forest Plot Effect Size Estimation.",
    tags: ["research","meta","analysis","forest"],
    transform: createStandardSkillTransform({
      sectionName: "Meta-Analysis Forest Plot Standards",
      ruSectionName: "Стандарты и практические требования: Meta-Analysis Forest Plot Effect Size Estimation",
      instructions: [
        "Apply core domain tenets and industry best practices for Meta-Analysis Forest Plot Effect Size Estimation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Meta-Analysis Forest Plot Effect Size Estimation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","meta","analysis","forest"],
    }),
  },

  "research-qualitative-thematic-analysis-braun-clarke-6-phase": {
    id: "research-qualitative-thematic-analysis-braun-clarke-6-phase",
    name: "QualitativeThematicAnalysisBraunClarke6PhaseSkill",
    displayName: "Qualitative Thematic Analysis Braun-Clarke 6-Phase",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Qualitative Thematic Analysis Braun-Clarke 6-Phase.",
    tags: ["research","qualitative","thematic","analysis"],
    transform: createStandardSkillTransform({
      sectionName: "Thematic Analysis 6-Phase Framework",
      ruSectionName: "Стандарты и практические требования: Qualitative Thematic Analysis Braun-Clarke 6-Phase",
      instructions: [
        "Apply core domain tenets and industry best practices for Qualitative Thematic Analysis Braun-Clarke 6-Phase.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Qualitative Thematic Analysis Braun-Clarke 6-Phase.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","qualitative","thematic","analysis"],
    }),
  },

  "research-institutional-review-board-irb-human-subject-ethics": {
    id: "research-institutional-review-board-irb-human-subject-ethics",
    name: "InstitutionalReviewBoardIRBHumanSubjectEthicsSkill",
    displayName: "Institutional Review Board (IRB) Human Subject Ethics",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Institutional Review Board (IRB) Human Subject Ethics.",
    tags: ["research","institutional","review","board"],
    transform: createStandardSkillTransform({
      sectionName: "IRB Human Subjects Ethics Protocol",
      ruSectionName: "Стандарты и практические требования: Institutional Review Board (IRB) Human Subject Ethics",
      instructions: [
        "Apply core domain tenets and industry best practices for Institutional Review Board (IRB) Human Subject Ethics.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Institutional Review Board (IRB) Human Subject Ethics.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","institutional","review","board"],
    }),
  },

  "research-ethnographic-participant-observation-field-notes": {
    id: "research-ethnographic-participant-observation-field-notes",
    name: "EthnographicParticipantObservationFieldNotesSkill",
    displayName: "Ethnographic Participant Observation Field Notes",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Ethnographic Participant Observation Field Notes.",
    tags: ["research","ethnographic","participant","observation"],
    transform: createStandardSkillTransform({
      sectionName: "Ethnographic Field Notes Standards",
      ruSectionName: "Стандарты и практические требования: Ethnographic Participant Observation Field Notes",
      instructions: [
        "Apply core domain tenets and industry best practices for Ethnographic Participant Observation Field Notes.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Ethnographic Participant Observation Field Notes.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","ethnographic","participant","observation"],
    }),
  },

  "research-bayesian-meta-regression-model-synthesis": {
    id: "research-bayesian-meta-regression-model-synthesis",
    name: "BayesianMetaRegressionModelSynthesisSkill",
    displayName: "Bayesian Meta-Regression Model Synthesis",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Bayesian Meta-Regression Model Synthesis.",
    tags: ["research","bayesian","meta","regression"],
    transform: createStandardSkillTransform({
      sectionName: "Bayesian Meta-Regression Protocol",
      ruSectionName: "Стандарты и практические требования: Bayesian Meta-Regression Model Synthesis",
      instructions: [
        "Apply core domain tenets and industry best practices for Bayesian Meta-Regression Model Synthesis.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Bayesian Meta-Regression Model Synthesis.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","bayesian","meta","regression"],
    }),
  },

  "research-inter-rater-reliability-cohen-kappa-verification": {
    id: "research-inter-rater-reliability-cohen-kappa-verification",
    name: "InterRaterReliabilityCohenKappaVerificationSkill",
    displayName: "Inter-Rater Reliability Cohen Kappa Verification",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Inter-Rater Reliability Cohen Kappa Verification.",
    tags: ["research","inter","rater","reliability"],
    transform: createStandardSkillTransform({
      sectionName: "Cohen Kappa Reliability Standards",
      ruSectionName: "Стандарты и практические требования: Inter-Rater Reliability Cohen Kappa Verification",
      instructions: [
        "Apply core domain tenets and industry best practices for Inter-Rater Reliability Cohen Kappa Verification.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Inter-Rater Reliability Cohen Kappa Verification.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","inter","rater","reliability"],
    }),
  },

  "research-historical-archival-primary-source-triangulation": {
    id: "research-historical-archival-primary-source-triangulation",
    name: "HistoricalArchivalPrimarySourceTriangulationSkill",
    displayName: "Historical Archival Primary Source Triangulation",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Historical Archival Primary Source Triangulation.",
    tags: ["research","historical","archival","primary"],
    transform: createStandardSkillTransform({
      sectionName: "Archival Source Triangulation Standards",
      ruSectionName: "Стандарты и практические требования: Historical Archival Primary Source Triangulation",
      instructions: [
        "Apply core domain tenets and industry best practices for Historical Archival Primary Source Triangulation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Historical Archival Primary Source Triangulation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","historical","archival","primary"],
    }),
  },

  "research-econometric-instrumental-variables-iv-regression": {
    id: "research-econometric-instrumental-variables-iv-regression",
    name: "EconometricInstrumentalVariablesIVRegressionSkill",
    displayName: "Econometric Instrumental Variables (IV) Regression",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Econometric Instrumental Variables (IV) Regression.",
    tags: ["research","econometric","instrumental","variables"],
    transform: createStandardSkillTransform({
      sectionName: "Instrumental Variables Econometrics",
      ruSectionName: "Стандарты и практические требования: Econometric Instrumental Variables (IV) Regression",
      instructions: [
        "Apply core domain tenets and industry best practices for Econometric Instrumental Variables (IV) Regression.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Econometric Instrumental Variables (IV) Regression.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","econometric","instrumental","variables"],
    }),
  },

  "research-seminal-paper-citation-tree-forward-backward-snowballing": {
    id: "research-seminal-paper-citation-tree-forward-backward-snowballing",
    name: "SeminalPaperCitationTreeForwardBackwardSnowballingSkill",
    displayName: "Seminal Paper Citation Tree Forward/Backward Snowballing",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Seminal Paper Citation Tree Forward/Backward Snowballing.",
    tags: ["research","seminal","paper","citation"],
    transform: createStandardSkillTransform({
      sectionName: "Citation Snowballing Research Protocol",
      ruSectionName: "Стандарты и практические требования: Seminal Paper Citation Tree Forward/Backward Snowballing",
      instructions: [
        "Apply core domain tenets and industry best practices for Seminal Paper Citation Tree Forward/Backward Snowballing.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Seminal Paper Citation Tree Forward/Backward Snowballing.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","seminal","paper","citation"],
    }),
  },

  "research-delphi-expert-panel-multi-round-consensus-study": {
    id: "research-delphi-expert-panel-multi-round-consensus-study",
    name: "DelphiExpertPanelMultiRoundConsensusStudySkill",
    displayName: "Delphi Expert Panel Multi-Round Consensus Study",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Delphi Expert Panel Multi-Round Consensus Study.",
    tags: ["research","delphi","expert","panel"],
    transform: createStandardSkillTransform({
      sectionName: "Delphi Consensus Study Architecture",
      ruSectionName: "Стандарты и практические требования: Delphi Expert Panel Multi-Round Consensus Study",
      instructions: [
        "Apply core domain tenets and industry best practices for Delphi Expert Panel Multi-Round Consensus Study.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Delphi Expert Panel Multi-Round Consensus Study.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","delphi","expert","panel"],
    }),
  },

  "research-cohort-longitudinal-follow-up-study-design": {
    id: "research-cohort-longitudinal-follow-up-study-design",
    name: "CohortLongitudinalFollowUpStudyDesignSkill",
    displayName: "Cohort Longitudinal Follow-Up Study Design",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Cohort Longitudinal Follow-Up Study Design.",
    tags: ["research","cohort","longitudinal","follow"],
    transform: createStandardSkillTransform({
      sectionName: "Longitudinal Cohort Study Protocol",
      ruSectionName: "Стандарты и практические требования: Cohort Longitudinal Follow-Up Study Design",
      instructions: [
        "Apply core domain tenets and industry best practices for Cohort Longitudinal Follow-Up Study Design.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Cohort Longitudinal Follow-Up Study Design.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","cohort","longitudinal","follow"],
    }),
  },

  "research-focus-group-moderation-transcript-coding": {
    id: "research-focus-group-moderation-transcript-coding",
    name: "FocusGroupModerationTranscriptCodingSkill",
    displayName: "Focus Group Moderation Transcript Coding",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Focus Group Moderation Transcript Coding.",
    tags: ["research","focus","group","moderation"],
    transform: createStandardSkillTransform({
      sectionName: "Focus Group Transcript Standards",
      ruSectionName: "Стандарты и практические требования: Focus Group Moderation Transcript Coding",
      instructions: [
        "Apply core domain tenets and industry best practices for Focus Group Moderation Transcript Coding.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Focus Group Moderation Transcript Coding.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","focus","group","moderation"],
    }),
  },

  "research-experimental-factorial-anova-interaction-design": {
    id: "research-experimental-factorial-anova-interaction-design",
    name: "ExperimentalFactorialANOVAInteractionDesignSkill",
    displayName: "Experimental Factorial ANOVA Interaction Design",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Experimental Factorial ANOVA Interaction Design.",
    tags: ["research","experimental","factorial","anova"],
    transform: createStandardSkillTransform({
      sectionName: "Factorial ANOVA Design Blueprint",
      ruSectionName: "Стандарты и практические требования: Experimental Factorial ANOVA Interaction Design",
      instructions: [
        "Apply core domain tenets and industry best practices for Experimental Factorial ANOVA Interaction Design.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Experimental Factorial ANOVA Interaction Design.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","experimental","factorial","anova"],
    }),
  },

  "research-pre-registration-osf-open-science-protocol": {
    id: "research-pre-registration-osf-open-science-protocol",
    name: "PreRegistrationOSFOpenScienceProtocolSkill",
    displayName: "Pre-Registration OSF Open Science Protocol",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Pre-Registration OSF Open Science Protocol.",
    tags: ["research","pre","registration","osf"],
    transform: createStandardSkillTransform({
      sectionName: "Open Science Pre-Registration Protocol",
      ruSectionName: "Стандарты и практические требования: Pre-Registration OSF Open Science Protocol",
      instructions: [
        "Apply core domain tenets and industry best practices for Pre-Registration OSF Open Science Protocol.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Pre-Registration OSF Open Science Protocol.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","pre","registration","osf"],
    }),
  },

  "research-content-analysis-quantitative-text-frequencies": {
    id: "research-content-analysis-quantitative-text-frequencies",
    name: "ContentAnalysisQuantitativeTextFrequenciesSkill",
    displayName: "Content Analysis Quantitative Text Frequencies",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Content Analysis Quantitative Text Frequencies.",
    tags: ["research","content","analysis","quantitative"],
    transform: createStandardSkillTransform({
      sectionName: "Quantitative Content Analysis Protocol",
      ruSectionName: "Стандарты и практические требования: Content Analysis Quantitative Text Frequencies",
      instructions: [
        "Apply core domain tenets and industry best practices for Content Analysis Quantitative Text Frequencies.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Content Analysis Quantitative Text Frequencies.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","content","analysis","quantitative"],
    }),
  },

  "research-cross-sectional-epidemiological-odds-ratio-study": {
    id: "research-cross-sectional-epidemiological-odds-ratio-study",
    name: "CrossSectionalEpidemiologicalOddsRatioStudySkill",
    displayName: "Cross-Sectional Epidemiological Odds Ratio Study",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Cross-Sectional Epidemiological Odds Ratio Study.",
    tags: ["research","cross","sectional","epidemiological"],
    transform: createStandardSkillTransform({
      sectionName: "Epidemiological Odds Ratio Standards",
      ruSectionName: "Стандарты и практические требования: Cross-Sectional Epidemiological Odds Ratio Study",
      instructions: [
        "Apply core domain tenets and industry best practices for Cross-Sectional Epidemiological Odds Ratio Study.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Cross-Sectional Epidemiological Odds Ratio Study.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","cross","sectional","epidemiological"],
    }),
  },

  "research-quasi-experimental-difference-in-differences-did": {
    id: "research-quasi-experimental-difference-in-differences-did",
    name: "QuasiExperimentalDifferenceinDifferencesDiDSkill",
    displayName: "Quasi-Experimental Difference-in-Differences (DiD)",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Quasi-Experimental Difference-in-Differences (DiD).",
    tags: ["research","quasi","experimental","difference"],
    transform: createStandardSkillTransform({
      sectionName: "Difference-in-Differences Econometrics",
      ruSectionName: "Стандарты и практические требования: Quasi-Experimental Difference-in-Differences (DiD)",
      instructions: [
        "Apply core domain tenets and industry best practices for Quasi-Experimental Difference-in-Differences (DiD).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Quasi-Experimental Difference-in-Differences (DiD).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","quasi","experimental","difference"],
    }),
  },

  "research-replication-audit-reproducibility-code-verification": {
    id: "research-replication-audit-reproducibility-code-verification",
    name: "ReplicationAuditReproducibilityCodeVerificationSkill",
    displayName: "Replication Audit Reproducibility Code Verification",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Replication Audit Reproducibility Code Verification.",
    tags: ["research","replication","audit","reproducibility"],
    transform: createStandardSkillTransform({
      sectionName: "Reproducibility Verification Standards",
      ruSectionName: "Стандарты и практические требования: Replication Audit Reproducibility Code Verification",
      instructions: [
        "Apply core domain tenets and industry best practices for Replication Audit Reproducibility Code Verification.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Replication Audit Reproducibility Code Verification.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","replication","audit","reproducibility"],
    }),
  },

  "research-peer-review-editorial-critique-rebuttal-memo": {
    id: "research-peer-review-editorial-critique-rebuttal-memo",
    name: "PeerReviewEditorialCritiqueRebuttalMemoSkill",
    displayName: "Peer Review Editorial Critique & Rebuttal Memo",
    categoryId: "research",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Peer Review Editorial Critique & Rebuttal Memo.",
    tags: ["research","peer","review","editorial"],
    transform: createStandardSkillTransform({
      sectionName: "Peer Review Editorial Standards",
      ruSectionName: "Стандарты и практические требования: Peer Review Editorial Critique & Rebuttal Memo",
      instructions: [
        "Apply core domain tenets and industry best practices for Peer Review Editorial Critique & Rebuttal Memo.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Peer Review Editorial Critique & Rebuttal Memo.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["research","peer","review","editorial"],
    }),
  },
};
