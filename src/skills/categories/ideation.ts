import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const IDEATION_SKILLS: Record<string, SkillDefinition> = {
  'scamper-creativity-engine': {
    id: 'scamper-creativity-engine',
    name: 'ScamperCreativityEngineSkill',
    displayName: 'SCAMPER Creative Innovation Engine',
    categoryId: 'ideation',
    description: 'Systematically generates novel concept variations using SCAMPER: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse.',
    tags: ['ideation', 'scamper', 'brainstorming', 'creativity', 'innovation', 'product'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Генерация Инноваций по Методологии SCAMPER',
        'SCAMPER Innovation & Divergent ideation Protocol',
        [
          '- **[S] Substitute (Заместить)**: Какой компонент или материал можно заменить на принципиально другой?',
          '- **[C] Combine (Объединить)**: С чем можно объединить этот продукт для синергетического эффекта?',
          '- **[A] Adapt (Адаптировать)**: Какую чужую идею из смежной отрасли можно скопировать и внедрить?',
          '- **[M] Modify/Magnify (Модифицировать)**: Что произойдет, если увеличить ключевой параметр в 100 раз?',
          '- **[P] Put to another use (Другое применение)**: Как этот продукт может решить задачу совершенно другой аудитории?',
          '- **[E] Eliminate (Устранить)**: Какую «обязательную» функцию можно вырезать ради абсолютной простоты?',
          '- **[R] Reverse (Инвертировать)**: Что если сделать процесс прямо противоположным общепринятому?',
        ],
        [
          '- **[S] Substitute**: What critical component, API, or paradigm can be replaced with an orthogonal alternative?',
          '- **[C] Combine**: What complementary system or capability can be merged for a multiplier effect?',
          '- **[A] Adapt**: What proven mechanism from biology or aerospace can be adapted into this domain?',
          '- **[M] Modify/Magnify**: What emergent properties arise if throughput or scale is magnified 100x?',
          '- **[P] Put to Another Use**: How can this technology be repurposed to solve an unrelated market crisis?',
          '- **[E] Eliminate**: What complex legacy feature can be aggressively stripped away for radical ergonomics?',
          '- **[R] Reverse**: What happens if the entire workflow sequence is executed backwards?',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'six-thinking-hats-de-bono': {
    id: 'six-thinking-hats-de-bono',
    name: 'SixThinkingHatsDeBonoSkill',
    displayName: 'Edward de Bono 6 Thinking Hats',
    categoryId: 'ideation',
    description: 'Evaluates ideas through 6 distinct cognitive perspectives: White (Facts), Red (Emotions), Black (Risks), Yellow (Benefits), Green (Creativity), Blue (Process).',
    tags: ['ideation', 'de-bono', '6-hats', 'thinking-hats', 'brainstorming', 'perspective'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Анализ Идей по 6 Шляпам Мышления Эдварда де Боно',
        'Edward de Bono 6 Thinking Hats Ideation Protocol',
        [
          '- **Белая шляпа (Факты)**: Голые объективные цифры, доступные данные и недостающая информация.',
          '- **Красная шляпа (Интуиция)**: Эмоциональный отклик, предчувствия и первое впечатление без цензуры.',
          '- **Черная шляпа (Критика)**: Безжалостный поиск уязвимостей, рисков и причин неизбежного провала.',
          '- **Желтая шляпа (Оптимизм)**: Потенциальные выгоды, возможности для масштабирования и долгосрочные плюсы.',
          '- **Зеленая шляпа (Креатив)**: Смелые альтернативы, нестандартные ходы и неожиданные идеи.',
          '- **Синяя шляпа (Контроль)**: Управление процессом, структурирование выводов и план действий.',
        ],
        [
          '- **White Hat (Empirical Facts)**: Objective telemetry, baseline data, and verified constraints.',
          '- **Red Hat (Intuition & Feelings)**: Gut emotional reactions, user delight hunches, and raw unfiltered sentiment.',
          '- **Black Hat (Pessimistic Risk Audit)**: Severe risk analysis, legal exposure, technical debt, and fatal failure points.',
          '- **Yellow Hat (Optimistic Value Realization)**: Best-case upsides, multiplier effects, and enterprise ROI potential.',
          '- **Green Hat (Divergent Innovation)**: Radical out-of-the-box creative pivots and lateral conceptual leaps.',
          '- **Blue Hat (Process Synthesis)**: Metacognitive facilitation, synthesis, and concrete execution orchestration.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'crazy-eights-rapid-divergence': {
    id: 'crazy-eights-rapid-divergence',
    name: 'CrazyEightsRapidDivergenceSkill',
    displayName: 'Crazy Eights Rapid Concept Sprint',
    categoryId: 'ideation',
    description: 'Generates 8 radically distinct concept variations within strict constraints to break beyond obvious first-thought ideas.',
    tags: ['ideation', 'crazy-eights', 'design-sprint', 'divergence', 'brainstorming', 'concepts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Генерация 8 Концептов (Crazy Eights Sprint)',
        'Crazy Eights Rapid Concept Matrix (8 Distinct Archetypes)',
        [
          '- **8 Принципиально разных концептов**: Предложить 8 уникальных вариантов решения задачи (от минималистичного до ультра-футуристичного).',
          '- **Запрет на вариации одной идеи**: Каждый концепт должен использовать принципиально иную архитектурную или бизнес-механику.',
          '- **Сжатое описание**: 2 предложения на концепт с указанием главной фичи и ключевого преимущества.',
        ],
        [
          '- **8 Radically Distinct Concepts**: Formulate 8 fundamentally divergent architectural or product solutions.',
          '- **Zero Incremental Clones**: Each concept must leverage an entirely different paradigm, pricing model, or technical architecture.',
          '- **High-Density Concept Cards**: Deliver 2-sentence dossiers per concept highlighting the primary differentiator and core mechanism.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'analogous-domain-mashup': {
    id: 'analogous-domain-mashup',
    name: 'AnalogousDomainMashupSkill',
    displayName: 'Cross-Industry Mashup & Concept Fusion',
    categoryId: 'ideation',
    description: 'Synthesizes breakthrough products by hybridizing proven models (e.g., "Uber for Logistics", "Figma for Infrastructure-as-Code").',
    tags: ['ideation', 'mashup', 'hybrid', 'analogy', 'fusion', 'innovation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Кросс-Индустриальный Гибридный Мэшап (Concept Fusion)',
        'Cross-Industry Concept Mashup & Hybridization Protocol',
        [
          '- **Выбор эталонной модели**: Взять проверенную механику из другой сферы (например: алгоритмы рекомендаций Spotify или multiplayer-движок Figma).',
          '- **Перенос в целевую область**: Применить эту механику к целевой задаче, решив застарелую проблему индустрии.',
          '- **Уникальное позиционирование**: Сформулировать слоган-гибрид: «[Известный сервис] для [Целевая отрасль]».',
        ],
        [
          '- **Benchmark Model Selection**: Isolate an iconic workflow mechanic from a proven industry leader (e.g. Figma multiplayer CRDTs, Uber dispatch algorithms).',
          '- **Target Domain Transplantation**: Graft the core mechanic into the target domain to eliminate traditional workflow bottlenecks.',
          '- **Hybrid Value Proposition**: Formulate a crisp conceptual hook: "[Iconic Platform] for [Target Problem Domain]".',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  '10x-moonshot-thinking': {
    id: '10x-moonshot-thinking',
    name: 'TenXMoonshotThinkingSkill',
    displayName: 'Google X 10x Moonshot Formula',
    categoryId: 'ideation',
    description: 'Applies the Google X Moonshot formula: 1) Huge Global Problem + 2) Radical Sci-Fi Solution + 3) Feasible Breakthrough Technology.',
    tags: ['ideation', 'moonshot', '10x', 'google-x', 'exponential', 'breakthrough'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Формула Муншотов (Google X 10x Moonshot)',
        'Google X 10x Moonshot Innovation Formula',
        [
          '- **1. Глобальная фундаментальная проблема**: Проблема, затрагивающая миллионы людей или стоящая миллиарды долларов ежегодно.',
          '- **2. Радикальное решение (Sci-Fi Solution)**: Решение, которое звучит как научная фантастика, но меняет правила игры на 10x.',
          '- **3. Реалистичная прорывная технология**: Технологический рычаг, делающий решение осуществимым уже в ближайшие 3–5 лет.',
        ],
        [
          '- **1. Existential Problem Scope**: Pinpoint a massive global bottleneck with multi-billion-dollar compounding annual friction.',
          '- **2. Radical Science-Fiction Solution**: Propose an audacious concept delivering a 10x (1000%) improvement rather than a 10% optimization.',
          '- **3. Grounded Breakthrough Technology**: Identify the exact emerging technological vector that makes this achievable within 3-5 years.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'assumption-smashing-inversion': {
    id: 'assumption-smashing-inversion',
    name: 'AssumptionSmashingInversionSkill',
    displayName: 'Dogma Smashing & Axiom Reversal',
    categoryId: 'ideation',
    description: 'Lists orthodox "untouchable" industry rules and deliberately inverts every single one to uncover blue ocean opportunities.',
    tags: ['ideation', 'dogma', 'inversion', 'axioms', 'contrarian', 'innovation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Разрушение Догм и Инверсия Отраслевых Аксиом',
        'Dogma Smashing & Industry Axiom Inversion Protocol',
        [
          '- **Список «священных коров» отрасли**: Выписать 5 общепринятых правил, которые в индустрии считают аксиомами («Банк должен иметь отделения», «ПО требует подписки»).',
          '- **Радикальная инверсия**: Сформулировать прямо противоположное утверждение для каждого пункта.',
          '- **Архитектура нового бизнеса**: Спроектировать модель, которая делает инвертированное правило своим главным конкурентным преимуществом.',
        ],
        [
          '- **Industry Sacred Cows**: Enumerate 5 foundational dogmas presumed immutable within this industry.',
          '- **Radical Axiomatic Reversal**: Force a 180-degree inversion for every single premise.',
          '- **Inverted Business Architecture**: Architect a business and operational engine built specifically around the inverted paradigm.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'worst-possible-idea-reverse': {
    id: 'worst-possible-idea-reverse',
    name: 'WorstPossibleIdeaReverseSkill',
    displayName: 'Worst Possible Idea Inversion',
    categoryId: 'ideation',
    description: 'Brainstorms intentionally horrific, disastrous ideas, then reverses their attributes into breakthrough solutions.',
    tags: ['ideation', 'worst-idea', 'reverse', 'unblocking', 'creativity', 'brainstorming'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Метод Худшей Возможной Идеи (Worst Idea Inversion)',
        'Worst Possible Idea Inversion Protocol',
        [
          '- **Генерация ужасных идей**: Придумать 3 намеренно катастрофических решения, которые сделают проблему в 10 раз хуже.',
          '- **Анализ скрытых атрибутов**: Найти, почему эта идея так ужасна (вскрыть лежащий в ее основе экстремальный фактор).',
          '- **Трансформация в прорыв**: Инвертировать этот экстремальный фактор и превратить его в гениальное решение.',
        ],
        [
          '- **Catastrophic Idea Generation**: Devise 3 intentionally horrific concepts guaranteed to exacerbate the problem 10x.',
          '- **Underlying Mechanism Extraction**: Deconstruct the precise psychological or structural mechanic causing the catastrophe.',
          '- **Transmutation to Breakthrough**: Invert that extreme attribute into an unexpectedly elegant, disruptive innovation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'random-stimulus-provocation': {
    id: 'random-stimulus-provocation',
    name: 'RandomStimulusProvocationSkill',
    displayName: 'Random Stimulus & Forced Association',
    categoryId: 'ideation',
    description: 'Injects an arbitrary, unrelated random concept (e.g. "Mushroom", "Telescope", "Submarine") to force unexpected associative leaps.',
    tags: ['ideation', 'random-word', 'provocation', 'association', 'lateral-thinking'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Метод Случайного Стимула (Random Stimulus Provocation)',
        'Random Stimulus & Forced Association Protocol',
        [
          '- **Случайный объект**: Выбрать случайное понятие из физического мира (например: «Мицелий», «Акустический сонар», «Оригами»).',
          '- **Поиск метафорических мостов**: Выписать 5 свойств выбранного объекта и принудительно связать каждое свойство с целевой задачей.',
          '- **Синтез новой функциональности**: Сформулировать инновационную фичу, родившуюся из этой связи.',
        ],
        [
          '- **Arbitrary Physical Stimulus**: Select a random conceptual artifact (e.g. "Mycelial Network", "Sonar Beacon", "Origami Fold").',
          '- **Forced Semantic Bridging**: Itemize 5 physical attributes of the stimulus and construct direct structural bridges to the core problem.',
          '- **Novel Feature Synthesis**: Crystallize an unprecedented feature concept derived from the forced association.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'triz-inventive-principles': {
    id: 'triz-inventive-principles',
    name: 'TrizInventivePrinciplesSkill',
    displayName: '40 TRIZ Inventive Principles',
    categoryId: 'ideation',
    description: 'Applies Altshuller\'s 40 TRIZ inventive principles (Segmentation, Asymmetry, Nesting, Equipotentiality) to resolve engineering trade-offs.',
    tags: ['ideation', 'triz', 'altshuller', 'engineering-contradiction', 'inventive-principles'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Принципы Теории Изобретательских Задач (40 Принципов ТРИЗ)',
        'TRIZ Inventive Principles & Contradiction Resolution',
        [
          '- **Формулирование технического противоречия**: Описать конфликт (например: «Увеличение надежности приводит к росту задержки»).',
          '- **Применение принципов ТРИЗ**: Использовать принципы: 1) Дробление (Segmentation), 2) Вынесение (Taking out), 3) Динамизация (Dynamism), 4) Предварительное действие (Prior action).',
          '- **Идеальный Конечный Результат (ИКР)**: Достичь цели так, чтобы функция выполнялась сама собой без усложнения системы.',
        ],
        [
          '- **Engineering Contradiction Formulation**: State the trade-off tension (e.g. "Maximizing cryptographic security increases verification latency").',
          '- **TRIZ Principle Deployment**: Apply classic inventive operators: Segmentation, Separation in Time/Space, Equipotentiality, Prior Counter-Action.',
          '- **Ideal Final Result (IFR)**: Design the target system such that the desired function performs autonomously with zero additional overhead.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'blue-ocean-strategy-canvas': {
    id: 'blue-ocean-strategy-canvas',
    name: 'BlueOceanStrategyCanvasSkill',
    displayName: 'Blue Ocean Four Actions Framework (ERRC)',
    categoryId: 'ideation',
    description: 'Applies Blue Ocean Strategy: Eliminate-Reduce-Raise-Create grid to break the value-cost trade-off and open uncontested markets.',
    tags: ['ideation', 'blue-ocean', 'errc', 'strategy-canvas', 'uncontested-market'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Сетка Действий Стратегии Голубого Океана (ERRC Grid)',
        'Blue Ocean Strategy Canvas & Four Actions Grid (ERRC)',
        [
          '- **[E] Eliminate (Устранить)**: Какие факторы, привычные для отрасли, следует полностью ликвидировать?',
          '- **[R] Reduce (Снизить)**: Какие параметры можно снизить значительно ниже отраслевых стандартов?',
          '- **[R] Raise (Повысить)**: Какие параметры следует поднять значительно выше отраслевых стандартов?',
          '- **[C] Create (Создать)**: Какие абсолютно новые ценностные факторы нужно создать с нуля?',
        ],
        [
          '- **[E] Eliminate**: Which industry-standard factors taken for granted must be completely eliminated?',
          '- **[R] Reduce**: Which cost-heavy features should be reduced well below industry baseline?',
          '- **[R] Raise**: Which critical friction-reducing attributes should be raised far above the competition?',
          '- **[C] Create**: What unprecedented value drivers never offered in this space should be created from scratch?',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'provocative-what-if-scenarios': {
    id: 'provocative-what-if-scenarios',
    name: 'ProvocativeWhatIfScenariosSkill',
    displayName: 'Provocative "What-If" Paradigm Breakers',
    categoryId: 'ideation',
    description: 'Generates provocative hypothetical boundary-breaking scenarios ("What if software wrote itself?", "What if compute was free?").',
    tags: ['ideation', 'what-if', 'provocation', 'future', 'paradigm-shift'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Провокационные Сценарии «Что если...» (Paradigm Breakers)',
        'Provocative "What-If" Paradigm Breaker Protocol',
        [
          '- **Устранение фундаментального барьера**: Задать вопрос: «Что если стоимость вычислений/хранилища станет равной нулю?», «Что если задержка сети исчезнет?».',
          '- **Исследование нового ландшафта**: Как изменится архитектура, если ключевое ограничение перестанет существовать?',
          '- **Практический вывод**: Какую часть этого идеального будущего можно внедрить уже сегодня?',
        ],
        [
          '- **Fundamental Constraint Annihilation**: Pose paradigm provocations: "What if compute latency dropped to zero?", "What if memory was infinite?".',
          '- **Post-Constraint Architecture**: Explore the revolutionary architecture that becomes natural when the historical bottleneck vanishes.',
          '- **Contemporary Extraction**: Reverse-engineer which architectural facets of this future state can be pre-emptively deployed today.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'biomimicry-design-inspiration': {
    id: 'biomimicry-design-inspiration',
    name: 'BiomimicryDesignInspirationSkill',
    displayName: 'Biomimetic Systems Engineering',
    categoryId: 'ideation',
    description: 'Draws on 3.8 billion years of biological evolution (neural plasticity, ant colony routing, vascular cooling) for systems design.',
    tags: ['ideation', 'biomimicry', 'biology', 'evolution', 'nature', 'systems-design'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Биомиметический Инжиниринг (Biomimicry Protocol)',
        'Biomimetic Systems Engineering Protocol',
        [
          '- **Поиск биологического аналога**: Как природа решает эту проблему (иммунная защита, роевой интеллект муравьев, терморегуляция)?',
          '- **Извлечение механизма**: Абстрагировать биологический паттерн в программный или архитектурный алгоритм.',
          '- **Внедрение саморегуляции**: Обеспечить самовосстановление, адаптивность и энергоэффективность в разрабатываемой системе.',
        ],
        [
          '- **Biological Isomorphism Discovery**: Identify evolutionary mechanisms solving parallel challenges (mycelial routing, cellular apoptosis, swarm stigmergy).',
          '- **Algorithmic Abstraction**: Translate biological adaptation mechanics into distributed software algorithms.',
          '- **Autonomous Self-Regulation**: Infuse the target architecture with self-healing, autonomic resilience and energetic efficiency.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'divergent-to-convergent-funnel': {
    id: 'divergent-to-convergent-funnel',
    name: 'DivergentToConvergentFunnelSkill',
    displayName: 'Double Diamond Divergence/Convergence Funnel',
    categoryId: 'ideation',
    description: 'Manages the Double Diamond process: wide unconstrained divergence followed by disciplined analytical convergence and selection.',
    tags: ['ideation', 'double-diamond', 'divergence', 'convergence', 'design-thinking'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Двухконтурная Воронка Мышления (Double Diamond Funnel)',
        'Double Diamond Divergent/Convergent Funnel Protocol',
        [
          '- **Фаза Дивергенции (Широкий поиск)**: Сгенерировать максимальное количество гипотез без преждевременной критики (минимум 10 идей).',
          '- **Фаза Конвергенции (Жесткий отбор)**: Отфильтровать идеи через матрицу «Ценность / Сложность реализации».',
          '- **Выбор победителя**: Выбрать 1 ключевую идею для немедленного прототипирования и 2 в бэклог.',
        ],
        [
          '- **Divergence Surge (Broad Exploration)**: Generate an expansive idea volume (min 10 candidates) with zero premature critique.',
          '- **Convergence Filter (Rigorous Pruning)**: Sift candidate concepts through a calibrated Impact vs. Engineering Effort matrix.',
          '- **Prototyping Champion Selection**: Select the singular highest-scoring champion concept for immediate execution alongside two contingency runners-up.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'future-backwards-visioning': {
    id: 'future-backwards-visioning',
    name: 'FutureBackwardsVisioningSkill',
    displayName: 'Future-Backwards Visioning & Backcasting',
    categoryId: 'ideation',
    description: 'Projects 10-20 years into the future to define a transformative end-state, then backcasts the necessary breakthroughs backwards.',
    tags: ['ideation', 'backcasting', 'future', 'vision', 'foresight', 'strategy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Проектирование из Будущего Назад (Future Backcasting)',
        'Future-Backwards Visioning & Backcasting Protocol',
        [
          '- **Видение 2035 года**: Описать мир через 10 лет, где проблема решена на 100% благодаря вашей технологии.',
          '- **Обратная дорожная карта**: Восстановить вехи: 2032 (массовое внедрение) -> 2029 (первый стандарт) -> 2026 (прототип).',
          '- **Первый шаг сегодня**: Определить конкретный инженерный эксперимент, который необходимо запустить на этой неделе.',
        ],
        [
          '- **Future State Anchoring (+10 Years)**: Articulate the mature equilibrium state where the target problem has been eliminated.',
          '- **Reverse Milestone Backcasting**: Map retroactive historical milestones: T+8 (Global Standard) -> T+5 (Enterprise GA) -> T+2 (Architecture Alpha).',
          '- **Immediate T0 Trigger**: Isolate the singular definitive technical prototype that must be compiled this week.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'first-principles-deconstruction': {
    id: 'first-principles-deconstruction',
    name: 'FirstPrinciplesDeconstructionSkill',
    displayName: 'First-Principles Deconstruction & Reassembly',
    categoryId: 'ideation',
    description: 'Strips legacy solutions down to foundational physical/economic axioms, reassembling novel architectures from zero.',
    tags: ['ideation', 'first-principles', 'musk', 'physics', 'axioms', 'breakthrough'],
    transform: createStandardSkillTransform(
      'protocol',
      'Декомпозиция с Первых Принципов (First-Principles Thinking)',
      'First-Principles Deconstruction & Axiomatic Reassembly Protocol',
      [
        '- **Аудит догм и аналогий**: Выписать все общепринятые суждения («все так делают», «рынок устроен вот так») и подвергнуть их сомнению.',
        '- **Поиск фундаментальных истин**: Спуститься на уровень физических законов, сырьевой себестоимости и математических инвариантов.',
        '- **Сборка решения с чистого листа**: Собрать принципиально новый подход, используя только базовые кирпичики без оглядки на традиции.',
      ],
      [
        '- **Dogma & Analogy Audit**: Strip away conventional industry consensus ("that is how it is always done"), questioning every legacy premise.',
        '- **Physical & Economic Axiom Isolation**: Drill down to indisputable bedrock truths: raw material commodities, energy costs, and math invariants.',
        '- **Clean-Slate Architecture Reassembly**: Rebuild the operational solution from ground zero using exclusively bedrock axioms.',
      ]
    ),
  },

  'inversion-mental-model-munger': {
    id: 'inversion-mental-model-munger',
    name: 'InversionMentalModelMungerSkill',
    displayName: 'Munger Inversion Principle ("Invert, Always Invert")',
    categoryId: 'ideation',
    description: 'Solves complex problems backward by mapping exactly how to guarantee catastrophic failure, then systematically avoiding those conditions.',
    tags: ['ideation', 'inversion', 'munger', 'mental-models', 'failure-modes', 'strategy'],
    transform: createStandardSkillTransform(
      'protocol',
      'Принцип Инверсии Чарли Мангера («Всегда Выворачивай»)',
      'Charlie Munger Inversion Principle Architecture',
      [
        '- **Формулировка катастрофы**: Вместо вопроса «Как сделать проект успешным?» спросить «Что гарантированно уничтожит этот проект в первый же месяц?».',
        '- **Список ядовитых сценариев**: Детально расписать 5 действий, которые приведут к полному банкротству или оттоку пользователей.',
        '- **Инвертированная защита**: Превратить каждый пункт катастрофы в строгое инженерное правило и барьер безопасности.',
      ],
      [
        '- **Catastrophic Failure Formulation**: Invert the prompt goal: "What actions would guarantee 100% catastrophic systemic failure?".',
        '- **Poison Scenario Catalog**: Enumerate 5 concrete operational paths that guarantee project death, budget exhaustion, or fatal user revolt.',
        '- **Inverted Defense Invariants**: Transform each identified failure vector into an ironclad preventative systemic constraint.',
      ]
    ),
  },

  'analogous-domain-pollination': {
    id: 'analogous-domain-pollination',
    name: 'AnalogousDomainPollinationSkill',
    displayName: 'Cross-Industry Analogous Domain Pollination',
    categoryId: 'ideation',
    description: 'Transfers battle-tested solutions from unrelated industries (e.g. Formula 1 pit stops to hospital ERs) to crack stagnant problems.',
    tags: ['ideation', 'cross-pollination', 'analogy', 'lateral-thinking', 'innovation', 'transfer-learning'],
    transform: createStandardSkillTransform(
      'protocol',
      'Межотраслевое Кросс-Опыление (Analogous Domain Transfer)',
      'Cross-Industry Analogous Domain Pollination Protocol',
      [
        '- **Абстракция корневой проблемы**: Описать вызов в терминах общих паттернов («высокоскоростная координация в условиях нехватки времени»).',
        '- **Поиск далекой аналогии**: Найти индустрию, где эта проблема является вопросом жизни и смерти (пит-стопы F1, авиадиспетчеры, пчелиный улей).',
        '- **Трансфер механики**: Адаптировать лучшие практики чужой индустрии к нашему целевому продукту.',
      ],
      [
        '- **Structural Problem Abstraction**: Frame the challenge as an abstract topology ("high-velocity multi-agent synchronization under packet loss").',
        '- **Distant Domain Extraction**: Identify an unrelated field where this exact challenge is mastered (Formula 1 pitstops, air traffic control, ant colonies).',
        '- **Tactical Mechanic Transfer**: Map the foreign domain\'s mechanisms directly into the target product architecture.',
      ]
    ),
  },

  'crazy-eights-timeboxed-sprint': {
    id: 'crazy-eights-timeboxed-sprint',
    name: 'CrazyEightsTimeboxedSprintSkill',
    displayName: 'Crazy Eights Rapid Divergence Sprint (Design Sprint)',
    categoryId: 'ideation',
    description: 'Generates 8 radically distinct concept variations in rapid succession to blast past the first obvious ideas.',
    tags: ['ideation', 'crazy-eights', 'design-sprint', 'divergence', 'brainstorming', 'rapid-prototyping'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спринт Радикальной Дивергенции Crazy Eights (8 Идей)',
      'Crazy Eights Rapid Divergence Concept Sprint Matrix',
      [
        '- **8 различных концепций**: Сгенерировать ровно 8 вариантов решения, каждый из которых кардинально отличается от остальных механикой.',
        '- **Запрет повторов**: Если идея 1 — мобильное приложение, идея 2 обязана быть офлайн-сервисом или аппаратным устройством.',
        '- **Краткая карточка концепта**: Для каждой из 8 идей указать: 1) Название, 2) Суть в 20 словах, 3) Главный безумный плюс.',
      ],
      [
        '- **8 Mutually Distinct Concepts**: Generate exactly 8 discrete paradigm solutions, forbidding minor iterative tweaks.',
        '- **Paradigm Divergence**: If Concept 1 is a cloud SaaS, Concept 2 must be an edge hardware dongle, Concept 3 an asynchronous protocol, etc.',
        '- **Concept Snapshot Cards**: Format each entry with: 1) Codename, 2) Core Mechanism (≤25 words), 3) Unfair Breakthrough Advantage.',
      ]
    ),
  },

  'triz-contradiction-matrix-solver': {
    id: 'triz-contradiction-matrix-solver',
    name: 'TrizContradictionMatrixSkill',
    displayName: 'TRIZ Inventive Principles & Contradiction Resolution',
    categoryId: 'ideation',
    description: 'Applies Genrich Altshuller\'s 40 TRIZ inventive principles to eliminate engineering contradictions without compromising trade-offs.',
    tags: ['ideation', 'triz', 'altshuller', 'contradiction', 'inventive-principles', 'engineering-innovation'],
    transform: createStandardSkillTransform(
      'protocol',
      'Разрешение Противоречий по ТРИЗ (40 Принципов Альтшуллера)',
      'TRIZ Inventive Principles & Contradiction Resolution Protocol',
      [
        '- **Формулировка противоречия**: Четко выделить конфликт параметров: «Улучшая параметр А (скорость), мы ухудшаем параметр Б (надежность)».',
        '- **Применение принципов ТРИЗ**: Использовать принципы: Дробление, Вынесение, Местное качество, Асимметрия, Принцип «матрешки», Предварительное действие.',
        '- **Идеальный Конечный Результат (ИКР)**: Система сама выполняет функцию без усложнения конструкции и дополнительных затрат.',
      ],
      [
        '- **Engineering Contradiction Formulation**: Explicitly isolate the friction pair: "Improving parameter X (throughput) degrades parameter Y (memory cap)".',
        '- **TRIZ Principle Activation**: Apply Altshuller principles: Segmentation, Extraction, Asymmetry, Nesting (Matryoshka), or Preliminary Action.',
        '- **Ideal Final Result (IFR)**: Design the target system so the function fulfills itself autonomously with zero added operational overhead.',
      ]
    ),
  },

  'blue-ocean-value-curve-canvas': {
    id: 'blue-ocean-value-curve-canvas',
    name: 'BlueOceanValueCurveSkill',
    displayName: 'Blue Ocean Strategy Value Curve & ERRC Grid',
    categoryId: 'ideation',
    description: 'Constructs uncontested market spaces using the Eliminate-Reduce-Raise-Create (ERRC) grid to redefine competitive value curves.',
    tags: ['ideation', 'blue-ocean', 'errc', 'strategy', 'value-innovation', 'competition'],
    transform: createStandardSkillTransform(
      'output_format',
      'Сетка ERRC и Кривая Ценности (Blue Ocean Strategy)',
      'Blue Ocean Value Curve & ERRC Grid Architecture',
      [
        '- **Eliminate (Устранить)**: Какие факторы, считающиеся отраслевым стандартом, нужно полностью ликвидировать?',
        '- **Reduce (Снизить)**: Какие характеристики можно снизить значительно ниже среднерыночных стандартов для снижения цены?',
        '- **Raise (Повысить)**: Какие параметры следует поднять намного выше существующих норм?',
        '- **Create (Создать)**: Какую принципиально новую ценность, ранее невиданную в индустрии, необходимо изобрести?',
      ],
      [
        '- **Eliminate Quadrant**: Itemize legacy industry assumptions that must be dropped entirely to destroy structural overhead.',
        '- **Reduce Quadrant**: Pinpoint features that can be reduced well below industry standards without degrading core utility.',
        '- **Raise Quadrant**: Identify dimensions that must be elevated substantially beyond competitor parity.',
        '- **Create Quadrant**: Synthesize entirely unprecedented value propositions opening up uncompetitive blue ocean market space.',
      ]
    ),
  },

  'worst-possible-idea-reverse-engineer': {
    id: 'worst-possible-idea-reverse-engineer',
    name: 'WorstPossibleIdeaSkill',
    displayName: 'Worst Possible Idea Reverse-Engineering',
    categoryId: 'ideation',
    description: 'Brainstorms absurdly terrible, catastrophic concepts to break cognitive blocks, then flips their hidden virtues into breakthroughs.',
    tags: ['ideation', 'worst-idea', 'reverse-engineering', 'creative-blocks', 'humor', 'lateral-thinking'],
    transform: createStandardSkillTransform(
      'protocol',
      'Метод Худшей Возможной Идеи (Reverse-Engineering Worst Ideas)',
      'Worst Possible Idea Inversion & Breakthrough Protocol',
      [
        '- **Генерация 3 ужасных идей**: Нарочито придумать 3 смехотворных, опасных или абсурдных решения проблемы.',
        '- **Поиск скрытого зерна**: В каждой нелепой идее найти скрытый плюс («Почему в безумном контексте это могло бы сработать?»).',
        '- **Трансформация в прорыв**: Перевернуть абсурдный механизм в практичное, инновационное решение реальной задачи.',
      ],
      [
        '- **Embrace Absurd Failure**: Intentionally author 3 hilariously terrible, dangerous, or unviable concepts.',
        '- **Hidden Virtue Extraction**: Isolate the latent operational upside hidden inside the absurdity ("What makes this uniquely powerful?").',
        '- **Inversion to Viable Innovation**: Pivot the transgressive mechanic into an elegant, unconventional production solution.',
      ]
    ),
  },

  'disney-creative-strategy-three-rooms': {
    id: 'disney-creative-strategy-three-rooms',
    name: 'DisneyCreativeStrategySkill',
    displayName: 'Walt Disney 3-Rooms Strategy (Dreamer/Realist/Critic)',
    categoryId: 'ideation',
    description: 'Sequences idea development through 3 distinct cognitive spaces: The Dreamer (pure vision), The Realist (action plan), The Critic (stress test).',
    tags: ['ideation', 'disney', 'dreamer', 'realist', 'critic', 'creativity-rooms'],
    transform: createStandardSkillTransform(
      'protocol',
      'Стратегия Трех Комнат Уолта Диснея (Dreamer / Realist / Critic)',
      'Walt Disney 3-Rooms Creative Architecture',
      [
        '- **Комната 1: Мечтатель (Dreamer)**: Полный полет фантазии без ограничений бюджета, физики и времени. Что было бы чудом?',
        '- **Комната 2: Реалист (Realist)**: Прагматичный инженерный план: как построить прототип этой мечты за 30 дней с текущими ресурсами?',
        '- **Комната 3: Критик (Critic)**: Беспощадный аудит рисков: где этот план даст трещину, чего не хватает и как защитить систему?',
      ],
      [
        '- **Room 1: The Dreamer**: Unconstrained visionary ideation untethered from budgets, physics, or deadlines. What would magical perfection be?',
        '- **Room 2: The Realist**: Pragmatic project management: How do we construct a functional MVP using existing team competencies in 30 days?',
        '- **Room 3: The Critic**: Ruthless structural risk audit: Where does this architecture fail, what did we overlook, and how do we patch leaks?',
      ]
    ),
  },

  'ten-types-of-innovation-doblin': {
    id: 'ten-types-of-innovation-doblin',
    name: 'TenTypesOfInnovationDoblinSkill',
    displayName: 'Doblin 10 Types of Innovation Framework',
    categoryId: 'ideation',
    description: 'Expands innovation beyond product features across Configuration (Profit Model, Network, Structure), Offering, and Experience.',
    tags: ['ideation', 'doblin', 'ten-types', 'innovation', 'business-model', 'systemic'],
    transform: createStandardSkillTransform(
      'protocol',
      '10 Типов Инноваций по Доблину (Larry Keeley Doblin Framework)',
      'Doblin 10 Types of Innovation Systemic Framework',
      [
        '- **Конфигурация (Configuration)**: Инновации в модели прибыли, партнерской сети, структуре компании и внутренних процессах.',
        '- **Продукт (Offering)**: Эффективность продукта и продуктовые экосистемные связки.',
        '- **Клиентский опыт (Experience)**: Сервис, каналы дистрибуции, бренд и вовлечение покупателей (Customer Engagement).',
      ],
      [
        '- **Configuration Dimension**: Innovate profit models, partner network choreography, organizational structure, and operational processes.',
        '- **Offering Dimension**: Differentiate product performance features and complementary product system architectures.',
        '- **Experience Dimension**: Pioneer service delivery, frictionless distribution channels, brand narrative, and customer engagement loops.',
      ]
    ),
  },

  'assumption-reversal-provocation': {
    id: 'assumption-reversal-provocation',
    name: 'AssumptionReversalProvocationSkill',
    displayName: 'Edward de Bono Assumption Reversal & PO Provocation',
    categoryId: 'ideation',
    description: 'Reverses bedrock industry assumptions using de Bono\'s PO (Provocative Operation) technique to stimulate lateral pathways.',
    tags: ['ideation', 'de-bono', 'provocation', 'assumption-reversal', 'lateral-thinking'],
    transform: createStandardSkillTransform(
      'protocol',
      'Провокационная Операция (PO) и Инверсия Допущений де Боно',
      'Edward de Bono Assumption Reversal & Provocation (PO) Protocol',
      [
        '- **Фиксация базового допущения**: «Рестораны подают готовую еду за деньги».',
        '- **Провокационная инверсия (PO)**: «PO: Ресторан не готовит еду, а клиенты платят за возможность готовить самим».',
        '- **Движение к практической идее**: Как превратить эту провокацию в прибыльный бизнес? (Кулинарные мастер-классы, коворкинг шеф-поваров).',
      ],
      [
        '- **Baseline Assumption Identification**: Formulate universal consensus assumption (e.g. "Software databases must store data permanently").',
        '- **Provocative Operation (PO) Reversal**: Force synthetic reversal ("PO: Databases forget data by default unless users pay to preserve it").',
        '- **Movement to Viable Architecture**: Use the provocative shockwave to architect a novel operational concept (ephemeral cache with decay TTLs).',
      ]
    ),
  },

  'biomimetic-nature-inspired-engine': {
    id: 'biomimetic-nature-inspired-engine',
    name: 'BiomimeticNatureInspiredEngineSkill',
    displayName: 'Biomimicry & Nature-Inspired Engineering',
    categoryId: 'ideation',
    description: 'Solves complex engineering challenges by reverse-engineering biological adaptation strategies developed over 3.8 billion years of evolution.',
    tags: ['ideation', 'biomimicry', 'nature-inspired', 'evolution', 'biology', 'sustainable-design'],
    transform: createStandardSkillTransform(
      'protocol',
      'Биомиметика: Инженерные Решения от Природы (Biomimicry)',
      'Biomimicry & Nature-Inspired Engineering Protocol',
      [
        '- **Функциональный запрос к природе**: Спросить «Как природа решает задачу рассеивания тепла / фильтрации / распределения нагрузки?».',
        '- **Биологический прототип**: Найти организм или экосистему-чемпиона (термитники, кожа акулы, сосудистая система листьев).',
        '- **Инженерная трансляция**: Перенести природный алгоритм или геометрию в код, архитектуру данных или физический дизайн.',
      ],
      [
        '- **Functional Question to Nature**: Frame systemic requirement: "How does nature optimize decentralized routing without a central coordinator?".',
        '- **Biological Champion Identification**: Study evolved organism solutions (slime mold transport networks, termite mound passive cooling).',
        '- **Biomimetic Translation**: Map biological morphology and chemical feedback loops into distributed software algorithms.',
      ]
    ),
  },

  'future-backward-scenario-backcasting': {
    id: 'future-backward-scenario-backcasting',
    name: 'FutureBackwardBackcastingSkill',
    displayName: 'Future-Backward Scenario Backcasting',
    categoryId: 'ideation',
    description: 'Envisions an audacious future state 10 years out, working backward step-by-step to identify prerequisites required today.',
    tags: ['ideation', 'backcasting', 'foresight', 'future', 'scenario-planning', 'strategy'],
    transform: createStandardSkillTransform(
      'protocol',
      'Бэккастинг: Планирование от Желаемого Будущего (Backcasting)',
      'Future-Backward Scenario Backcasting Architecture',
      [
        '- **Фиксация горизонта Т+10 лет**: Описать победный финальный мир, где проблема решена на 100%.',
        '- **Ретроспективные вехи (T-2, T-5, T-8)**: Двигаясь назад во времени, определить, какие прорывы должны были случиться за 2, 5 и 8 лет до этого.',
        '- **Действие в настоящем (T-0)**: Выделить критический первый шаг, который необходимо запустить уже на этой неделе.',
      ],
      [
        '- **Target Future Horizon (T+10 Years)**: Anchor a rich, fully realized description of the triumphant solved future state.',
        '- **Retrospective Stepping Milestones (T-2, T-5, T-8)**: Walk backward in time itemizing the indispensable systemic milestones required for that future.',
        '- **Immediate Present Trigger (T-0)**: Deduce the decisive foundational initiative that must be initiated in sprint one.',
      ]
    ),
  },

  'scamper-substitution-morphology': {
    id: 'scamper-substitution-morphology',
    name: 'ScamperSubstitutionMorphologySkill',
    displayName: 'SCAMPER Systemic Lateral Variation',
    categoryId: 'ideation',
    description: 'Systematically modifies existing solutions using SCAMPER: Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse.',
    tags: ['ideation', 'scamper', 'lateral-thinking', 'variation', 'creativity', 'morphology'],
    transform: createStandardSkillTransform(
      'protocol',
      'Трансформация Продукта по Методологии SCAMPER',
      'SCAMPER Systemic Lateral Variation Protocol',
      [
        '- **S - Substitute**: Заменить ключевой материал, протокол или зависимость на альтернативу.',
        '- **C - Combine**: Объединить два ранее изолированных сервиса в единый интерфейс.',
        '- **A - Adapt**: Адаптировать технологию из соседней ниши под наши задачи.',
        '- **M - Modify / Magnify**: Гипертрофировать главную фичу или сжать её до микросервиса.',
        '- **P - Put to another use**: Найти совершенно иную аудиторию для нашего побочного продукта.',
        '- **E - Eliminate**: Безжалостно удалить самый сложный компонент системы.',
        '- **R - Reverse**: Развернуть порядок действий или роли задом наперед.',
      ],
      [
        '- **S - Substitute**: Swap critical runtime dependencies, protocols, or storage backends for atypical alternatives.',
        '- **C - Combine**: Merge two previously disjoint subsystems into a unified single-pane interface.',
        '- **A - Adapt**: Borrow an established open-source protocol and repurpose it for internal communication.',
        '- **M - Modify/Magnify**: Scale one central feature by 10x while miniaturizing adjacent bloat.',
        '- **P - Put to Other Use**: Repurpose exhaust telemetry data as an external enterprise analytics product.',
        '- **E - Eliminate**: Strip out the most complex architectural component completely, testing system viability.',
        '- **R - Reverse**: Invert the chronological workflow or transactional direction between buyer and seller.',
      ]
    ),
  },

  'pre-mortem-catastrophe-anticipation': {
    id: 'pre-mortem-catastrophe-anticipation',
    name: 'PreMortemCatastropheAnticipationSkill',
    displayName: 'Gary Klein Pre-Mortem Prospective Hindsight',
    categoryId: 'ideation',
    description: 'Assumes the project has utterly failed 12 months in the future, prompting the team to write the comprehensive post-mortem history today.',
    tags: ['ideation', 'pre-mortem', 'gary-klein', 'risk', 'prospective-hindsight', 'failure-anticipation'],
    transform: createStandardSkillTransform(
      'protocol',
      'Пре-Мортем: Перспективный Взгляд Назад (Gary Klein Pre-Mortem)',
      'Gary Klein Pre-Mortem Prospective Hindsight Protocol',
      [
        '- **Вводная предпосылка**: «Представьте, что прошел год, и наш проект с треском провалился, принеся миллионные убытки. Напишите отчет, почему это случилось».',
        '- **Снятие социального давления**: Дать участникам легальное право говорить о любых скрытых сомнениях и слабостях команды.',
        '- **Рейтинг фатальности**: Отранжировать выявленные причины краха по вероятности и подготовить превентивные контрмеры.',
      ],
      [
        '- **Hypothetical Failure Mandate**: "Assume it is 12 months post-launch and the initiative has completely collapsed. Write the retrospective obituary".',
        '- **Psychological Safety Release**: License operators to voice suppressed skepticism and fragile team dependencies without reprisal.',
        '- **Fatality Scoring & Preemption**: Score brainstormed failure vectors by probability and severity, drafting active engineering immunizations today.',
      ]
    ),
  },

  'lateral-thinking-random-word-bridge': {
    id: 'lateral-thinking-random-word-bridge',
    name: 'LateralThinkingRandomWordSkill',
    displayName: 'Lateral Thinking Random Stimulus Bridge',
    categoryId: 'ideation',
    description: 'Introduces completely arbitrary random nouns/concepts, forcing associative bridges that unlock unconventional perspectives.',
    tags: ['ideation', 'random-word', 'lateral-thinking', 'de-bono', 'creative-bridge', 'associations'],
    transform: createStandardSkillTransform(
      'protocol',
      'Латеральный Мост Случайного Стимула (Random Word Bridge)',
      'Lateral Thinking Random Stimulus Bridge Protocol',
      [
        '- **Выбор случайного стимула**: Взять произвольное слово, не имеющее отношения к теме (напр. «Вулкан», «Скрипка», «Коралл»).',
        '- **Выделение свойств стимула**: Выписать 4 физических свойства этого объекта (высокая температура, струны под натяжением, кальциевый каркас).',
        '- **Наведение моста к проблеме**: Принудительно спроецировать эти свойства на решаемую задачу для нахождения оригинальных идей.',
      ],
      [
        '- **Arbitrary Stimulus Injection**: Introduce a random unrelated noun (e.g. "Volcano", "Violin", "Coral Reef").',
        '- **Attribute Extraction**: Enumerate 4 distinct physical and functional properties of the stimulus object.',
        '- **Forced Analogous Projection**: Force an associative bridge connecting those alien properties back into the target technical challenge.',
      ]
    ),
  },

  'divergent-convergent-double-diamond': {
    id: 'divergent-convergent-double-diamond',
    name: 'DoubleDiamondDesignCouncilSkill',
    displayName: 'British Design Council Double Diamond (Discover/Define/Develop/Deliver)',
    categoryId: 'ideation',
    description: 'Navigates the classic Double Diamond: Diverge on problem discovery, converge on definition, diverge on ideas, converge on delivery.',
    tags: ['ideation', 'double-diamond', 'design-council', 'divergent-convergent', 'discovery', 'design-thinking'],
    transform: createStandardSkillTransform(
      'protocol',
      'Фреймворк Двойного Алмаза (British Design Council Double Diamond)',
      'Double Diamond (Discover, Define, Develop, Deliver) Architecture',
      [
        '- **1. Discover (Дивергенция проблемы)**: Исследовать проблему широко, собирая данные и не бросаясь сразу к решениям.',
        '- **2. Define (Конвергенция проблемы)**: Сфокусироваться на единственной корневой проблеме (Problem Statement).',
        '- **3. Develop (Дивергенция решений)**: Набросать широкий спектр возможных архитектурных концепций.',
        '- **4. Deliver (Конвергенция решений)**: Отобрать и довести до продакшена одно самое жизнеспособное решение с тестами.',
      ],
      [
        '- **Diamond 1A (Discover)**: Diverge broadly investigating the problem landscape without rushing to hasty premature fixes.',
        '- **Diamond 1B (Define)**: Converge on a razor-sharp, evidence-backed problem statement bounding true systemic friction.',
        '- **Diamond 2A (Develop)**: Diverge broadly generating multiple architectural and interaction concepts.',
        '- **Diamond 2B (Deliver)**: Converge decisively on the single highest-scoring prototype, hardening it for production rollout.',
      ]
    ),
  },
  "triz-inventive-principles-engine": {
    id: "triz-inventive-principles-engine",
    name: "TrizInventivePrinciplesEngineSkill",
    displayName: "TRIZ Systematic Inventive Principles",
    categoryId: "ideation",
    description: "Applies Genrich Altshuller’s 40 TRIZ inventive principles and contradiction matrix to resolve technical and engineering bottlenecks.",
    tags: ["ideation","triz","inventive","engineering","contradiction-matrix"],
    transform: createStandardSkillTransform({
      sectionName: "TRIZ Inventive Principles Protocol",
      ruSectionName: "Протокол изобретательских принципов ТРИЗ",
      instructions: [
        "State the core engineering or product contradiction (Parameter A improves while Parameter B worsens).",
        "Select relevant TRIZ principles (Segmentation, Local Quality, Asymmetry, Inversion, Blessing in Disguise, Cushion in Advance).",
        "Formulate at least 3 concrete inventive implementations eliminating the trade-off entirely."
],
      ruInstructions: [
        "Сформулируйте ключевое противоречие (улучшение параметра А ухудшает параметр Б).",
        "Примените принципы ТРИЗ (дробление, местное качество, асимметрия, инверсия, обратить вред в пользу).",
        "Сформулируйте не менее 3 конкретных изобретательских решений без компромиссов."
],
      semanticType: 'protocol',
      tags: ["ideation","triz","inventive","engineering","contradiction-matrix"],
    }),
  },

  "biomimicry-nature-solution-mapper": {
    id: "biomimicry-nature-solution-mapper",
    name: "BiomimicryNatureSolutionMapperSkill",
    displayName: "Biomimicry & Nature-Inspired Architecture",
    categoryId: "ideation",
    description: "Transfers biological and evolutionary mechanisms to human engineering, software architectures, and product mechanics.",
    tags: ["ideation","biomimicry","nature-inspired","biology","systems"],
    transform: createStandardSkillTransform({
      sectionName: "Biomimetic Solution Mapping",
      ruSectionName: "Биомиметическое проектирование решений",
      instructions: [
        "Translate the design problem into a natural functional challenge (e.g., thermal dissipation, resilient routing).",
        "Identify 2-3 biological organisms or ecosystems evolved to solve this challenge.",
        "Abstract the biological mechanism into technical architecture principles."
],
      ruInstructions: [
        "Трансформируйте инженерную задачу в биологический вызов (терморегуляция, устойчивая маршрутизация).",
        "Приведите 2-3 природных организма или экосистемы, решающих этот вызов.",
        "Абстрагируйте биологический механизм в принципы архитектуры."
],
      semanticType: 'protocol',
      tags: ["ideation","biomimicry","nature-inspired","biology","systems"],
    }),
  },

  "first-principles-reduction-ideation": {
    id: "first-principles-reduction-ideation",
    name: "FirstPrinciplesReductionIdeationSkill",
    displayName: "First Principles Physical & Financial Reduction",
    categoryId: "ideation",
    description: "Strips away industry dogmas and conventions to reconstruct product concepts from atomic physics and fundamental cost limits.",
    tags: ["ideation","first-principles","musk-method","cost-curve","atomic-truth"],
    transform: createStandardSkillTransform({
      sectionName: "First Principles Decomposition",
      ruSectionName: "Декомпозиция от первых принципов",
      instructions: [
        "Identify all inherited industry assumptions, pricing standards, and technological dogmas.",
        "Deconstruct the problem to bedrock physical and mathematical truths.",
        "Reassemble an optimal solution purely from foundational elements."
],
      ruInstructions: [
        "Выявите унаследованные отраслевые догмы и шаблонные ценовые ожидания.",
        "Декомпозируйте проблему до фундаментальных физических и математических истин.",
        "Соберите заново оптимальное решение исключительно на базе элементарных составляющих."
],
      semanticType: 'protocol',
      tags: ["ideation","first-principles","musk-method","cost-curve","atomic-truth"],
    }),
  },

  "provocation-po-lateral-thinking": {
    id: "provocation-po-lateral-thinking",
    name: "ProvocationPoLateralThinkingSkill",
    displayName: "Lateral Thinking PO (Provocative Operation)",
    categoryId: "ideation",
    description: "Forces provocative, seemingly absurd assumptions (PO) to break mental ruts and stimulate lateral breakthroughs.",
    tags: ["ideation","lateral-thinking","de-bono","provocation","paradox"],
    transform: createStandardSkillTransform({
      sectionName: "Provocative Operation (PO) Protocol",
      ruSectionName: "Протокол латеральной провокации (PO)",
      instructions: [
        "Formulate a radical provocation starting with \"PO: [Absurd statement]\" (e.g., \"PO: cars have square wheels\").",
        "Extract movement principles: What new affordances, properties, or advantages does this absurdity highlight?",
        "Channel the movement into practical, innovative feature architectures."
],
      ruInstructions: [
        "Сформулируйте радикальную провокацию \"PO: [Абсурдное утверждение]\".",
        "Найдите точки движения: какие неожиданные свойства и скрытые плюсы вскрывает этот парадокс?",
        "Сконвертируйте находки в практические инновационные фичи."
],
      semanticType: "process_directive",
      tags: ["ideation","lateral-thinking","de-bono","provocation","paradox"],
    }),
  },

  "forced-analogous-domain-transfer": {
    id: "forced-analogous-domain-transfer",
    name: "ForcedAnalogousDomainTransferSkill",
    displayName: "Cross-Domain Analogous Mapping (Synectics)",
    categoryId: "ideation",
    description: "Cross-pollinates mechanics from completely unrelated industries (e.g. Formula 1 pitstops -> surgery, theme parks -> banking).",
    tags: ["ideation","synectics","cross-domain","analogy-mapping","transfer"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Domain Synectic Mapping",
      ruSectionName: "Кросс-доменный синектический перенос",
      instructions: [
        "Pick a distant, high-performance domain unrelated to the target problem.",
        "Map the source domain’s core operational verbs, rhythms, and failure preventions.",
        "Overlay these mechanisms onto the target domain to uncover novel interaction models."
],
      ruInstructions: [
        "Выберите далекую высокоэффективную отрасль, не связанную с задачей.",
        "Опишите ключевые глаголы, ритмы и защиту от сбоев в выбранной сфере.",
        "Перенесите эти механики на целевой продукт для создания прорывных решений."
],
      semanticType: 'protocol',
      tags: ["ideation","synectics","cross-domain","analogy-mapping","transfer"],
    }),
  },

  "disruptive-low-end-encroachment-ideator": {
    id: "disruptive-low-end-encroachment-ideator",
    name: "DisruptiveLowEndEncroachmentIdeatorSkill",
    displayName: "Christensen Low-End & New-Market Disruption",
    categoryId: "ideation",
    description: "Designs stripped-down, ultra-accessible solutions for overserved or non-consuming segments following Clayton Christensen disruption theory.",
    tags: ["ideation","disruption","christensen","low-end","innovators-dilemma"],
    transform: createStandardSkillTransform({
      sectionName: "Low-End Disruption Architecture",
      ruSectionName: "Архитектура низовой подрывной инновации",
      instructions: [
        "Identify overserved mainstream features that create bloat and cost friction.",
        "Specify a \"good enough\", 10x simpler and cheaper core offering for non-consumers.",
        "Plot the upward trajectory enabling eventual encroachment on incumbent tiers."
],
      ruInstructions: [
        "Определите избыточные функции рынка, создающие удорожание и сложность.",
        "Спроектируйте решение \"good enough\" — в 10 раз проще и доступнее для не охваченной аудитории.",
        "Спланируйте траекторию последующего масштабирования на смежные сегменты."
],
      semanticType: 'protocol',
      tags: ["ideation","disruption","christensen","low-end","innovators-dilemma"],
    }),
  },

  "anti-problem-inversion-divergence": {
    id: "anti-problem-inversion-divergence",
    name: "AntiProblemInversionDivergenceSkill",
    displayName: "Anti-Problem & Disaster Maximizer",
    categoryId: "ideation",
    description: "Systematically brainstorms how to guarantee maximum failure, catastrophe, and churn, then inverts every step into bulletproof innovation.",
    tags: ["ideation","inversion","anti-problem","charlie-munger","premortem"],
    transform: createStandardSkillTransform({
      sectionName: "Anti-Problem Inversion Architecture",
      ruSectionName: "Инверсия анти-проблемы и катастроф",
      instructions: [
        "Devise the most catastrophic, painful, and infuriating ways to fail the objective.",
        "Analyze why each anti-mechanism is so effective at creating disruption.",
        "Directly invert each catastrophic vector into an active, proactive design feature."
],
      ruInstructions: [
        "Придумайте самые разрушительные и гарантированные способы провалить цель.",
        "Проанализируйте механизм действия каждого деструктивного фактора.",
        "Инвертируйте каждый вектор в активную защитную или превосходную фичу."
],
      semanticType: "process_directive",
      tags: ["ideation","inversion","anti-problem","charlie-munger","premortem"],
    }),
  },

  "ten-x-moonshot-scale-multiplier": {
    id: "ten-x-moonshot-scale-multiplier",
    name: "TenXMoonshotScaleMultiplierSkill",
    displayName: "10x Moonshot Thinking & Scale Multiplier",
    categoryId: "ideation",
    description: "Forces 10x improvement constraints over 10% incremental steps, breaking linear process boundaries.",
    tags: ["ideation","10x","moonshot","exponential","scale"],
    transform: createStandardSkillTransform({
      sectionName: "10x Moonshot Ideation",
      ruSectionName: "10x Экспоненциальная генерация (Moonshot)",
      instructions: [
        "Reject all 10% optimizations as invalid.",
        "Frame the requirements assuming 100x traffic, 0 latency, or 10x cheaper delivery.",
        "Formulate step-function paradigms capable of fulfilling the 10x leap."
],
      ruInstructions: [
        "Отклоните любые 10% оптимизации как недопустимые.",
        "Сформулируйте требования при условии 100x нагрузки, 0 задержки или 10x удешевления.",
        "Сгенерируйте качественные сдвиги парадигмы для достижения 10x эффекта."
],
      semanticType: "process_directive",
      tags: ["ideation","10x","moonshot","exponential","scale"],
    }),
  },

  "unbundling-rebundling-value-chain": {
    id: "unbundling-rebundling-value-chain",
    name: "UnbundlingRebundlingValueChainSkill",
    displayName: "Value Chain Unbundling & Rebundling",
    categoryId: "ideation",
    description: "Identifies monolithic industry solutions, unbundles single high-affinity verticals, or bundles fragmented point solutions into unified suites.",
    tags: ["ideation","unbundling","rebundling","value-chain","business-architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Value Chain Unbundling / Rebundling",
      ruSectionName: "Анбандлинг и ребандлинг цепочки создания ценности",
      instructions: [
        "Diagram the monolithic platform’s feature map vs user willingness-to-pay.",
        "Unbundle the core 5% superpower feature into a dedicated, hyper-specialized vertical.",
        "Design complementary rebundled integrations creating switching barriers."
],
      ruInstructions: [
        "Составьте карту возможностей монолитного решения против готовности платить.",
        "Выделите (анбандлинг) ключевую 5% суперсилу в отдельный сверхузкий продукт.",
        "Спроектируйте модули для ребандлинга вокруг этой суперсилы."
],
      semanticType: 'protocol',
      tags: ["ideation","unbundling","rebundling","value-chain","business-architecture"],
    }),
  },

  "zero-interface-ambient-computing": {
    id: "zero-interface-ambient-computing",
    name: "ZeroInterfaceAmbientComputingSkill",
    displayName: "Zero-UI & Ambient Autonomous Interaction",
    categoryId: "ideation",
    description: "Generates product concepts where user interaction requires zero clicks, forms, or screens, operating purely through ambient inference.",
    tags: ["ideation","zero-ui","ambient","invisible-computing","proactive"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-UI Ambient Ideation",
      ruSectionName: "Генерация Zero-UI и фоновых взаимодействий",
      instructions: [
        "Eliminate every button, dropdown, and form input from the workflow.",
        "Replace manual inputs with contextual triggers (temporal, sensory, behavioral, predictive).",
        "Define non-intrusive ambient confirmation and fail-safe recovery patterns."
],
      ruInstructions: [
        "Устраните все кнопки, поля ввода и экраны из привычного пользовательского пути.",
        "Замените ручной ввод контекстными триггерами (время, сенсоры, поведение, предикты).",
        "Опишите ненавязчивые способы обратной связи и механизмы коррекции."
],
      semanticType: "process_directive",
      tags: ["ideation","zero-ui","ambient","invisible-computing","proactive"],
    }),
  },

  "extreme-user-persona-stress-testing": {
    id: "extreme-user-persona-stress-testing",
    name: "ExtremeUserPersonaStressTestingSkill",
    displayName: "Extreme User Constraints Ideation",
    categoryId: "ideation",
    description: "Derives universal innovations by designing exclusively for extreme boundary users (zero vision, 1000 tasks/hr, harsh environments).",
    tags: ["ideation","extreme-users","boundary-design","accessibility","stress-test"],
    transform: createStandardSkillTransform({
      sectionName: "Extreme User Boundary Ideation",
      ruSectionName: "Проектирование под экстремальных пользователей",
      instructions: [
        "Define extreme polar user profiles (e.g. novice with 3-second attention vs high-frequency trader with milliseconds latency).",
        "Solve the workflow strictly under extreme cognitive or physical constraints.",
        "Demonstrate how solving for extreme cases elevates the experience for mainstream users."
],
      ruInstructions: [
        "Опишите полярные профили пользователей (новичок с 3-секундным фокусом vs высокочастотный трейдер).",
        "Спроектируйте решение исключительно в рамках экстремальных ограничений.",
        "Покажите, как решение экстремального кейса улучшает опыт 99% обычной аудитории."
],
      semanticType: "process_directive",
      tags: ["ideation","extreme-users","boundary-design","accessibility","stress-test"],
    }),
  },

  "metaphorical-interface-transposition": {
    id: "metaphorical-interface-transposition",
    name: "MetaphoricalInterfaceTranspositionSkill",
    displayName: "Metaphorical Skeuomorphic & Cognitive Transposition",
    categoryId: "ideation",
    description: "Transposes rich real-world physical interfaces (audio mixers, air traffic control, cockpit dials) into digital workflows.",
    tags: ["ideation","metaphor","skeuomorphism","spatial-mental-model","ux-ideation"],
    transform: createStandardSkillTransform({
      sectionName: "Metaphorical Interface Transposition",
      ruSectionName: "Метафорический перенос интерфейсных моделей",
      instructions: [
        "Identify the real-world tool with the highest cognitive alignment to the problem.",
        "Map physical affordances (sliders, knobs, tactile feedback, spatial layouts) to digital state changes.",
        "Evaluate cognitive load reduction achieved via familiar mental models."
],
      ruInstructions: [
        "Найдите физический инструмент с максимальным сходством логики управления.",
        "Сопоставьте физические элементы (фейдеры, тумблеры, индикаторы) с цифровыми состояниями.",
        "Оцените снижение когнитивной нагрузки за счет готовых ментальных моделей."
],
      semanticType: "process_directive",
      tags: ["ideation","metaphor","skeuomorphism","spatial-mental-model","ux-ideation"],
    }),
  },

  "gamified-core-loop-mechanics-ideator": {
    id: "gamified-core-loop-mechanics-ideator",
    name: "GamifiedCoreLoopMechanicsIdeatorSkill",
    displayName: "Game Core Loop & Octalysis Motivation Engine",
    categoryId: "ideation",
    description: "Injects intrinsic behavioral drivers (Epic Meaning, Empowerment, Social Influence, Scarcity) into utility workflows.",
    tags: ["ideation","gamification","octalysis","core-loop","retention"],
    transform: createStandardSkillTransform({
      sectionName: "Gamified Behavioral Mechanics",
      ruSectionName: "Геймифицированные поведенческие механики (Octalysis)",
      instructions: [
        "Define the primary virtuous loop (Trigger -> Action -> Variable Reward -> Investment).",
        "Apply Yu-kai Chou Octalysis drives (White Hat meaning vs Black Hat urgency).",
        "Ensure gamification amplifies genuine user mastery without superficial badge spam."
],
      ruInstructions: [
        "Определите продуктовый цикл (триггер -> действие -> переменная награда -> инвестиция).",
        "Интегрируйте драйверы по модели Octalysis (смысл, автономия, дефицит, социальное признание).",
        "Убедитесь, что геймификация развивает мастерство, а не сводится к бессмысленным бейджам."
],
      semanticType: 'protocol',
      tags: ["ideation","gamification","octalysis","core-loop","retention"],
    }),
  },

  "counter-intuitive-pricing-model-ideator": {
    id: "counter-intuitive-pricing-model-ideator",
    name: "CounterIntuitivePricingModelIdeatorSkill",
    displayName: "Counter-Intuitive & Outcome-Based Monetization",
    categoryId: "ideation",
    description: "Designs novel monetization models (reverse auctions, shared upside, carbon/compute offsets, pay-for-outcomes).",
    tags: ["ideation","monetization","pricing-strategy","outcome-based","business-model"],
    transform: createStandardSkillTransform({
      sectionName: "Monetization Architecture Ideation",
      ruSectionName: "Генерация инновационных моделей монетизации",
      instructions: [
        "Reject standard flat SaaS seat licenses.",
        "Propose 3 aligned monetization mechanisms tied directly to customer value realization (e.g. % of savings, compute credits, insurance margin).",
        "Model incentive alignment and adverse selection mitigations."
],
      ruInstructions: [
        "Откажитесь от классической фиксированной подписки за пользователя.",
        "Предложите 3 модели, привязанные к реальному успеху клиента (% экономии, результат, квоты).",
        "Опишите выравнивание стимулов и защиту от недобросовестного использования."
],
      semanticType: 'protocol',
      tags: ["ideation","monetization","pricing-strategy","outcome-based","business-model"],
    }),
  },

  "regulatory-arbitrage-sandbox-ideator": {
    id: "regulatory-arbitrage-sandbox-ideator",
    name: "RegulatoryArbitrageSandboxIdeatorSkill",
    displayName: "Regulatory Shift & Compliance Arbitrage Ideation",
    categoryId: "ideation",
    description: "Identifies emerging global regulatory mandates (AI Act, GDPR, CSRD, Basel IV) as foundational business opportunities.",
    tags: ["ideation","regulatory-arbitrage","compliance","legaltech","policy-shift"],
    transform: createStandardSkillTransform({
      sectionName: "Regulatory Shift Innovation Mapping",
      ruSectionName: "Инновации на регуляторных сдвигах и комплаенсе",
      instructions: [
        "Pinpoint an incoming compliance obligation that creates operational friction.",
        "Turn the compliance burden into an automated competitive asset.",
        "Architect the product to turn mandatory reporting into revenue growth."
],
      ruInstructions: [
        "Выявите вступающие в силу регуляторные требования, создающие проблемы рынку.",
        "Превратите необходимость комплаенса в автоматизированное конкурентное преимущество.",
        "Сделайте обязательную отчетность источником операционной оптимизации для клиента."
],
      semanticType: 'protocol',
      tags: ["ideation","regulatory-arbitrage","compliance","legaltech","policy-shift"],
    }),
  },

  "asymmetric-collaboration-topology": {
    id: "asymmetric-collaboration-topology",
    name: "AsymmetricCollaborationTopologySkill",
    displayName: "Asymmetric Multi-Player Collaboration Topologies",
    categoryId: "ideation",
    description: "Ideates collaboration workflows with unbalanced roles (Director vs Worker, Client vs Agency, Expert vs Crowd).",
    tags: ["ideation","collaboration","multiplayer","asymmetric","workflow"],
    transform: createStandardSkillTransform({
      sectionName: "Asymmetric Collaboration Topology",
      ruSectionName: "Асимметричные многопользовательские топологии",
      instructions: [
        "Map distinct stakeholder authority, visibility, and latency requirements.",
        "Design tailored views and permissions that remove coordination overhead.",
        "Introduce asynchronous approvals, escrow checkpoints, and real-time co-authoring."
],
      ruInstructions: [
        "Опишите роли с разными правами, уровнем видимости и временем отклика.",
        "Спроектируйте специализированные интерфейсы для каждой роли без лишнего шума.",
        "Внедрите асинхронные согласования, контрольные точки и совместное редактирование."
],
      semanticType: "process_directive",
      tags: ["ideation","collaboration","multiplayer","asymmetric","workflow"],
    }),
  },

  "future-back-scenario-forecasting": {
    id: "future-back-scenario-forecasting",
    name: "FutureBackScenarioForecastingSkill",
    displayName: "Future-Back Horizon & Sci-Fi Backcasting",
    categoryId: "ideation",
    description: "Plants a flag 10 years into an extreme future scenario, working backward step-by-step to identify the immediate missing links.",
    tags: ["ideation","future-back","backcasting","foresight","strategic-planning"],
    transform: createStandardSkillTransform({
      sectionName: "Future-Back Strategic Backcasting",
      ruSectionName: "Стратегический бэккастинг из будущего (Future-Back)",
      instructions: [
        "Describe a future state where key current constraints are completely eradicated.",
        "Identify what foundational primitives, protocols, and developer tools must precede this future.",
        "Derive the MVP that can be built today as the foundational wedge."
],
      ruInstructions: [
        "Опишите целевое будущее через 10 лет, где текущие барьеры полностью сняты.",
        "Определите примитивы, стандарты и протоколы, которые должны возникнуть первыми.",
        "Сформулируйте первый шаг и MVP, который можно создавать уже сегодня."
],
      semanticType: 'protocol',
      tags: ["ideation","future-back","backcasting","foresight","strategic-planning"],
    }),
  },

  "crowdsourced-data-flywheel-designer": {
    id: "crowdsourced-data-flywheel-designer",
    name: "CrowdsourcedDataFlywheelDesignerSkill",
    displayName: "Crowdsourced Data Flywheel & UGC Network Effects",
    categoryId: "ideation",
    description: "Engineers self-reinforcing data loops where every user interaction refines models and creates compounding moat value.",
    tags: ["ideation","data-flywheel","network-effects","ugc","moat"],
    transform: createStandardSkillTransform({
      sectionName: "Data Flywheel Architecture",
      ruSectionName: "Архитектура данных маховика (Data Flywheel)",
      instructions: [
        "Identify valuable side-effect data generated during organic user workflows.",
        "Design mechanisms to automatically clean, label, and aggregate this data.",
        "Feed aggregated intelligence back into the product to deliver 10x personalization."
],
      ruInstructions: [
        "Определите ценные побочные данные, возникающие при обычной работе пользователя.",
        "Спроектируйте алгоритм автоматической очистки, разметки и агрегации этих данных.",
        "Верните агрегированную пользу в продукт для улучшения точности и персонализации."
],
      semanticType: 'protocol',
      tags: ["ideation","data-flywheel","network-effects","ugc","moat"],
    }),
  },

  "waste-to-resource-byproduct-monetization": {
    id: "waste-to-resource-byproduct-monetization",
    name: "WasteToResourceByproductMonetizationSkill",
    displayName: "Byproduct & Exhaust Data Monetization",
    categoryId: "ideation",
    description: "Identifies hidden operational exhaust (telemetry, idle compute, logistics margins) and repurposes it as a prime B2B offering.",
    tags: ["ideation","byproduct","circular-economy","exhaust-data","monetization"],
    transform: createStandardSkillTransform({
      sectionName: "Byproduct Resource Monetization",
      ruSectionName: "Монетизация побочных продуктов и цифрового следа",
      instructions: [
        "Audit internal exhaust data, idle capacity, and operational waste.",
        "Identify external industries where this exhaust represents high-value primary intelligence.",
        "Package raw exhaust into clean APIs or benchmark indices."
],
      ruInstructions: [
        "Проведите аудит побочных данных, простаивающих ресурсов и инфраструктурного следа.",
        "Найдите смежные рынки, для которых эти данные представляют стратегическую ценность.",
        "Упакуйте побочные данные в чистые API или аналитические индексы."
],
      semanticType: 'protocol',
      tags: ["ideation","byproduct","circular-economy","exhaust-data","monetization"],
    }),
  },

  "plug-and-play-ecosystem-composable-ideator": {
    id: "plug-and-play-ecosystem-composable-ideator",
    name: "PlugAndPlayEcosystemComposableIdeatorSkill",
    displayName: "Composable Ecosystem & Marketplace Primitives",
    categoryId: "ideation",
    description: "Transforms standalone software into an extensible platform featuring third-party plugins, revenue sharing, and open schemas.",
    tags: ["ideation","platform-ecosystem","composability","marketplace","api-economy"],
    transform: createStandardSkillTransform({
      sectionName: "Composable Ecosystem Primitives",
      ruSectionName: "Примитивы компонуемой экосистемы и маркетплейса",
      instructions: [
        "Define core unopinionated primitives and extension hook points.",
        "Design the developer experience, sandbox SDK, and revenue-sharing logic for third-party builders.",
        "Plan curation and verification mechanisms to maintain high ecosystem quality."
],
      ruInstructions: [
        "Определите базовые расширяемые примитивы и точки подключения хуков.",
        "Спроектируйте DX, SDK песочницы и систему разделения выручки для разработчиков.",
        "Опишите механизмы верификации и каталогизации для контроля качества экосистемы."
],
      semanticType: 'protocol',
      tags: ["ideation","platform-ecosystem","composability","marketplace","api-economy"],
    }),
  },
};
