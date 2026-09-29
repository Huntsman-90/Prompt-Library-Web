import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const IDEATION_SKILLS: Record<string, SkillDefinition> = {
  'scamper-brainstorm': {
    id: 'scamper-brainstorm',
    name: 'SCAMPERBrainstormSkill',
    displayName: 'SCAMPER Creative Ideation Matrix',
    categoryId: 'ideation',
    description: 'Applies the 7 SCAMPER lenses: Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse.',
    tags: ['ideation', 'scamper', 'brainstorming', 'creativity', 'innovation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Матрица Креативной Генерации SCAMPER',
        'SCAMPER Creative Ideation Framework',
        [
          '- **Substitute (Заменить)**: Какие компоненты можно заменить на более дешевые/эффективные?',
          '- **Combine (Объединить)**: С чем можно объединить функционал для получения синергии?',
          '- **Adapt (Адаптировать)**: Какую идею из другой отрасли можно скопировать?',
          '- **Modify / Magnify (Увеличить/Изменить)**: Что если увеличить масштаб в 10 раз?',
          '- **Put to another use (Другое применение)**: Кому еще может быть полезен этот продукт?',
          '- **Eliminate (Устранить)**: Что произойдет, если полностью убрать главный элемент?',
          '- **Reverse (Инвертировать)**: Что если развернуть последовательность шагов задом наперед?',
        ],
        [
          '- **Substitute**: What materials, algorithms, or APIs can be swapped for higher efficiency?',
          '- **Combine**: What complementary workflows can be merged to unlock operational synergy?',
          '- **Adapt**: What proven mechanism from biology or avionics can be adapted here?',
          '- **Modify / Magnify**: What happens if we scale the core parameter by 10x?',
          '- **Put to Another Use**: What secondary non-obvious audience can exploit this asset?',
          '- **Eliminate**: What happens if we ruthlessly eliminate the primary dependency?',
          '- **Reverse**: What if we invert the operational sequence or buyer/seller relationship?',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'blue-ocean-divergence': {
    id: 'blue-ocean-divergence',
    name: 'BlueOceanDivergenceSkill',
    displayName: 'Blue Ocean Strategy Value Innovation (ERRC)',
    categoryId: 'ideation',
    description: 'Eliminate-Reduce-Raise-Create grid to break trade-offs and unlock uncontested market space.',
    tags: ['ideation', 'blue-ocean', 'errc', 'innovation', 'strategy', 'differentiation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Сетка Создания Голубого Океана (ERRC Grid)',
        'Blue Ocean Strategy Value Innovation (ERRC Grid)',
        [
          '- **Eliminate (Устранить)**: Какие общепринятые в отрасли затратные факторы можно полностью убрать?',
          '- **Reduce (Снизить)**: Какие параметры можно снизить значительно ниже отраслевых стандартов?',
          '- **Raise (Повысить)**: Какие факторы нужно поднять значительно выше стандартов?',
          '- **Create (Создать)**: Что принципиально новое, чего нет на рынке, нужно создать с нуля?',
        ],
        [
          '- **Eliminate**: Which costly industry-standard baseline features can be eliminated entirely?',
          '- **Reduce**: Which non-essential parameters can be scaled down far below market averages?',
          '- **Raise**: Which critical customer-delight vectors should be elevated far above competitors?',
          '- **Create**: What novel value proposition must be engineered from scratch?',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'crazy-eights-ideation': {
    id: 'crazy-eights-ideation',
    name: 'CrazyEightsIdeationSkill',
    displayName: 'Crazy Eights Rapid Ideation Sprint',
    categoryId: 'ideation',
    description: 'Generates 8 distinctly divergent, high-velocity solution concepts to smash mental fixation.',
    tags: ['ideation', 'crazy-eights', 'sprint', 'divergent', 'rapid'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Спринт Генерации 8 Разнородных Идей (Crazy Eights)',
        'Crazy Eights Divergent Ideation Sprint',
        [
          'Сгенерировать 8 принципиально разных концепций решения (от тривиально-простых до радикальных и футуристичных):',
          '1. Минималистичный MVP (1 день разработки)',
          '2. Автоматизированный AI-пайплайн',
          '3. Zero-code решение на готовых сервисах',
          '4. Краудсорсинговый / комьюнити подход',
          '5. Аппаратное / физическое решение',
          '6. Радикальная инверсия бизнес-модели',
          '7. Геймифицированный сценарий',
          '8. Экстремально масштабируемая distributed-архитектура',
        ],
        [
          'Generate 8 radically divergent conceptual solutions across the spectrum:',
          '1. Tactical 1-Day Low-Code MVP',
          '2. Fully Autonomous Agentic Pipeline',
          '3. Serverless Zero-Infrastructure Approach',
          '4. Crowdsourced Community Flywheel',
          '5. Asynchronous Batch / Edge Execution',
          '6. Inverted Business Model Monolith',
          '7. Gamified Habit-Forming UI',
          '8. Distributed High-Throughput Fault-Tolerant Engine',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'six-thinking-hats': {
    id: 'six-thinking-hats',
    name: 'SixThinkingHatsSkill',
    displayName: 'de Bono Six Thinking Hats Framework',
    categoryId: 'ideation',
    description: 'Systematically evaluates concepts across White (Facts), Red (Emotions), Black (Risks), Yellow (Benefits), Green (Creativity), Blue (Process).',
    tags: ['ideation', 'six-hats', 'de-bono', 'perspectives', 'evaluation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Шесть Шляп Мышления Эдварда де Боно',
        'Edward de Bono Six Thinking Hats Protocol',
        [
          '- **Белая шляпа (Факты)**: Точные данные и известные параметры.',
          '- **Красная шляпа (Эмоции)**: Интуитивная реакция пользователей и команды.',
          '- **Черная шляпа (Риски)**: Пессимистичный аудит уязвимостей.',
          '- **Желтая шляпа (Польза)**: Оптимистичный сценарий и ROI.',
          '- **Зеленая шляпа (Креатив)**: Нестандартные альтернативы.',
          '- **Синяя шляпа (Оркестрация)**: Итоговый синтез и план действий.',
        ],
        [
          '- **White Hat (Empirical Facts)**: Grounded telemetry, hard metrics, and known baselines.',
          '- **Red Hat (Intuition & Emotions)**: Visceral customer sentiment and emotional friction.',
          '- **Black Hat (Critical Risk)**: Pessimistic adversarial audit and worst-case vectors.',
          '- **Yellow Hat (Optimistic Value)**: High-conviction ROI and upside potential.',
          '- **Green Hat (Pure Creativity)**: Unconstrained lateral divergence and non-obvious hooks.',
          '- **Blue Hat (Process Synthesis)**: Final convergence and execution sequencing.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'reverse-brainstorming': {
    id: 'reverse-brainstorming',
    name: 'ReverseBrainstormingSkill',
    displayName: 'Reverse Brainstorming (How to Destroy)',
    categoryId: 'ideation',
    description: 'Brainstorms how to maximize user frustration or guarantee product failure, then inverts every point into a solution.',
    tags: ['ideation', 'reverse', 'inversion', 'brainstorming', 'problem-solving'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Обратный Мозговой Штурм (Reverse Brainstorming)',
        'Reverse Brainstorming Inversion Engine',
        [
          '- Шаг 1: Придумать 5 способов гарантированно провалить проект и взбесить пользователей.',
          '- Шаг 2: Инвертировать каждый пункт в строгую позитивную инженерную контрмеру.',
        ],
        [
          '- Step 1: Brainstorm 5 foolproof methods to completely destroy the system and alienate users.',
          '- Step 2: Systematically invert each destructive vector into an ironclad positive architecture guardrail.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'biomimicry-cross-pollination': {
    id: 'biomimicry-cross-pollination',
    name: 'BiomimicryCrossPollinationSkill',
    displayName: 'Biomimicry Nature Design Systems',
    categoryId: 'ideation',
    description: 'Extracts million-year-old biological optimization algorithms (mycelium networks, ant colonies, immune response).',
    tags: ['ideation', 'biomimicry', 'nature', 'algorithms', 'cross-pollination'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Биомиметика и Природные Алгоритмы',
        'Biomimicry Biological Systems Architecture',
        [
          '- Изучить природный аналог (мицелиальная сеть для маршрутизации, муравьиная колония для балансировки нагрузки).',
          '- Адаптировать биологический принцип в конкретный программный протокол.',
        ],
        [
          '- Extract biological resilience mechanisms (mycelial routing, ant-colony load balancing, immune antibody targeting).',
          '- Map the biological principle into an explicit software architecture algorithm.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'morphological-matrix': {
    id: 'morphological-matrix',
    name: 'MorphologicalMatrixSkill',
    displayName: 'Zwicky Morphological Combinatorial Matrix',
    categoryId: 'ideation',
    description: 'Builds a multi-dimensional parameter matrix and combines attributes to create hundreds of novel permutations.',
    tags: ['ideation', 'morphological', 'zwicky', 'matrix', 'combinatorics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Морфологическая Матрица Цвикки',
        'Zwicky Morphological Combinatorial Matrix',
        [
          'Построить таблицу параметров: [Источник данных] x [Модель обработки] x [Канал доставки] x [Формат монетизации].',
          'Выбрать 3 уникальные комбинации на стыке параметров.',
        ],
        [
          'Construct parameter axes: [Data Tier] x [Compute Topology] x [Delivery Vector] x [Monetization Mechanism].',
          'Synthesize 3 distinct non-obvious permutations by combining disparate intersecting cells.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'provocation-po-technique': {
    id: 'provocation-po-technique',
    name: 'ProvocationPOTechniqueSkill',
    displayName: 'Lateral Provocation (PO Technique)',
    categoryId: 'ideation',
    description: 'Introduces absurd provocative statements (PO) to break mental ruts and force creative escape pathways.',
    tags: ['ideation', 'provocation', 'po', 'lateral', 'escape'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Латеральная Провокация (Метод PO)',
        'Lateral Provocation & Escape Protocol (PO)',
        [
          '- Сформулировать абсурдное провокационное утверждение («PO: Машины имеют квадратные колеса», «PO: База данных не хранит данные»).',
          '- Использовать провокацию как трамплин для нахождения революционной оптимизации.',
        ],
        [
          '- Introduce an intentionally absurd provocative statement ("PO: Databases never store data", "PO: Software without UI").',
          '- Use the provocative tension as a stepping stone toward a breakthrough zero-overhead architecture.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'future-backcasting': {
    id: 'future-backcasting',
    name: 'FutureBackcastingSkill',
    displayName: 'Future Backcasting & Retrospective Planning',
    categoryId: 'ideation',
    description: 'Pivots vision to year 2035 where the problem is 100% solved, and traces backward steps to today.',
    tags: ['ideation', 'backcasting', 'futurism', 'strategy', 'vision'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Обратное Прогнозирование (Future Backcasting)',
        'Future Backcasting & Retrospective Trajectory',
        [
          '- Переместиться в будущее, где задача идеально решена.',
          '- Проследить обратную траекторию шагов от победы к сегодняшнему дню (Год +5 -> Год +2 -> Год +1 -> Сегодня).',
        ],
        [
          '- Anchor perspective in an ideal future state where the problem is completely solved.',
          '- Trace chronological stepping stones backward from ultimate victory to Day 1 implementation.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'random-word-stimulus': {
    id: 'random-word-stimulus',
    name: 'RandomWordStimulusSkill',
    displayName: 'Random Word Conceptual Stimulus',
    categoryId: 'ideation',
    description: 'Forces arbitrary random nouns into the problem space to trigger unconditioned associative jumps.',
    tags: ['ideation', 'random-word', 'associative', 'creativity', 'stimulus'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Стимуляция Случайным Словом',
        'Random Word Associative Stimulus',
        [
          '- Выбрать произвольное слово («Вулкан», «Маятник», «Телескоп») и найти 3 скрытых моста к решаемой архитектурной задаче.',
        ],
        [
          '- Ingest an arbitrary stimulus noun ("Volcano", "Pendulum", "Telescope") and derive 3 associative technical bridges.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'disney-creative-method': {
    id: 'disney-creative-method',
    name: 'DisneyCreativeMethodSkill',
    displayName: 'Walt Disney 3-Room Creative Engine',
    categoryId: 'ideation',
    description: 'Cycles concepts through The Dreamer (pure vision), The Realist (engineering plan), and The Critic (adversarial audit).',
    tags: ['ideation', 'disney', 'dreamer', 'realist', 'critic', 'creativity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Трёхкомнатный Метод Уолта Диснея',
        'Walt Disney Tri-State Creative Method',
        [
          '1. **Мечтатель (Dreamer)**: Генерация максималистичного видения без оглядки на ограничения.',
          '2. **Реалист (Realist)**: Превращение мечты в конкретный инженерный план.',
          '3. **Критик (Critic)**: Поиск всех скрытых изъянов и уязвимостей плана.',
        ],
        [
          '1. **The Dreamer**: Unconstrained visionary ideation without budget or technical limitations.',
          '2. **The Realist**: Pragmatic engineering deconstruction and milestone formulation.',
          '3. **The Critic**: Adversarial stress-testing of assumptions and cost boundaries.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'trend-intersection-synthesis': {
    id: 'trend-intersection-synthesis',
    name: 'TrendIntersectionSynthesisSkill',
    displayName: 'Macro-Trend Intersection Synthesis',
    categoryId: 'ideation',
    description: 'Crosses 3 colliding technological and social macro-trends to spot emerging billion-dollar whitespace.',
    tags: ['ideation', 'trends', 'intersection', 'whitespace', 'synthesis'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Синтез на Пересечении Макротрендов',
        'Macro-Trend Intersection Synthesis',
        [
          '- Пересечь 3 глобальных тренда (например: Local-First AI + Децентрализованная энергетика + Стареющее население) для поиска уникального продукта.',
        ],
        [
          '- Synthesize solutions at the collision of 3 macro-trends (e.g. Local-First AI + Edge Compute + Sovereign Data Residency).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'lotus-blossom-expansion': {
    id: 'lotus-blossom-expansion',
    name: 'LotusBlossomExpansionSkill',
    displayName: 'Lotus Blossom 8x8 Idea Expansion',
    categoryId: 'ideation',
    description: 'Expands a core central problem into 8 core themes, and each theme into 8 sub-solutions (64 ideas total).',
    tags: ['ideation', 'lotus-blossom', 'expansion', 'brainstorming', 'systematic'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Техника «Цветок Лотоса» (Lotus Blossom)',
        'Lotus Blossom 8x8 Expansion Protocol',
        [
          '- Развернуть центральную задачу на 8 тематических лепестков, а каждый лепесток — на конкретные технические решения.',
        ],
        [
          '- Deconstruct central challenge into 8 surrounding thematic petals, expanding each into actionable sub-solutions.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'worst-possible-idea-inversion': {
    id: 'worst-possible-idea-inversion',
    name: 'WorstPossibleIdeaInversionSkill',
    displayName: 'Worst Possible Idea Cognitive Breakthrough',
    categoryId: 'ideation',
    description: 'Intentionally generates the absolute worst, most ridiculous concepts to dissolve cognitive performance anxiety.',
    tags: ['ideation', 'worst-idea', 'humor', 'unblocking', 'creativity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Метод Худшей Идеи (Worst Possible Idea)',
        'Worst Possible Idea Breakthrough Protocol',
        [
          '- Сформулировать 3 самых смехотворных и абсурдных решения, а затем извлечь из каждого скрытое рациональное зерно.',
        ],
        [
          '- Intentionally propose 3 comically terrible solutions to eliminate perfectionist blocks, extracting latent insights from each.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
