import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
