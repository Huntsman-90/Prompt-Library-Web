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
  "ideation-scamper-creative-transformation-operator": {
    id: "ideation-scamper-creative-transformation-operator",
    name: "SCAMPERCreativeTransformationOperatorSkill",
    displayName: "SCAMPER Creative Transformation Operator",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for SCAMPER Creative Transformation Operator.",
    tags: ["ideation","scamper","creative","transformation"],
    transform: createStandardSkillTransform({
      sectionName: "SCAMPER Transformation Standards",
      ruSectionName: "Стандарты и практические требования: SCAMPER Creative Transformation Operator",
      instructions: [
        "Apply core domain tenets and industry best practices for SCAMPER Creative Transformation Operator.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для SCAMPER Creative Transformation Operator.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","scamper","creative","transformation"],
    }),
  },

  "ideation-lateral-thinking-random-stimulus-association": {
    id: "ideation-lateral-thinking-random-stimulus-association",
    name: "LateralThinkingRandomStimulusAssociationSkill",
    displayName: "Lateral Thinking Random Stimulus Association",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Lateral Thinking Random Stimulus Association.",
    tags: ["ideation","lateral","thinking","random"],
    transform: createStandardSkillTransform({
      sectionName: "Lateral Thinking Protocol",
      ruSectionName: "Стандарты и практические требования: Lateral Thinking Random Stimulus Association",
      instructions: [
        "Apply core domain tenets and industry best practices for Lateral Thinking Random Stimulus Association.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Lateral Thinking Random Stimulus Association.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","lateral","thinking","random"],
    }),
  },

  "ideation-crazy-eights-rapid-solution-sketching": {
    id: "ideation-crazy-eights-rapid-solution-sketching",
    name: "CrazyEightsRapidSolutionSketchingSkill",
    displayName: "Crazy Eights Rapid Solution Sketching",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Crazy Eights Rapid Solution Sketching.",
    tags: ["ideation","crazy","eights","rapid"],
    transform: createStandardSkillTransform({
      sectionName: "Crazy Eights Rapid Ideation",
      ruSectionName: "Стандарты и практические требования: Crazy Eights Rapid Solution Sketching",
      instructions: [
        "Apply core domain tenets and industry best practices for Crazy Eights Rapid Solution Sketching.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Crazy Eights Rapid Solution Sketching.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","crazy","eights","rapid"],
    }),
  },

  "ideation-six-thinking-hats-multi-perspective-rotation": {
    id: "ideation-six-thinking-hats-multi-perspective-rotation",
    name: "SixThinkingHatsMultiPerspectiveRotationSkill",
    displayName: "Six Thinking Hats Multi-Perspective Rotation",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Six Thinking Hats Multi-Perspective Rotation.",
    tags: ["ideation","six","thinking","hats"],
    transform: createStandardSkillTransform({
      sectionName: "Six Thinking Hats Protocol",
      ruSectionName: "Стандарты и практические требования: Six Thinking Hats Multi-Perspective Rotation",
      instructions: [
        "Apply core domain tenets and industry best practices for Six Thinking Hats Multi-Perspective Rotation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Six Thinking Hats Multi-Perspective Rotation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","six","thinking","hats"],
    }),
  },

  "ideation-worst-possible-idea-reverse-brainstorming": {
    id: "ideation-worst-possible-idea-reverse-brainstorming",
    name: "WorstPossibleIdeaReverseBrainstormingSkill",
    displayName: "Worst Possible Idea Reverse Brainstorming",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Worst Possible Idea Reverse Brainstorming.",
    tags: ["ideation","worst","possible","idea"],
    transform: createStandardSkillTransform({
      sectionName: "Reverse Brainstorming Framework",
      ruSectionName: "Стандарты и практические требования: Worst Possible Idea Reverse Brainstorming",
      instructions: [
        "Apply core domain tenets and industry best practices for Worst Possible Idea Reverse Brainstorming.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Worst Possible Idea Reverse Brainstorming.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","worst","possible","idea"],
    }),
  },

  "ideation-biomimicry-nature-inspired-innovation": {
    id: "ideation-biomimicry-nature-inspired-innovation",
    name: "BiomimicryNatureInspiredInnovationSkill",
    displayName: "Biomimicry Nature-Inspired Innovation",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Biomimicry Nature-Inspired Innovation.",
    tags: ["ideation","biomimicry","nature","inspired"],
    transform: createStandardSkillTransform({
      sectionName: "Biomimicry Innovation Protocol",
      ruSectionName: "Стандарты и практические требования: Biomimicry Nature-Inspired Innovation",
      instructions: [
        "Apply core domain tenets and industry best practices for Biomimicry Nature-Inspired Innovation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Biomimicry Nature-Inspired Innovation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","biomimicry","nature","inspired"],
    }),
  },

  "ideation-morphological-analysis-attribute-matrix": {
    id: "ideation-morphological-analysis-attribute-matrix",
    name: "MorphologicalAnalysisAttributeMatrixSkill",
    displayName: "Morphological Analysis Attribute Matrix",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Morphological Analysis Attribute Matrix.",
    tags: ["ideation","morphological","analysis","attribute"],
    transform: createStandardSkillTransform({
      sectionName: "Morphological Matrix Blueprint",
      ruSectionName: "Стандарты и практические требования: Morphological Analysis Attribute Matrix",
      instructions: [
        "Apply core domain tenets and industry best practices for Morphological Analysis Attribute Matrix.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Morphological Analysis Attribute Matrix.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","morphological","analysis","attribute"],
    }),
  },

  "ideation-first-principles-deconstructive-synthesis": {
    id: "ideation-first-principles-deconstructive-synthesis",
    name: "FirstPrinciplesDeconstructiveSynthesisSkill",
    displayName: "First Principles Deconstructive Synthesis",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for First Principles Deconstructive Synthesis.",
    tags: ["ideation","first","principles","deconstructive"],
    transform: createStandardSkillTransform({
      sectionName: "First Principles Ideation Standards",
      ruSectionName: "Стандарты и практические требования: First Principles Deconstructive Synthesis",
      instructions: [
        "Apply core domain tenets and industry best practices for First Principles Deconstructive Synthesis.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для First Principles Deconstructive Synthesis.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","first","principles","deconstructive"],
    }),
  },

  "ideation-analogical-transfer-cross-domain-synthesis": {
    id: "ideation-analogical-transfer-cross-domain-synthesis",
    name: "AnalogicalTransferCrossDomainSynthesisSkill",
    displayName: "Analogical Transfer Cross-Domain Synthesis",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Analogical Transfer Cross-Domain Synthesis.",
    tags: ["ideation","analogical","transfer","cross"],
    transform: createStandardSkillTransform({
      sectionName: "Analogical Cross-Domain Protocol",
      ruSectionName: "Стандарты и практические требования: Analogical Transfer Cross-Domain Synthesis",
      instructions: [
        "Apply core domain tenets and industry best practices for Analogical Transfer Cross-Domain Synthesis.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Analogical Transfer Cross-Domain Synthesis.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","analogical","transfer","cross"],
    }),
  },

  "ideation-future-backcasting-long-term-trajectory": {
    id: "ideation-future-backcasting-long-term-trajectory",
    name: "FutureBackcastingLongTermTrajectorySkill",
    displayName: "Future Backcasting Long-Term Trajectory",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Future Backcasting Long-Term Trajectory.",
    tags: ["ideation","future","backcasting","long"],
    transform: createStandardSkillTransform({
      sectionName: "Backcasting Trajectory Framework",
      ruSectionName: "Стандарты и практические требования: Future Backcasting Long-Term Trajectory",
      instructions: [
        "Apply core domain tenets and industry best practices for Future Backcasting Long-Term Trajectory.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Future Backcasting Long-Term Trajectory.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","future","backcasting","long"],
    }),
  },

  "ideation-10x-moonshot-thinking-extreme-scale": {
    id: "ideation-10x-moonshot-thinking-extreme-scale",
    name: "10xMoonshotThinkingExtremeScaleSkill",
    displayName: "10x Moonshot Thinking & Extreme Scale",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for 10x Moonshot Thinking & Extreme Scale.",
    tags: ["ideation","10x","moonshot","thinking"],
    transform: createStandardSkillTransform({
      sectionName: "10x Moonshot Ideation Blueprint",
      ruSectionName: "Стандарты и практические требования: 10x Moonshot Thinking & Extreme Scale",
      instructions: [
        "Apply core domain tenets and industry best practices for 10x Moonshot Thinking & Extreme Scale.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для 10x Moonshot Thinking & Extreme Scale.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","10x","moonshot","thinking"],
    }),
  },

  "ideation-value-proposition-canvas-pain-reliever-grid": {
    id: "ideation-value-proposition-canvas-pain-reliever-grid",
    name: "ValuePropositionCanvasPainRelieverGridSkill",
    displayName: "Value Proposition Canvas Pain-Reliever Grid",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Value Proposition Canvas Pain-Reliever Grid.",
    tags: ["ideation","value","proposition","canvas"],
    transform: createStandardSkillTransform({
      sectionName: "Value Proposition Mapping Standards",
      ruSectionName: "Стандарты и практические требования: Value Proposition Canvas Pain-Reliever Grid",
      instructions: [
        "Apply core domain tenets and industry best practices for Value Proposition Canvas Pain-Reliever Grid.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Value Proposition Canvas Pain-Reliever Grid.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","value","proposition","canvas"],
    }),
  },

  "ideation-triz-40-inventive-principles-matrix": {
    id: "ideation-triz-40-inventive-principles-matrix",
    name: "TRIZ40InventivePrinciplesMatrixSkill",
    displayName: "TRIZ 40 Inventive Principles Matrix",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for TRIZ 40 Inventive Principles Matrix.",
    tags: ["ideation","triz","40","inventive"],
    transform: createStandardSkillTransform({
      sectionName: "TRIZ Inventive Principles Protocol",
      ruSectionName: "Стандарты и практические требования: TRIZ 40 Inventive Principles Matrix",
      instructions: [
        "Apply core domain tenets and industry best practices for TRIZ 40 Inventive Principles Matrix.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для TRIZ 40 Inventive Principles Matrix.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","triz","40","inventive"],
    }),
  },

  "ideation-disruptive-opportunity-matrix-exploration": {
    id: "ideation-disruptive-opportunity-matrix-exploration",
    name: "DisruptiveOpportunityMatrixExplorationSkill",
    displayName: "Disruptive Opportunity Matrix Exploration",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Disruptive Opportunity Matrix Exploration.",
    tags: ["ideation","disruptive","opportunity","matrix"],
    transform: createStandardSkillTransform({
      sectionName: "Disruptive Matrix Standards",
      ruSectionName: "Стандарты и практические требования: Disruptive Opportunity Matrix Exploration",
      instructions: [
        "Apply core domain tenets and industry best practices for Disruptive Opportunity Matrix Exploration.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Disruptive Opportunity Matrix Exploration.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","disruptive","opportunity","matrix"],
    }),
  },

  "ideation-crazy-mashup-unrelated-domain-collision": {
    id: "ideation-crazy-mashup-unrelated-domain-collision",
    name: "CrazyMashupUnrelatedDomainCollisionSkill",
    displayName: "Crazy Mashup Unrelated Domain Collision",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Crazy Mashup Unrelated Domain Collision.",
    tags: ["ideation","crazy","mashup","unrelated"],
    transform: createStandardSkillTransform({
      sectionName: "Crazy Mashup Collision Protocol",
      ruSectionName: "Стандарты и практические требования: Crazy Mashup Unrelated Domain Collision",
      instructions: [
        "Apply core domain tenets and industry best practices for Crazy Mashup Unrelated Domain Collision.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Crazy Mashup Unrelated Domain Collision.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","crazy","mashup","unrelated"],
    }),
  },

  "ideation-opposable-mind-integrative-thinking": {
    id: "ideation-opposable-mind-integrative-thinking",
    name: "OpposableMindIntegrativeThinkingSkill",
    displayName: "Opposable Mind Integrative Thinking",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Opposable Mind Integrative Thinking.",
    tags: ["ideation","opposable","mind","integrative"],
    transform: createStandardSkillTransform({
      sectionName: "Integrative Thinking Framework",
      ruSectionName: "Стандарты и практические требования: Opposable Mind Integrative Thinking",
      instructions: [
        "Apply core domain tenets and industry best practices for Opposable Mind Integrative Thinking.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Opposable Mind Integrative Thinking.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","opposable","mind","integrative"],
    }),
  },

  "ideation-customer-journey-bottleneck-inversion": {
    id: "ideation-customer-journey-bottleneck-inversion",
    name: "CustomerJourneyBottleneckInversionSkill",
    displayName: "Customer Journey Bottleneck Inversion",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Customer Journey Bottleneck Inversion.",
    tags: ["ideation","customer","journey","bottleneck"],
    transform: createStandardSkillTransform({
      sectionName: "Journey Inversion Ideation Protocol",
      ruSectionName: "Стандарты и практические требования: Customer Journey Bottleneck Inversion",
      instructions: [
        "Apply core domain tenets and industry best practices for Customer Journey Bottleneck Inversion.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Customer Journey Bottleneck Inversion.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","customer","journey","bottleneck"],
    }),
  },

  "ideation-constraint-induced-radical-creativity": {
    id: "ideation-constraint-induced-radical-creativity",
    name: "ConstraintInducedRadicalCreativitySkill",
    displayName: "Constraint-Induced Radical Creativity",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Constraint-Induced Radical Creativity.",
    tags: ["ideation","constraint","induced","radical"],
    transform: createStandardSkillTransform({
      sectionName: "Constraint-Induced Innovation Rules",
      ruSectionName: "Стандарты и практические требования: Constraint-Induced Radical Creativity",
      instructions: [
        "Apply core domain tenets and industry best practices for Constraint-Induced Radical Creativity.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Constraint-Induced Radical Creativity.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","constraint","induced","radical"],
    }),
  },

  "ideation-assumption-smashing-orthodox-challenge": {
    id: "ideation-assumption-smashing-orthodox-challenge",
    name: "AssumptionSmashingOrthodoxChallengeSkill",
    displayName: "Assumption Smashing Orthodox Challenge",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Assumption Smashing Orthodox Challenge.",
    tags: ["ideation","assumption","smashing","orthodox"],
    transform: createStandardSkillTransform({
      sectionName: "Assumption Smashing Framework",
      ruSectionName: "Стандарты и практические требования: Assumption Smashing Orthodox Challenge",
      instructions: [
        "Apply core domain tenets and industry best practices for Assumption Smashing Orthodox Challenge.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Assumption Smashing Orthodox Challenge.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","assumption","smashing","orthodox"],
    }),
  },

  "ideation-trend-collision-exponential-synthesis": {
    id: "ideation-trend-collision-exponential-synthesis",
    name: "TrendCollisionExponentialSynthesisSkill",
    displayName: "Trend Collision Exponential Synthesis",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Trend Collision Exponential Synthesis.",
    tags: ["ideation","trend","collision","exponential"],
    transform: createStandardSkillTransform({
      sectionName: "Trend Collision Synthesis Standards",
      ruSectionName: "Стандарты и практические требования: Trend Collision Exponential Synthesis",
      instructions: [
        "Apply core domain tenets and industry best practices for Trend Collision Exponential Synthesis.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Trend Collision Exponential Synthesis.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","trend","collision","exponential"],
    }),
  },

  "ideation-science-fiction-prototyping-worldbuilding": {
    id: "ideation-science-fiction-prototyping-worldbuilding",
    name: "ScienceFictionPrototypingWorldbuildingSkill",
    displayName: "Science Fiction Prototyping Worldbuilding",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Science Fiction Prototyping Worldbuilding.",
    tags: ["ideation","science","fiction","prototyping"],
    transform: createStandardSkillTransform({
      sectionName: "Sci-Fi Prototyping Protocol",
      ruSectionName: "Стандарты и практические требования: Science Fiction Prototyping Worldbuilding",
      instructions: [
        "Apply core domain tenets and industry best practices for Science Fiction Prototyping Worldbuilding.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Science Fiction Prototyping Worldbuilding.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","science","fiction","prototyping"],
    }),
  },

  "ideation-anti-problem-solving-dark-mode-brainstorm": {
    id: "ideation-anti-problem-solving-dark-mode-brainstorm",
    name: "AntiProblemSolvingDarkModeBrainstormSkill",
    displayName: "Anti-Problem Solving Dark Mode Brainstorm",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Anti-Problem Solving Dark Mode Brainstorm.",
    tags: ["ideation","anti","problem","solving"],
    transform: createStandardSkillTransform({
      sectionName: "Anti-Problem Inversion Standards",
      ruSectionName: "Стандарты и практические требования: Anti-Problem Solving Dark Mode Brainstorm",
      instructions: [
        "Apply core domain tenets and industry best practices for Anti-Problem Solving Dark Mode Brainstorm.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Anti-Problem Solving Dark Mode Brainstorm.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","anti","problem","solving"],
    }),
  },

  "ideation-design-thinking-empathize-define-loop": {
    id: "ideation-design-thinking-empathize-define-loop",
    name: "DesignThinkingEmpathizeDefineLoopSkill",
    displayName: "Design Thinking Empathize-Define Loop",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Design Thinking Empathize-Define Loop.",
    tags: ["ideation","design","thinking","empathize"],
    transform: createStandardSkillTransform({
      sectionName: "Design Thinking Empathy Blueprint",
      ruSectionName: "Стандарты и практические требования: Design Thinking Empathize-Define Loop",
      instructions: [
        "Apply core domain tenets and industry best practices for Design Thinking Empathize-Define Loop.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Design Thinking Empathize-Define Loop.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","design","thinking","empathize"],
    }),
  },

  "ideation-blue-sky-unbounded-scenario-sandbox": {
    id: "ideation-blue-sky-unbounded-scenario-sandbox",
    name: "BlueSkyUnboundedScenarioSandboxSkill",
    displayName: "Blue Sky Unbounded Scenario Sandbox",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Blue Sky Unbounded Scenario Sandbox.",
    tags: ["ideation","blue","sky","unbounded"],
    transform: createStandardSkillTransform({
      sectionName: "Blue Sky Sandbox Protocol",
      ruSectionName: "Стандарты и практические требования: Blue Sky Unbounded Scenario Sandbox",
      instructions: [
        "Apply core domain tenets and industry best practices for Blue Sky Unbounded Scenario Sandbox.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Blue Sky Unbounded Scenario Sandbox.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","blue","sky","unbounded"],
    }),
  },

  "ideation-rapid-prototyping-paper-concept-mock": {
    id: "ideation-rapid-prototyping-paper-concept-mock",
    name: "RapidPrototypingPaperConceptMockSkill",
    displayName: "Rapid Prototyping Paper Concept Mock",
    categoryId: "ideation",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Rapid Prototyping Paper Concept Mock.",
    tags: ["ideation","rapid","prototyping","paper"],
    transform: createStandardSkillTransform({
      sectionName: "Rapid Concept Mocking Standards",
      ruSectionName: "Стандарты и практические требования: Rapid Prototyping Paper Concept Mock",
      instructions: [
        "Apply core domain tenets and industry best practices for Rapid Prototyping Paper Concept Mock.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Rapid Prototyping Paper Concept Mock.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["ideation","rapid","prototyping","paper"],
    }),
  },
  "ideation-biomimicry-nature-inspired-product-innovation": {
    id: "ideation-biomimicry-nature-inspired-product-innovation",
    name: "BiomimicryNatureInspiredProductInnovationSkill",
    displayName: "Biomimicry Nature-Inspired Product Innovation",
    categoryId: "ideation",
    description: "Adapts biological mechanisms (burrs, shark skin, bird beaks) to solve engineering problems.",
    tags: ["ideation","ideation","biomimicry","nature"],
    transform: createStandardSkillTransform({
      sectionName: "Biomimicry Nature-Inspired Product Innovation Standards",
      ruSectionName: "Стандарты и регламенты: Biomimicry Nature-Inspired Product Innovation",
      instructions: [
        "Apply core domain tenets for Biomimicry Nature-Inspired Product Innovation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Biomimicry Nature-Inspired Product Innovation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","biomimicry","nature"],
    }),
  },

  "ideation-triz-40-inventive-principles-contradiction-matrix": {
    id: "ideation-triz-40-inventive-principles-contradiction-matrix",
    name: "TRIZ40InventivePrinciplesContradictionMatrixSkill",
    displayName: "TRIZ 40 Inventive Principles Contradiction Matrix",
    categoryId: "ideation",
    description: "Resolves technical contradictions using Genrich Altshuller's 40 inventive principles.",
    tags: ["ideation","ideation","triz","40"],
    transform: createStandardSkillTransform({
      sectionName: "TRIZ 40 Inventive Principles Contradiction Matrix Standards",
      ruSectionName: "Стандарты и регламенты: TRIZ 40 Inventive Principles Contradiction Matrix",
      instructions: [
        "Apply core domain tenets for TRIZ 40 Inventive Principles Contradiction Matrix.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для TRIZ 40 Inventive Principles Contradiction Matrix.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","triz","40"],
    }),
  },

  "ideation-opposable-mind-integrative-thinking-synthesis": {
    id: "ideation-opposable-mind-integrative-thinking-synthesis",
    name: "OpposableMindIntegrativeThinkingSynthesisSkill",
    displayName: "Opposable Mind Integrative Thinking Synthesis",
    categoryId: "ideation",
    description: "Holds two opposing ideas in tension to create a superior third solution.",
    tags: ["ideation","ideation","opposable","mind"],
    transform: createStandardSkillTransform({
      sectionName: "Opposable Mind Integrative Thinking Synthesis Standards",
      ruSectionName: "Стандарты и регламенты: Opposable Mind Integrative Thinking Synthesis",
      instructions: [
        "Apply core domain tenets for Opposable Mind Integrative Thinking Synthesis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Opposable Mind Integrative Thinking Synthesis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","opposable","mind"],
    }),
  },

  "ideation-design-thinking-empathize-define-innovation-loop": {
    id: "ideation-design-thinking-empathize-define-innovation-loop",
    name: "DesignThinkingEmpathizeDefineInnovationLoopSkill",
    displayName: "Design Thinking Empathize-Define Innovation Loop",
    categoryId: "ideation",
    description: "Generates user-centered concepts based on deep ethnographic empathy observations.",
    tags: ["ideation","ideation","design","thinking"],
    transform: createStandardSkillTransform({
      sectionName: "Design Thinking Empathize-Define Innovation Loop Standards",
      ruSectionName: "Стандарты и регламенты: Design Thinking Empathize-Define Innovation Loop",
      instructions: [
        "Apply core domain tenets for Design Thinking Empathize-Define Innovation Loop.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Design Thinking Empathize-Define Innovation Loop.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","design","thinking"],
    }),
  },

  "ideation-rapid-paper-prototyping-concept-mock": {
    id: "ideation-rapid-paper-prototyping-concept-mock",
    name: "RapidPaperPrototypingConceptMockSkill",
    displayName: "Rapid Paper Prototyping Concept Mock",
    categoryId: "ideation",
    description: "Creates quick low-fidelity paper concept sketches to test ideas with users in 1 hour.",
    tags: ["ideation","ideation","rapid","paper"],
    transform: createStandardSkillTransform({
      sectionName: "Rapid Paper Prototyping Concept Mock Standards",
      ruSectionName: "Стандарты и регламенты: Rapid Paper Prototyping Concept Mock",
      instructions: [
        "Apply core domain tenets for Rapid Paper Prototyping Concept Mock.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Rapid Paper Prototyping Concept Mock.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","rapid","paper"],
    }),
  },

  "ideation-disney-creative-strategy-three-rooms": {
    id: "ideation-disney-creative-strategy-three-rooms",
    name: "DisneyCreativeStrategyThreeRoomsSkill",
    displayName: "Disney Creative Strategy Three Rooms",
    categoryId: "ideation",
    description: "Cycles ideas through the Dreamer (Vision), the Realist (Plan), and the Spoiler (Critique).",
    tags: ["ideation","ideation","disney","creative"],
    transform: createStandardSkillTransform({
      sectionName: "Disney Creative Strategy Three Rooms Standards",
      ruSectionName: "Стандарты и регламенты: Disney Creative Strategy Three Rooms",
      instructions: [
        "Apply core domain tenets for Disney Creative Strategy Three Rooms.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Disney Creative Strategy Three Rooms.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","disney","creative"],
    }),
  },

  "ideation-six-serving-men-kipling-5w1h-framework": {
    id: "ideation-six-serving-men-kipling-5w1h-framework",
    name: "SixServingMenKipling5W1HFrameworkSkill",
    displayName: "Six Serving Men Kipling 5W1H Framework",
    categoryId: "ideation",
    description: "Explores problem spaces using What, Why, When, How, Where, and Who questions.",
    tags: ["ideation","ideation","six","serving"],
    transform: createStandardSkillTransform({
      sectionName: "Six Serving Men Kipling 5W1H Framework Standards",
      ruSectionName: "Стандарты и регламенты: Six Serving Men Kipling 5W1H Framework",
      instructions: [
        "Apply core domain tenets for Six Serving Men Kipling 5W1H Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Six Serving Men Kipling 5W1H Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","six","serving"],
    }),
  },

  "ideation-provocation-movement-po-edward-de-bono": {
    id: "ideation-provocation-movement-po-edward-de-bono",
    name: "ProvocationMovementPOEdwarddeBonoSkill",
    displayName: "Provocation & Movement (PO) Edward de Bono",
    categoryId: "ideation",
    description: "Uses absurd statements ('PO: Cars have square wheels') to jumpstart lateral thinking.",
    tags: ["ideation","ideation","provocation","movement"],
    transform: createStandardSkillTransform({
      sectionName: "Provocation & Movement (PO) Edward de Bono Standards",
      ruSectionName: "Стандарты и регламенты: Provocation & Movement (PO) Edward de Bono",
      instructions: [
        "Apply core domain tenets for Provocation & Movement (PO) Edward de Bono.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Provocation & Movement (PO) Edward de Bono.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","provocation","movement"],
    }),
  },

  "ideation-mind-mapping-radial-concept-expansion": {
    id: "ideation-mind-mapping-radial-concept-expansion",
    name: "MindMappingRadialConceptExpansionSkill",
    displayName: "Mind Mapping Radial Concept Expansion",
    categoryId: "ideation",
    description: "Expands central ideas outward into interconnected branches of sub-concepts.",
    tags: ["ideation","ideation","mind","mapping"],
    transform: createStandardSkillTransform({
      sectionName: "Mind Mapping Radial Concept Expansion Standards",
      ruSectionName: "Стандарты и регламенты: Mind Mapping Radial Concept Expansion",
      instructions: [
        "Apply core domain tenets for Mind Mapping Radial Concept Expansion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mind Mapping Radial Concept Expansion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","mind","mapping"],
    }),
  },

  "ideation-lotus-blossom-idea-expansion-grid": {
    id: "ideation-lotus-blossom-idea-expansion-grid",
    name: "LotusBlossomIdeaExpansionGridSkill",
    displayName: "Lotus Blossom Idea Expansion Grid",
    categoryId: "ideation",
    description: "Expands 1 core idea into 8 sub-ideas, then expands each sub-idea into 8 more.",
    tags: ["ideation","ideation","lotus","blossom"],
    transform: createStandardSkillTransform({
      sectionName: "Lotus Blossom Idea Expansion Grid Standards",
      ruSectionName: "Стандарты и регламенты: Lotus Blossom Idea Expansion Grid",
      instructions: [
        "Apply core domain tenets for Lotus Blossom Idea Expansion Grid.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Lotus Blossom Idea Expansion Grid.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","lotus","blossom"],
    }),
  },

  "ideation-scamper-substitute-component-exploration": {
    id: "ideation-scamper-substitute-component-exploration",
    name: "SCAMPERSubstituteComponentExplorationSkill",
    displayName: "SCAMPER Substitute Component Exploration",
    categoryId: "ideation",
    description: "Explores substituting materials, processes, or audiences in an existing product.",
    tags: ["ideation","ideation","scamper","substitute"],
    transform: createStandardSkillTransform({
      sectionName: "SCAMPER Substitute Component Exploration Standards",
      ruSectionName: "Стандарты и регламенты: SCAMPER Substitute Component Exploration",
      instructions: [
        "Apply core domain tenets for SCAMPER Substitute Component Exploration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SCAMPER Substitute Component Exploration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","scamper","substitute"],
    }),
  },

  "ideation-scamper-combine-feature-integration": {
    id: "ideation-scamper-combine-feature-integration",
    name: "SCAMPERCombineFeatureIntegrationSkill",
    displayName: "SCAMPER Combine Feature Integration",
    categoryId: "ideation",
    description: "Combines two separate products or services into a unified multi-tool.",
    tags: ["ideation","ideation","scamper","combine"],
    transform: createStandardSkillTransform({
      sectionName: "SCAMPER Combine Feature Integration Standards",
      ruSectionName: "Стандарты и регламенты: SCAMPER Combine Feature Integration",
      instructions: [
        "Apply core domain tenets for SCAMPER Combine Feature Integration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SCAMPER Combine Feature Integration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","scamper","combine"],
    }),
  },

  "ideation-scamper-adapt-cross-industry-feature": {
    id: "ideation-scamper-adapt-cross-industry-feature",
    name: "SCAMPERAdaptCrossIndustryFeatureSkill",
    displayName: "SCAMPER Adapt Cross-Industry Feature",
    categoryId: "ideation",
    description: "Adapts a feature from video games, aviation, or sports into corporate software.",
    tags: ["ideation","ideation","scamper","adapt"],
    transform: createStandardSkillTransform({
      sectionName: "SCAMPER Adapt Cross-Industry Feature Standards",
      ruSectionName: "Стандарты и регламенты: SCAMPER Adapt Cross-Industry Feature",
      instructions: [
        "Apply core domain tenets for SCAMPER Adapt Cross-Industry Feature.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SCAMPER Adapt Cross-Industry Feature.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","scamper","adapt"],
    }),
  },

  "ideation-scamper-modify-magnify-minify-scale": {
    id: "ideation-scamper-modify-magnify-minify-scale",
    name: "SCAMPERModifyMagnifyMinifyScaleSkill",
    displayName: "SCAMPER Modify Magnify/Minify Scale",
    categoryId: "ideation",
    description: "Magnifies or minifies size, speed, price, or frequency to invent new tiers.",
    tags: ["ideation","ideation","scamper","modify"],
    transform: createStandardSkillTransform({
      sectionName: "SCAMPER Modify Magnify/Minify Scale Standards",
      ruSectionName: "Стандарты и регламенты: SCAMPER Modify Magnify/Minify Scale",
      instructions: [
        "Apply core domain tenets for SCAMPER Modify Magnify/Minify Scale.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SCAMPER Modify Magnify/Minify Scale.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","scamper","modify"],
    }),
  },

  "ideation-scamper-put-to-other-uses-repurposing": {
    id: "ideation-scamper-put-to-other-uses-repurposing",
    name: "SCAMPERPuttoOtherUsesRepurposingSkill",
    displayName: "SCAMPER Put to Other Uses Repurposing",
    categoryId: "ideation",
    description: "Repurposes waste products or dormant assets for completely new markets.",
    tags: ["ideation","ideation","scamper","put"],
    transform: createStandardSkillTransform({
      sectionName: "SCAMPER Put to Other Uses Repurposing Standards",
      ruSectionName: "Стандарты и регламенты: SCAMPER Put to Other Uses Repurposing",
      instructions: [
        "Apply core domain tenets for SCAMPER Put to Other Uses Repurposing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SCAMPER Put to Other Uses Repurposing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","scamper","put"],
    }),
  },

  "ideation-scamper-eliminate-feature-reduction": {
    id: "ideation-scamper-eliminate-feature-reduction",
    name: "SCAMPEREliminateFeatureReductionSkill",
    displayName: "SCAMPER Eliminate Feature Reduction",
    categoryId: "ideation",
    description: "Eliminates core features to create ultra-simple, low-cost product variants.",
    tags: ["ideation","ideation","scamper","eliminate"],
    transform: createStandardSkillTransform({
      sectionName: "SCAMPER Eliminate Feature Reduction Standards",
      ruSectionName: "Стандарты и регламенты: SCAMPER Eliminate Feature Reduction",
      instructions: [
        "Apply core domain tenets for SCAMPER Eliminate Feature Reduction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SCAMPER Eliminate Feature Reduction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","scamper","eliminate"],
    }),
  },

  "ideation-scamper-reverse-inverted-workflow": {
    id: "ideation-scamper-reverse-inverted-workflow",
    name: "SCAMPERReverseInvertedWorkflowSkill",
    displayName: "SCAMPER Reverse Inverted Workflow",
    categoryId: "ideation",
    description: "Reverses the order of operations or flips buyer-seller roles in a transaction.",
    tags: ["ideation","ideation","scamper","reverse"],
    transform: createStandardSkillTransform({
      sectionName: "SCAMPER Reverse Inverted Workflow Standards",
      ruSectionName: "Стандарты и регламенты: SCAMPER Reverse Inverted Workflow",
      instructions: [
        "Apply core domain tenets for SCAMPER Reverse Inverted Workflow.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SCAMPER Reverse Inverted Workflow.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","scamper","reverse"],
    }),
  },

  "ideation-brainwriting-6-3-5-silent-ideation": {
    id: "ideation-brainwriting-6-3-5-silent-ideation",
    name: "Brainwriting635SilentIdeationSkill",
    displayName: "Brainwriting 6-3-5 Silent Ideation",
    categoryId: "ideation",
    description: "6 participants write 3 ideas on paper in 5 minutes, passing sheets to build on ideas silently.",
    tags: ["ideation","ideation","brainwriting","6"],
    transform: createStandardSkillTransform({
      sectionName: "Brainwriting 6-3-5 Silent Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Brainwriting 6-3-5 Silent Ideation",
      instructions: [
        "Apply core domain tenets for Brainwriting 6-3-5 Silent Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Brainwriting 6-3-5 Silent Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","brainwriting","6"],
    }),
  },

  "ideation-forced-connections-object-association": {
    id: "ideation-forced-connections-object-association",
    name: "ForcedConnectionsObjectAssociationSkill",
    displayName: "Forced Connections Object Association",
    categoryId: "ideation",
    description: "Forces logical connections between a toaster, a tree, or a shoe and your business problem.",
    tags: ["ideation","ideation","forced","connections"],
    transform: createStandardSkillTransform({
      sectionName: "Forced Connections Object Association Standards",
      ruSectionName: "Стандарты и регламенты: Forced Connections Object Association",
      instructions: [
        "Apply core domain tenets for Forced Connections Object Association.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Forced Connections Object Association.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","forced","connections"],
    }),
  },

  "ideation-question-storming-problem-reframing": {
    id: "ideation-question-storming-problem-reframing",
    name: "QuestionStormingProblemReframingSkill",
    displayName: "Question Storming Problem Reframing",
    categoryId: "ideation",
    description: "Generates 50 questions about a problem before attempting to brainstorm any answers.",
    tags: ["ideation","ideation","question","storming"],
    transform: createStandardSkillTransform({
      sectionName: "Question Storming Problem Reframing Standards",
      ruSectionName: "Стандарты и регламенты: Question Storming Problem Reframing",
      instructions: [
        "Apply core domain tenets for Question Storming Problem Reframing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Question Storming Problem Reframing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","question","storming"],
    }),
  },

  "ideation-superhero-persona-perspective-swap": {
    id: "ideation-superhero-persona-perspective-swap",
    name: "SuperheroPersonaPerspectiveSwapSkill",
    displayName: "Superhero Persona Perspective Swap",
    categoryId: "ideation",
    description: "Asks 'How would Steve Jobs, Elon Musk, or Batman solve this problem?'.",
    tags: ["ideation","ideation","superhero","persona"],
    transform: createStandardSkillTransform({
      sectionName: "Superhero Persona Perspective Swap Standards",
      ruSectionName: "Стандарты и регламенты: Superhero Persona Perspective Swap",
      instructions: [
        "Apply core domain tenets for Superhero Persona Perspective Swap.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Superhero Persona Perspective Swap.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","superhero","persona"],
    }),
  },

  "ideation-random-entry-dictionary-word-stimulus": {
    id: "ideation-random-entry-dictionary-word-stimulus",
    name: "RandomEntryDictionaryWordStimulusSkill",
    displayName: "Random Entry Dictionary Word Stimulus",
    categoryId: "ideation",
    description: "Picks a random dictionary page to find unexpected metaphors for problem solving.",
    tags: ["ideation","ideation","random","entry"],
    transform: createStandardSkillTransform({
      sectionName: "Random Entry Dictionary Word Stimulus Standards",
      ruSectionName: "Стандарты и регламенты: Random Entry Dictionary Word Stimulus",
      instructions: [
        "Apply core domain tenets for Random Entry Dictionary Word Stimulus.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Random Entry Dictionary Word Stimulus.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","random","entry"],
    }),
  },

  "ideation-attribute-listing-feature-decomposition": {
    id: "ideation-attribute-listing-feature-decomposition",
    name: "AttributeListingFeatureDecompositionSkill",
    displayName: "Attribute Listing Feature Decomposition",
    categoryId: "ideation",
    description: "Lists all physical and functional attributes of a product, systematically tweaking each.",
    tags: ["ideation","ideation","attribute","listing"],
    transform: createStandardSkillTransform({
      sectionName: "Attribute Listing Feature Decomposition Standards",
      ruSectionName: "Стандарты и регламенты: Attribute Listing Feature Decomposition",
      instructions: [
        "Apply core domain tenets for Attribute Listing Feature Decomposition.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Attribute Listing Feature Decomposition.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","attribute","listing"],
    }),
  },

  "ideation-synectics-making-the-strange-familiar": {
    id: "ideation-synectics-making-the-strange-familiar",
    name: "SynecticsMakingtheStrangeFamiliarSkill",
    displayName: "Synectics Making the Strange Familiar",
    categoryId: "ideation",
    description: "Uses personal analogies, direct analogies, and fantasy analogies to reframe problems.",
    tags: ["ideation","ideation","synectics","making"],
    transform: createStandardSkillTransform({
      sectionName: "Synectics Making the Strange Familiar Standards",
      ruSectionName: "Стандарты и регламенты: Synectics Making the Strange Familiar",
      instructions: [
        "Apply core domain tenets for Synectics Making the Strange Familiar.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Synectics Making the Strange Familiar.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","synectics","making"],
    }),
  },

  "ideation-concept-fan-problem-abstraction-ladder": {
    id: "ideation-concept-fan-problem-abstraction-ladder",
    name: "ConceptFanProblemAbstractionLadderSkill",
    displayName: "Concept Fan Problem Abstraction Ladder",
    categoryId: "ideation",
    description: "Broadens or narrows problem statements to discover alternative solution spaces.",
    tags: ["ideation","ideation","concept","fan"],
    transform: createStandardSkillTransform({
      sectionName: "Concept Fan Problem Abstraction Ladder Standards",
      ruSectionName: "Стандарты и регламенты: Concept Fan Problem Abstraction Ladder",
      instructions: [
        "Apply core domain tenets for Concept Fan Problem Abstraction Ladder.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Concept Fan Problem Abstraction Ladder.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","concept","fan"],
    }),
  },

  "ideation-wishful-thinking-magic-wand-sandbox": {
    id: "ideation-wishful-thinking-magic-wand-sandbox",
    name: "WishfulThinkingMagicWandSandboxSkill",
    displayName: "Wishful Thinking Magic Wand Sandbox",
    categoryId: "ideation",
    description: "Asks 'If magic were real and cost zero, what would the perfect solution look like?'.",
    tags: ["ideation","ideation","wishful","thinking"],
    transform: createStandardSkillTransform({
      sectionName: "Wishful Thinking Magic Wand Sandbox Standards",
      ruSectionName: "Стандарты и регламенты: Wishful Thinking Magic Wand Sandbox",
      instructions: [
        "Apply core domain tenets for Wishful Thinking Magic Wand Sandbox.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Wishful Thinking Magic Wand Sandbox.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","wishful","thinking"],
    }),
  },

  "ideation-zero-to-one-peter-thiel-contrarian-truth": {
    id: "ideation-zero-to-one-peter-thiel-contrarian-truth",
    name: "ZeroToOnePeterThielContrarianTruthSkill",
    displayName: "Zero-To-One Peter Thiel Contrarian Truth",
    categoryId: "ideation",
    description: "Asks 'What important truth do very few people agree with you on?' to spot monopolies.",
    tags: ["ideation","ideation","zero","to"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-To-One Peter Thiel Contrarian Truth Standards",
      ruSectionName: "Стандарты и регламенты: Zero-To-One Peter Thiel Contrarian Truth",
      instructions: [
        "Apply core domain tenets for Zero-To-One Peter Thiel Contrarian Truth.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Zero-To-One Peter Thiel Contrarian Truth.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","zero","to"],
    }),
  },

  "ideation-flywheel-momentum-loop-ideation": {
    id: "ideation-flywheel-momentum-loop-ideation",
    name: "FlywheelMomentumLoopIdeationSkill",
    displayName: "Flywheel Momentum Loop Ideation",
    categoryId: "ideation",
    description: "Designs self-reinforcing business loops where each customer action drives the next.",
    tags: ["ideation","ideation","flywheel","momentum"],
    transform: createStandardSkillTransform({
      sectionName: "Flywheel Momentum Loop Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Flywheel Momentum Loop Ideation",
      instructions: [
        "Apply core domain tenets for Flywheel Momentum Loop Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Flywheel Momentum Loop Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","flywheel","momentum"],
    }),
  },

  "ideation-network-effect-growth-engine-ideation": {
    id: "ideation-network-effect-growth-engine-ideation",
    name: "NetworkEffectGrowthEngineIdeationSkill",
    displayName: "Network Effect Growth Engine Ideation",
    categoryId: "ideation",
    description: "Invents product features that become exponentially more valuable as more users join.",
    tags: ["ideation","ideation","network","effect"],
    transform: createStandardSkillTransform({
      sectionName: "Network Effect Growth Engine Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Network Effect Growth Engine Ideation",
      instructions: [
        "Apply core domain tenets for Network Effect Growth Engine Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Network Effect Growth Engine Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","network","effect"],
    }),
  },

  "ideation-unbundling-monolithic-industry-services": {
    id: "ideation-unbundling-monolithic-industry-services",
    name: "UnbundlingMonolithicIndustryServicesSkill",
    displayName: "Unbundling Monolithic Industry Services",
    categoryId: "ideation",
    description: "Unbundles complex corporate software suites into hyper-focused single-purpose apps.",
    tags: ["ideation","ideation","unbundling","monolithic"],
    transform: createStandardSkillTransform({
      sectionName: "Unbundling Monolithic Industry Services Standards",
      ruSectionName: "Стандарты и регламенты: Unbundling Monolithic Industry Services",
      instructions: [
        "Apply core domain tenets for Unbundling Monolithic Industry Services.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Unbundling Monolithic Industry Services.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","unbundling","monolithic"],
    }),
  },

  "ideation-re-bundling-fragmented-tool-market": {
    id: "ideation-re-bundling-fragmented-tool-market",
    name: "RebundlingFragmentedToolMarketSkill",
    displayName: "Re-bundling Fragmented Tool Market",
    categoryId: "ideation",
    description: "Re-bundles 10 disparate single-purpose tools into a unified seamless platform.",
    tags: ["ideation","ideation","re","bundling"],
    transform: createStandardSkillTransform({
      sectionName: "Re-bundling Fragmented Tool Market Standards",
      ruSectionName: "Стандарты и регламенты: Re-bundling Fragmented Tool Market",
      instructions: [
        "Apply core domain tenets for Re-bundling Fragmented Tool Market.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Re-bundling Fragmented Tool Market.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","re","bundling"],
    }),
  },

  "ideation-freemium-viral-mechanics-ideation": {
    id: "ideation-freemium-viral-mechanics-ideation",
    name: "FreemiumViralMechanicsIdeationSkill",
    displayName: "Freemium Viral Mechanics Ideation",
    categoryId: "ideation",
    description: "Designs viral sharing mechanics where free users naturally invite paying teammates.",
    tags: ["ideation","ideation","freemium","viral"],
    transform: createStandardSkillTransform({
      sectionName: "Freemium Viral Mechanics Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Freemium Viral Mechanics Ideation",
      instructions: [
        "Apply core domain tenets for Freemium Viral Mechanics Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Freemium Viral Mechanics Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","freemium","viral"],
    }),
  },

  "ideation-product-led-growth-self-serve-onboarding": {
    id: "ideation-product-led-growth-self-serve-onboarding",
    name: "ProductLedGrowthSelfServeOnboardingSkill",
    displayName: "Product-Led Growth Self-Serve Onboarding",
    categoryId: "ideation",
    description: "Ideates self-serve product flows that deliver Time-to-Value in under 60 seconds.",
    tags: ["ideation","ideation","product","led"],
    transform: createStandardSkillTransform({
      sectionName: "Product-Led Growth Self-Serve Onboarding Standards",
      ruSectionName: "Стандарты и регламенты: Product-Led Growth Self-Serve Onboarding",
      instructions: [
        "Apply core domain tenets for Product-Led Growth Self-Serve Onboarding.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product-Led Growth Self-Serve Onboarding.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","product","led"],
    }),
  },

  "ideation-api-first-developer-platform-ideation": {
    id: "ideation-api-first-developer-platform-ideation",
    name: "APIFirstDeveloperPlatformIdeationSkill",
    displayName: "API-First Developer Platform Ideation",
    categoryId: "ideation",
    description: "Re-imagines closed software as an open API platform for third-party developers.",
    tags: ["ideation","ideation","api","first"],
    transform: createStandardSkillTransform({
      sectionName: "API-First Developer Platform Ideation Standards",
      ruSectionName: "Стандарты и регламенты: API-First Developer Platform Ideation",
      instructions: [
        "Apply core domain tenets for API-First Developer Platform Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для API-First Developer Platform Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","api","first"],
    }),
  },

  "ideation-marketplace-two-sided-liquidity-ideation": {
    id: "ideation-marketplace-two-sided-liquidity-ideation",
    name: "MarketplaceTwoSidedLiquidityIdeationSkill",
    displayName: "Marketplace Two-Sided Liquidity Ideation",
    categoryId: "ideation",
    description: "Solves chicken-and-egg cold-start problems in two-sided buyer-seller marketplaces.",
    tags: ["ideation","ideation","marketplace","two"],
    transform: createStandardSkillTransform({
      sectionName: "Marketplace Two-Sided Liquidity Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Marketplace Two-Sided Liquidity Ideation",
      instructions: [
        "Apply core domain tenets for Marketplace Two-Sided Liquidity Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Marketplace Two-Sided Liquidity Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","marketplace","two"],
    }),
  },

  "ideation-community-led-product-ideation": {
    id: "ideation-community-led-product-ideation",
    name: "CommunityLedProductIdeationSkill",
    displayName: "Community-Led Product Ideation",
    categoryId: "ideation",
    description: "Builds product features that empower power users to create and share custom content.",
    tags: ["ideation","ideation","community","led"],
    transform: createStandardSkillTransform({
      sectionName: "Community-Led Product Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Community-Led Product Ideation",
      instructions: [
        "Apply core domain tenets for Community-Led Product Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Community-Led Product Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","community","led"],
    }),
  },

  "ideation-gamification-behavior-modification-ideation": {
    id: "ideation-gamification-behavior-modification-ideation",
    name: "GamificationBehaviorModificationIdeationSkill",
    displayName: "Gamification Behavior Modification Ideation",
    categoryId: "ideation",
    description: "Applies streaks, XP points, leaderboards, and badges to make boring tasks engaging.",
    tags: ["ideation","ideation","gamification","behavior"],
    transform: createStandardSkillTransform({
      sectionName: "Gamification Behavior Modification Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Gamification Behavior Modification Ideation",
      instructions: [
        "Apply core domain tenets for Gamification Behavior Modification Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gamification Behavior Modification Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","gamification","behavior"],
    }),
  },

  "ideation-micro-saas-niche-market-opportunity-spotting": {
    id: "ideation-micro-saas-niche-market-opportunity-spotting",
    name: "MicroSaaSNicheMarketOpportunitySpottingSkill",
    displayName: "Micro-SaaS Niche Market Opportunity Spotting",
    categoryId: "ideation",
    description: "Identifies hyper-focused software niches serving specific professional sub-cultures.",
    tags: ["ideation","ideation","micro","saas"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-SaaS Niche Market Opportunity Spotting Standards",
      ruSectionName: "Стандарты и регламенты: Micro-SaaS Niche Market Opportunity Spotting",
      instructions: [
        "Apply core domain tenets for Micro-SaaS Niche Market Opportunity Spotting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Micro-SaaS Niche Market Opportunity Spotting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","micro","saas"],
    }),
  },

  "ideation-subscription-recurring-revenue-model-ideation": {
    id: "ideation-subscription-recurring-revenue-model-ideation",
    name: "SubscriptionRecurringRevenueModelIdeationSkill",
    displayName: "Subscription Recurring Revenue Model Ideation",
    categoryId: "ideation",
    description: "Converts traditional one-time purchases into recurring value-add subscriptions.",
    tags: ["ideation","ideation","subscription","recurring"],
    transform: createStandardSkillTransform({
      sectionName: "Subscription Recurring Revenue Model Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Subscription Recurring Revenue Model Ideation",
      instructions: [
        "Apply core domain tenets for Subscription Recurring Revenue Model Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Subscription Recurring Revenue Model Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","subscription","recurring"],
    }),
  },

  "ideation-usage-based-dynamic-pricing-ideation": {
    id: "ideation-usage-based-dynamic-pricing-ideation",
    name: "UsageBasedDynamicPricingIdeationSkill",
    displayName: "Usage-Based Dynamic Pricing Ideation",
    categoryId: "ideation",
    description: "Aligns pricing directly with customer success metrics (API calls, storage, revenue).",
    tags: ["ideation","ideation","usage","based"],
    transform: createStandardSkillTransform({
      sectionName: "Usage-Based Dynamic Pricing Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Usage-Based Dynamic Pricing Ideation",
      instructions: [
        "Apply core domain tenets for Usage-Based Dynamic Pricing Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Usage-Based Dynamic Pricing Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","usage","based"],
    }),
  },

  "ideation-ai-native-workflow-re-imagination": {
    id: "ideation-ai-native-workflow-re-imagination",
    name: "AINativeWorkflowReimaginationSkill",
    displayName: "AI-Native Workflow Re-imagination",
    categoryId: "ideation",
    description: "Re-imagines classic software workflows with generative AI at the core.",
    tags: ["ideation","ideation","ai","native"],
    transform: createStandardSkillTransform({
      sectionName: "AI-Native Workflow Re-imagination Standards",
      ruSectionName: "Стандарты и регламенты: AI-Native Workflow Re-imagination",
      instructions: [
        "Apply core domain tenets for AI-Native Workflow Re-imagination.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AI-Native Workflow Re-imagination.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","ai","native"],
    }),
  },

  "ideation-zero-ui-voice-ambient-interface-ideation": {
    id: "ideation-zero-ui-voice-ambient-interface-ideation",
    name: "ZeroUIVoiceAmbientInterfaceIdeationSkill",
    displayName: "Zero-UI Voice & Ambient Interface Ideation",
    categoryId: "ideation",
    description: "Designs invisible ambient interfaces that operate via sensors and voice.",
    tags: ["ideation","ideation","zero","ui"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-UI Voice & Ambient Interface Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Zero-UI Voice & Ambient Interface Ideation",
      instructions: [
        "Apply core domain tenets for Zero-UI Voice & Ambient Interface Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Zero-UI Voice & Ambient Interface Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","zero","ui"],
    }),
  },

  "ideation-no-code-visual-builder-ideation": {
    id: "ideation-no-code-visual-builder-ideation",
    name: "NoCodeVisualBuilderIdeationSkill",
    displayName: "No-Code Visual Builder Ideation",
    categoryId: "ideation",
    description: "Transforms complex code tasks into intuitive drag-and-drop visual canvas builders.",
    tags: ["ideation","ideation","no","code"],
    transform: createStandardSkillTransform({
      sectionName: "No-Code Visual Builder Ideation Standards",
      ruSectionName: "Стандарты и регламенты: No-Code Visual Builder Ideation",
      instructions: [
        "Apply core domain tenets for No-Code Visual Builder Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для No-Code Visual Builder Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","no","code"],
    }),
  },

  "ideation-sustainable-circular-economy-product-ideation": {
    id: "ideation-sustainable-circular-economy-product-ideation",
    name: "SustainableCircularEconomyProductIdeationSkill",
    displayName: "Sustainable Circular Economy Product Ideation",
    categoryId: "ideation",
    description: "Designs products for zero-waste repair, disassembly, and infinite material recycling.",
    tags: ["ideation","ideation","sustainable","circular"],
    transform: createStandardSkillTransform({
      sectionName: "Sustainable Circular Economy Product Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Sustainable Circular Economy Product Ideation",
      instructions: [
        "Apply core domain tenets for Sustainable Circular Economy Product Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sustainable Circular Economy Product Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","sustainable","circular"],
    }),
  },

  "ideation-hyper-personalization-data-loop-ideation": {
    id: "ideation-hyper-personalization-data-loop-ideation",
    name: "HyperPersonalizationDataLoopIdeationSkill",
    displayName: "Hyper-Personalization Data Loop Ideation",
    categoryId: "ideation",
    description: "Builds recommendation engines that customize UI and content for each individual.",
    tags: ["ideation","ideation","hyper","personalization"],
    transform: createStandardSkillTransform({
      sectionName: "Hyper-Personalization Data Loop Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Hyper-Personalization Data Loop Ideation",
      instructions: [
        "Apply core domain tenets for Hyper-Personalization Data Loop Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hyper-Personalization Data Loop Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","hyper","personalization"],
    }),
  },

  "ideation-edge-computing-zero-latency-ideation": {
    id: "ideation-edge-computing-zero-latency-ideation",
    name: "EdgeComputingZeroLatencyIdeationSkill",
    displayName: "Edge Computing Zero-Latency Ideation",
    categoryId: "ideation",
    description: "Invents local-first software features that run entirely on user devices offline.",
    tags: ["ideation","ideation","edge","computing"],
    transform: createStandardSkillTransform({
      sectionName: "Edge Computing Zero-Latency Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Edge Computing Zero-Latency Ideation",
      instructions: [
        "Apply core domain tenets for Edge Computing Zero-Latency Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Edge Computing Zero-Latency Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","edge","computing"],
    }),
  },

  "ideation-augmented-reality-spatial-computing-ideation": {
    id: "ideation-augmented-reality-spatial-computing-ideation",
    name: "AugmentedRealitySpatialComputingIdeationSkill",
    displayName: "Augmented Reality Spatial Computing Ideation",
    categoryId: "ideation",
    description: "Designs spatial 3D interfaces overlaid onto physical environments via AR glasses.",
    tags: ["ideation","ideation","augmented","reality"],
    transform: createStandardSkillTransform({
      sectionName: "Augmented Reality Spatial Computing Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Augmented Reality Spatial Computing Ideation",
      instructions: [
        "Apply core domain tenets for Augmented Reality Spatial Computing Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Augmented Reality Spatial Computing Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","augmented","reality"],
    }),
  },

  "ideation-biometric-continuous-authentication-ideation": {
    id: "ideation-biometric-continuous-authentication-ideation",
    name: "BiometricContinuousAuthenticationIdeationSkill",
    displayName: "Biometric Continuous Authentication Ideation",
    categoryId: "ideation",
    description: "Replaces login forms with passive biometric security signals.",
    tags: ["ideation","ideation","biometric","continuous"],
    transform: createStandardSkillTransform({
      sectionName: "Biometric Continuous Authentication Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Biometric Continuous Authentication Ideation",
      instructions: [
        "Apply core domain tenets for Biometric Continuous Authentication Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Biometric Continuous Authentication Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","biometric","continuous"],
    }),
  },

  "ideation-decentralized-peer-to-peer-protocol-ideation": {
    id: "ideation-decentralized-peer-to-peer-protocol-ideation",
    name: "DecentralizedPeertoPeerProtocolIdeationSkill",
    displayName: "Decentralized Peer-to-Peer Protocol Ideation",
    categoryId: "ideation",
    description: "Architects serverless peer-to-peer applications without central company control.",
    tags: ["ideation","ideation","decentralized","peer"],
    transform: createStandardSkillTransform({
      sectionName: "Decentralized Peer-to-Peer Protocol Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Decentralized Peer-to-Peer Protocol Ideation",
      instructions: [
        "Apply core domain tenets for Decentralized Peer-to-Peer Protocol Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Decentralized Peer-to-Peer Protocol Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","decentralized","peer"],
    }),
  },

  "ideation-autonomous-agent-execution-ideation": {
    id: "ideation-autonomous-agent-execution-ideation",
    name: "AutonomousAgentExecutionIdeationSkill",
    displayName: "Autonomous Agent Execution Ideation",
    categoryId: "ideation",
    description: "Designs software that operates autonomously as background AI workers.",
    tags: ["ideation","ideation","autonomous","agent"],
    transform: createStandardSkillTransform({
      sectionName: "Autonomous Agent Execution Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Autonomous Agent Execution Ideation",
      instructions: [
        "Apply core domain tenets for Autonomous Agent Execution Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Autonomous Agent Execution Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","autonomous","agent"],
    }),
  },

  "ideation-saas-vertical-integration-expansion": {
    id: "ideation-saas-vertical-integration-expansion",
    name: "SaaSVerticalIntegrationExpansionSkill",
    displayName: "SaaS Vertical Integration Expansion",
    categoryId: "ideation",
    description: "Expands horizontal software into vertically integrated end-to-end industry suites.",
    tags: ["ideation","ideation","saas","vertical"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Vertical Integration Expansion Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Vertical Integration Expansion",
      instructions: [
        "Apply core domain tenets for SaaS Vertical Integration Expansion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Vertical Integration Expansion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","saas","vertical"],
    }),
  },

  "ideation-crowdsourced-intelligence-engine-ideation": {
    id: "ideation-crowdsourced-intelligence-engine-ideation",
    name: "CrowdsourcedIntelligenceEngineIdeationSkill",
    displayName: "Crowdsourced Intelligence Engine Ideation",
    categoryId: "ideation",
    description: "Harnesses collective human intelligence to solve complex data labeling tasks.",
    tags: ["ideation","ideation","crowdsourced","intelligence"],
    transform: createStandardSkillTransform({
      sectionName: "Crowdsourced Intelligence Engine Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Crowdsourced Intelligence Engine Ideation",
      instructions: [
        "Apply core domain tenets for Crowdsourced Intelligence Engine Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Crowdsourced Intelligence Engine Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","crowdsourced","intelligence"],
    }),
  },

  "ideation-embedded-financial-services-integration": {
    id: "ideation-embedded-financial-services-integration",
    name: "EmbeddedFinancialServicesIntegrationSkill",
    displayName: "Embedded Financial Services Integration",
    categoryId: "ideation",
    description: "Embeds banking, insurance, and lending features directly inside non-financial SaaS.",
    tags: ["ideation","ideation","embedded","financial"],
    transform: createStandardSkillTransform({
      sectionName: "Embedded Financial Services Integration Standards",
      ruSectionName: "Стандарты и регламенты: Embedded Financial Services Integration",
      instructions: [
        "Apply core domain tenets for Embedded Financial Services Integration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Embedded Financial Services Integration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","embedded","financial"],
    }),
  },

  "ideation-dark-horse-unconventional-strategy-ideation": {
    id: "ideation-dark-horse-unconventional-strategy-ideation",
    name: "DarkHorseUnconventionalStrategyIdeationSkill",
    displayName: "Dark Horse Unconventional Strategy Ideation",
    categoryId: "ideation",
    description: "Explores radical, counter-intuitive business moves that competitors would never expect.",
    tags: ["ideation","ideation","dark","horse"],
    transform: createStandardSkillTransform({
      sectionName: "Dark Horse Unconventional Strategy Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Dark Horse Unconventional Strategy Ideation",
      instructions: [
        "Apply core domain tenets for Dark Horse Unconventional Strategy Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dark Horse Unconventional Strategy Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","dark","horse"],
    }),
  },

  "ideation-silent-brainstorming-digital-card-sorting": {
    id: "ideation-silent-brainstorming-digital-card-sorting",
    name: "SilentBrainstormingDigitalCardSortingSkill",
    displayName: "Silent Brainstorming Digital Card Sorting",
    categoryId: "ideation",
    description: "Conducts async digital card sorting to group and prioritize product concepts.",
    tags: ["ideation","ideation","silent","brainstorming"],
    transform: createStandardSkillTransform({
      sectionName: "Silent Brainstorming Digital Card Sorting Standards",
      ruSectionName: "Стандарты и регламенты: Silent Brainstorming Digital Card Sorting",
      instructions: [
        "Apply core domain tenets for Silent Brainstorming Digital Card Sorting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Silent Brainstorming Digital Card Sorting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","silent","brainstorming"],
    }),
  },

  "ideation-user-persona-friction-point-inversion": {
    id: "ideation-user-persona-friction-point-inversion",
    name: "UserPersonaFrictionPointInversionSkill",
    displayName: "User Persona Friction Point Inversion",
    categoryId: "ideation",
    description: "Turns the top 3 complaints of target user personas into headline marketing features.",
    tags: ["ideation","ideation","user","persona"],
    transform: createStandardSkillTransform({
      sectionName: "User Persona Friction Point Inversion Standards",
      ruSectionName: "Стандарты и регламенты: User Persona Friction Point Inversion",
      instructions: [
        "Apply core domain tenets for User Persona Friction Point Inversion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для User Persona Friction Point Inversion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","user","persona"],
    }),
  },

  "ideation-rapid-prototyping-smoke-test-landing-page": {
    id: "ideation-rapid-prototyping-smoke-test-landing-page",
    name: "RapidPrototypingSmokeTestLandingPageSkill",
    displayName: "Rapid Prototyping Smoke Test Landing Page",
    categoryId: "ideation",
    description: "Tests product demand by launching 1-page landing pages with email waitlists.",
    tags: ["ideation","ideation","rapid","prototyping"],
    transform: createStandardSkillTransform({
      sectionName: "Rapid Prototyping Smoke Test Landing Page Standards",
      ruSectionName: "Стандарты и регламенты: Rapid Prototyping Smoke Test Landing Page",
      instructions: [
        "Apply core domain tenets for Rapid Prototyping Smoke Test Landing Page.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Rapid Prototyping Smoke Test Landing Page.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","rapid","prototyping"],
    }),
  },

  "ideation-a-b-test-hypothesis-matrix-ideation": {
    id: "ideation-a-b-test-hypothesis-matrix-ideation",
    name: "ABTestHypothesisMatrixIdeationSkill",
    displayName: "A/B Test Hypothesis Matrix Ideation",
    categoryId: "ideation",
    description: "Generates high-velocity growth experiment hypotheses for conversion optimization.",
    tags: ["ideation","ideation","a","b"],
    transform: createStandardSkillTransform({
      sectionName: "A/B Test Hypothesis Matrix Ideation Standards",
      ruSectionName: "Стандарты и регламенты: A/B Test Hypothesis Matrix Ideation",
      instructions: [
        "Apply core domain tenets for A/B Test Hypothesis Matrix Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для A/B Test Hypothesis Matrix Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","a","b"],
    }),
  },

  "ideation-cross-pollination-ecosystem-partnership": {
    id: "ideation-cross-pollination-ecosystem-partnership",
    name: "CrossPollinationEcosystemPartnershipSkill",
    displayName: "Cross-Pollination Ecosystem Partnership",
    categoryId: "ideation",
    description: "Creates strategic co-marketing partnerships with complementary non-competing brands.",
    tags: ["ideation","ideation","cross","pollination"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Pollination Ecosystem Partnership Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Pollination Ecosystem Partnership",
      instructions: [
        "Apply core domain tenets for Cross-Pollination Ecosystem Partnership.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Pollination Ecosystem Partnership.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","cross","pollination"],
    }),
  },

  "ideation-product-disassembly-tear-down-analysis": {
    id: "ideation-product-disassembly-tear-down-analysis",
    name: "ProductDisassemblyTeardownAnalysisSkill",
    displayName: "Product Disassembly & Tear-down Analysis",
    categoryId: "ideation",
    description: "Tears down competitor products step-by-step to identify hidden engineering innovations.",
    tags: ["ideation","ideation","product","disassembly"],
    transform: createStandardSkillTransform({
      sectionName: "Product Disassembly & Tear-down Analysis Standards",
      ruSectionName: "Стандарты и регламенты: Product Disassembly & Tear-down Analysis",
      instructions: [
        "Apply core domain tenets for Product Disassembly & Tear-down Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product Disassembly & Tear-down Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","product","disassembly"],
    }),
  },

  "ideation-strategic-pre-mortem-failure-prevention": {
    id: "ideation-strategic-pre-mortem-failure-prevention",
    name: "StrategicPreMortemFailurePreventionSkill",
    displayName: "Strategic Pre-Mortem Failure Prevention",
    categoryId: "ideation",
    description: "Assumes a project failed 1 year in the future and identifies all causes today.",
    tags: ["ideation","ideation","strategic","pre"],
    transform: createStandardSkillTransform({
      sectionName: "Strategic Pre-Mortem Failure Prevention Standards",
      ruSectionName: "Стандарты и регламенты: Strategic Pre-Mortem Failure Prevention",
      instructions: [
        "Apply core domain tenets for Strategic Pre-Mortem Failure Prevention.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strategic Pre-Mortem Failure Prevention.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","strategic","pre"],
    }),
  },

  "ideation-value-chain-disintermediation-ideation": {
    id: "ideation-value-chain-disintermediation-ideation",
    name: "ValueChainDisintermediationIdeationSkill",
    displayName: "Value Chain Disintermediation Ideation",
    categoryId: "ideation",
    description: "Cuts out middleman distributors to connect producers directly with end consumers.",
    tags: ["ideation","ideation","value","chain"],
    transform: createStandardSkillTransform({
      sectionName: "Value Chain Disintermediation Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Value Chain Disintermediation Ideation",
      instructions: [
        "Apply core domain tenets for Value Chain Disintermediation Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Value Chain Disintermediation Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","value","chain"],
    }),
  },

  "ideation-hyper-local-community-marketplace-ideation": {
    id: "ideation-hyper-local-community-marketplace-ideation",
    name: "HyperLocalCommunityMarketplaceIdeationSkill",
    displayName: "Hyper-Local Community Marketplace Ideation",
    categoryId: "ideation",
    description: "Designs geo-fenced services that connect neighbors for local resource sharing.",
    tags: ["ideation","ideation","hyper","local"],
    transform: createStandardSkillTransform({
      sectionName: "Hyper-Local Community Marketplace Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Hyper-Local Community Marketplace Ideation",
      instructions: [
        "Apply core domain tenets for Hyper-Local Community Marketplace Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hyper-Local Community Marketplace Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","hyper","local"],
    }),
  },

  "ideation-ethical-nudge-choice-architecture-ideation": {
    id: "ideation-ethical-nudge-choice-architecture-ideation",
    name: "EthicalNudgeChoiceArchitectureIdeationSkill",
    displayName: "Ethical Nudge Choice Architecture Ideation",
    categoryId: "ideation",
    description: "Designs subtle interface nudges that guide users toward healthy financial/health choices.",
    tags: ["ideation","ideation","ethical","nudge"],
    transform: createStandardSkillTransform({
      sectionName: "Ethical Nudge Choice Architecture Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Ethical Nudge Choice Architecture Ideation",
      instructions: [
        "Apply core domain tenets for Ethical Nudge Choice Architecture Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Ethical Nudge Choice Architecture Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","ethical","nudge"],
    }),
  },

  "ideation-accessibility-first-innovation-universal-design": {
    id: "ideation-accessibility-first-innovation-universal-design",
    name: "AccessibilityFirstInnovationUniversalDesignSkill",
    displayName: "Accessibility-First Innovation Universal Design",
    categoryId: "ideation",
    description: "Innovates for disabled users first, creating superior features for all users.",
    tags: ["ideation","ideation","accessibility","first"],
    transform: createStandardSkillTransform({
      sectionName: "Accessibility-First Innovation Universal Design Standards",
      ruSectionName: "Стандарты и регламенты: Accessibility-First Innovation Universal Design",
      instructions: [
        "Apply core domain tenets for Accessibility-First Innovation Universal Design.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Accessibility-First Innovation Universal Design.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","accessibility","first"],
    }),
  },

  "ideation-open-source-commercialization-model-ideation": {
    id: "ideation-open-source-commercialization-model-ideation",
    name: "OpenSourceCommercializationModelIdeationSkill",
    displayName: "Open Source Commercialization Model Ideation",
    categoryId: "ideation",
    description: "Designs sustainable open-source business models around enterprise hosting/support.",
    tags: ["ideation","ideation","open","source"],
    transform: createStandardSkillTransform({
      sectionName: "Open Source Commercialization Model Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Open Source Commercialization Model Ideation",
      instructions: [
        "Apply core domain tenets for Open Source Commercialization Model Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Open Source Commercialization Model Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","open","source"],
    }),
  },

  "ideation-continuous-product-discovery-customer-cadence": {
    id: "ideation-continuous-product-discovery-customer-cadence",
    name: "ContinuousProductDiscoveryCustomerCadenceSkill",
    displayName: "Continuous Product Discovery Customer Cadence",
    categoryId: "ideation",
    description: "Establishes weekly customer interview habits to fuel continuous feature ideation.",
    tags: ["ideation","ideation","continuous","product"],
    transform: createStandardSkillTransform({
      sectionName: "Continuous Product Discovery Customer Cadence Standards",
      ruSectionName: "Стандарты и регламенты: Continuous Product Discovery Customer Cadence",
      instructions: [
        "Apply core domain tenets for Continuous Product Discovery Customer Cadence.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Continuous Product Discovery Customer Cadence.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","continuous","product"],
    }),
  },

  "ideation-iterative-hackathon-rapid-mvp-prototyping": {
    id: "ideation-iterative-hackathon-rapid-mvp-prototyping",
    name: "IterativeHackathonRapidMVPPrototypingSkill",
    displayName: "Iterative Hackathon Rapid MVP Prototyping",
    categoryId: "ideation",
    description: "Runs 24-hour hackathons to build working proof-of-concept software MVPs.",
    tags: ["ideation","ideation","iterative","hackathon"],
    transform: createStandardSkillTransform({
      sectionName: "Iterative Hackathon Rapid MVP Prototyping Standards",
      ruSectionName: "Стандарты и регламенты: Iterative Hackathon Rapid MVP Prototyping",
      instructions: [
        "Apply core domain tenets for Iterative Hackathon Rapid MVP Prototyping.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Iterative Hackathon Rapid MVP Prototyping.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","iterative","hackathon"],
    }),
  },

  "ideation-comprehensive-ideation-creative-innovation-framework": {
    id: "ideation-comprehensive-ideation-creative-innovation-framework",
    name: "ComprehensiveIdeationCreativeInnovationFrameworkSkill",
    displayName: "Comprehensive Ideation & Creative Innovation Framework",
    categoryId: "ideation",
    description: "Applies world-class lateral thinking, SCAMPER, and design innovation methods.",
    tags: ["ideation","ideation","comprehensive","ideation"],
    transform: createStandardSkillTransform({
      sectionName: "Comprehensive Ideation & Creative Innovation Framework Standards",
      ruSectionName: "Стандарты и регламенты: Comprehensive Ideation & Creative Innovation Framework",
      instructions: [
        "Apply core domain tenets for Comprehensive Ideation & Creative Innovation Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Comprehensive Ideation & Creative Innovation Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","comprehensive","ideation"],
    }),
  },

  "ideation-ideation-skill-90": {
    id: "ideation-ideation-skill-90",
    name: "ideationSkill90Skill",
    displayName: "ideation Skill 90",
    categoryId: "ideation",
    description: "Applies advanced ideation Skill 90 standards and execution patterns.",
    tags: ["ideation","ideation","ideation","skill"],
    transform: createStandardSkillTransform({
      sectionName: "ideation Skill 90 Standards",
      ruSectionName: "Стандарты и регламенты: ideation Skill 90",
      instructions: [
        "Apply core domain tenets for ideation Skill 90.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ideation Skill 90.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation","ideation","skill"],
    }),
  },
  "ideation-topup-disney-creative-strategy-three-rooms": {
    id: "ideation-topup-disney-creative-strategy-three-rooms",
    name: "DisneyCreativeStrategyThreeRoomsSkill",
    displayName: "Disney Creative Strategy Three Rooms",
    categoryId: "ideation",
    description: "Cycles ideas through the Dreamer (Vision), the Realist (Plan), and the Spoiler (Critique).",
    tags: ["ideation","ideation-topup","topup","disney"],
    transform: createStandardSkillTransform({
      sectionName: "Disney Creative Strategy Three Rooms Standards",
      ruSectionName: "Стандарты и регламенты: Disney Creative Strategy Three Rooms",
      instructions: [
        "Apply core domain tenets for Disney Creative Strategy Three Rooms.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Disney Creative Strategy Three Rooms.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","disney"],
    }),
  },

  "ideation-topup-six-serving-men-kipling-5w1h-framework": {
    id: "ideation-topup-six-serving-men-kipling-5w1h-framework",
    name: "SixServingMenKipling5W1HFrameworkSkill",
    displayName: "Six Serving Men Kipling 5W1H Framework",
    categoryId: "ideation",
    description: "Explores problem spaces using What, Why, When, How, Where, and Who questions.",
    tags: ["ideation","ideation-topup","topup","six"],
    transform: createStandardSkillTransform({
      sectionName: "Six Serving Men Kipling 5W1H Framework Standards",
      ruSectionName: "Стандарты и регламенты: Six Serving Men Kipling 5W1H Framework",
      instructions: [
        "Apply core domain tenets for Six Serving Men Kipling 5W1H Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Six Serving Men Kipling 5W1H Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","six"],
    }),
  },

  "ideation-topup-provocation-movement-po-edward-de-bono": {
    id: "ideation-topup-provocation-movement-po-edward-de-bono",
    name: "ProvocationMovementPOEdwarddeBonoSkill",
    displayName: "Provocation & Movement (PO) Edward de Bono",
    categoryId: "ideation",
    description: "Uses absurd statements ('PO: Cars have square wheels') to jumpstart lateral thinking.",
    tags: ["ideation","ideation-topup","topup","provocation"],
    transform: createStandardSkillTransform({
      sectionName: "Provocation & Movement (PO) Edward de Bono Standards",
      ruSectionName: "Стандарты и регламенты: Provocation & Movement (PO) Edward de Bono",
      instructions: [
        "Apply core domain tenets for Provocation & Movement (PO) Edward de Bono.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Provocation & Movement (PO) Edward de Bono.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","provocation"],
    }),
  },

  "ideation-topup-mind-mapping-radial-concept-expansion": {
    id: "ideation-topup-mind-mapping-radial-concept-expansion",
    name: "MindMappingRadialConceptExpansionSkill",
    displayName: "Mind Mapping Radial Concept Expansion",
    categoryId: "ideation",
    description: "Expands central ideas outward into interconnected branches of sub-concepts.",
    tags: ["ideation","ideation-topup","topup","mind"],
    transform: createStandardSkillTransform({
      sectionName: "Mind Mapping Radial Concept Expansion Standards",
      ruSectionName: "Стандарты и регламенты: Mind Mapping Radial Concept Expansion",
      instructions: [
        "Apply core domain tenets for Mind Mapping Radial Concept Expansion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mind Mapping Radial Concept Expansion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","mind"],
    }),
  },

  "ideation-topup-lotus-blossom-idea-expansion-grid": {
    id: "ideation-topup-lotus-blossom-idea-expansion-grid",
    name: "LotusBlossomIdeaExpansionGridSkill",
    displayName: "Lotus Blossom Idea Expansion Grid",
    categoryId: "ideation",
    description: "Expands 1 core idea into 8 sub-ideas, then expands each sub-idea into 8 more.",
    tags: ["ideation","ideation-topup","topup","lotus"],
    transform: createStandardSkillTransform({
      sectionName: "Lotus Blossom Idea Expansion Grid Standards",
      ruSectionName: "Стандарты и регламенты: Lotus Blossom Idea Expansion Grid",
      instructions: [
        "Apply core domain tenets for Lotus Blossom Idea Expansion Grid.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Lotus Blossom Idea Expansion Grid.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","lotus"],
    }),
  },

  "ideation-topup-brainwriting-6-3-5-silent-ideation": {
    id: "ideation-topup-brainwriting-6-3-5-silent-ideation",
    name: "Brainwriting635SilentIdeationSkill",
    displayName: "Brainwriting 6-3-5 Silent Ideation",
    categoryId: "ideation",
    description: "6 participants write 3 ideas on paper in 5 minutes, passing sheets silently.",
    tags: ["ideation","ideation-topup","topup","brainwriting"],
    transform: createStandardSkillTransform({
      sectionName: "Brainwriting 6-3-5 Silent Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Brainwriting 6-3-5 Silent Ideation",
      instructions: [
        "Apply core domain tenets for Brainwriting 6-3-5 Silent Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Brainwriting 6-3-5 Silent Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","brainwriting"],
    }),
  },

  "ideation-topup-forced-connections-object-association": {
    id: "ideation-topup-forced-connections-object-association",
    name: "ForcedConnectionsObjectAssociationSkill",
    displayName: "Forced Connections Object Association",
    categoryId: "ideation",
    description: "Forces logical connections between a random object and your business problem.",
    tags: ["ideation","ideation-topup","topup","forced"],
    transform: createStandardSkillTransform({
      sectionName: "Forced Connections Object Association Standards",
      ruSectionName: "Стандарты и регламенты: Forced Connections Object Association",
      instructions: [
        "Apply core domain tenets for Forced Connections Object Association.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Forced Connections Object Association.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","forced"],
    }),
  },

  "ideation-topup-question-storming-problem-reframing": {
    id: "ideation-topup-question-storming-problem-reframing",
    name: "QuestionStormingProblemReframingSkill",
    displayName: "Question Storming Problem Reframing",
    categoryId: "ideation",
    description: "Generates 50 questions about a problem before attempting to brainstorm any answers.",
    tags: ["ideation","ideation-topup","topup","question"],
    transform: createStandardSkillTransform({
      sectionName: "Question Storming Problem Reframing Standards",
      ruSectionName: "Стандарты и регламенты: Question Storming Problem Reframing",
      instructions: [
        "Apply core domain tenets for Question Storming Problem Reframing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Question Storming Problem Reframing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","question"],
    }),
  },

  "ideation-topup-superhero-persona-perspective-swap": {
    id: "ideation-topup-superhero-persona-perspective-swap",
    name: "SuperheroPersonaPerspectiveSwapSkill",
    displayName: "Superhero Persona Perspective Swap",
    categoryId: "ideation",
    description: "Asks 'How would Steve Jobs, Elon Musk, or Batman solve this problem?'.",
    tags: ["ideation","ideation-topup","topup","superhero"],
    transform: createStandardSkillTransform({
      sectionName: "Superhero Persona Perspective Swap Standards",
      ruSectionName: "Стандарты и регламенты: Superhero Persona Perspective Swap",
      instructions: [
        "Apply core domain tenets for Superhero Persona Perspective Swap.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Superhero Persona Perspective Swap.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","superhero"],
    }),
  },

  "ideation-topup-random-entry-dictionary-word-stimulus": {
    id: "ideation-topup-random-entry-dictionary-word-stimulus",
    name: "RandomEntryDictionaryWordStimulusSkill",
    displayName: "Random Entry Dictionary Word Stimulus",
    categoryId: "ideation",
    description: "Picks a random dictionary page to find unexpected metaphors for problem solving.",
    tags: ["ideation","ideation-topup","topup","random"],
    transform: createStandardSkillTransform({
      sectionName: "Random Entry Dictionary Word Stimulus Standards",
      ruSectionName: "Стандарты и регламенты: Random Entry Dictionary Word Stimulus",
      instructions: [
        "Apply core domain tenets for Random Entry Dictionary Word Stimulus.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Random Entry Dictionary Word Stimulus.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","random"],
    }),
  },

  "ideation-topup-attribute-listing-feature-decomposition": {
    id: "ideation-topup-attribute-listing-feature-decomposition",
    name: "AttributeListingFeatureDecompositionSkill",
    displayName: "Attribute Listing Feature Decomposition",
    categoryId: "ideation",
    description: "Lists all physical and functional attributes of a product, systematically tweaking each.",
    tags: ["ideation","ideation-topup","topup","attribute"],
    transform: createStandardSkillTransform({
      sectionName: "Attribute Listing Feature Decomposition Standards",
      ruSectionName: "Стандарты и регламенты: Attribute Listing Feature Decomposition",
      instructions: [
        "Apply core domain tenets for Attribute Listing Feature Decomposition.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Attribute Listing Feature Decomposition.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","attribute"],
    }),
  },

  "ideation-topup-synectics-making-the-strange-familiar": {
    id: "ideation-topup-synectics-making-the-strange-familiar",
    name: "SynecticsMakingtheStrangeFamiliarSkill",
    displayName: "Synectics Making the Strange Familiar",
    categoryId: "ideation",
    description: "Uses personal analogies, direct analogies, and fantasy analogies to reframe problems.",
    tags: ["ideation","ideation-topup","topup","synectics"],
    transform: createStandardSkillTransform({
      sectionName: "Synectics Making the Strange Familiar Standards",
      ruSectionName: "Стандарты и регламенты: Synectics Making the Strange Familiar",
      instructions: [
        "Apply core domain tenets for Synectics Making the Strange Familiar.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Synectics Making the Strange Familiar.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","synectics"],
    }),
  },

  "ideation-topup-concept-fan-problem-abstraction-ladder": {
    id: "ideation-topup-concept-fan-problem-abstraction-ladder",
    name: "ConceptFanProblemAbstractionLadderSkill",
    displayName: "Concept Fan Problem Abstraction Ladder",
    categoryId: "ideation",
    description: "Broadens or narrows problem statements to discover alternative solution spaces.",
    tags: ["ideation","ideation-topup","topup","concept"],
    transform: createStandardSkillTransform({
      sectionName: "Concept Fan Problem Abstraction Ladder Standards",
      ruSectionName: "Стандарты и регламенты: Concept Fan Problem Abstraction Ladder",
      instructions: [
        "Apply core domain tenets for Concept Fan Problem Abstraction Ladder.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Concept Fan Problem Abstraction Ladder.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","concept"],
    }),
  },

  "ideation-topup-wishful-thinking-magic-wand-sandbox": {
    id: "ideation-topup-wishful-thinking-magic-wand-sandbox",
    name: "WishfulThinkingMagicWandSandboxSkill",
    displayName: "Wishful Thinking Magic Wand Sandbox",
    categoryId: "ideation",
    description: "Asks 'If magic were real and cost zero, what would the perfect solution look like?'.",
    tags: ["ideation","ideation-topup","topup","wishful"],
    transform: createStandardSkillTransform({
      sectionName: "Wishful Thinking Magic Wand Sandbox Standards",
      ruSectionName: "Стандарты и регламенты: Wishful Thinking Magic Wand Sandbox",
      instructions: [
        "Apply core domain tenets for Wishful Thinking Magic Wand Sandbox.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Wishful Thinking Magic Wand Sandbox.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","wishful"],
    }),
  },

  "ideation-topup-zero-to-one-peter-thiel-contrarian-truth": {
    id: "ideation-topup-zero-to-one-peter-thiel-contrarian-truth",
    name: "ZeroToOnePeterThielContrarianTruthSkill",
    displayName: "Zero-To-One Peter Thiel Contrarian Truth",
    categoryId: "ideation",
    description: "Asks 'What important truth do very few people agree with you on?' to spot monopolies.",
    tags: ["ideation","ideation-topup","topup","zero"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-To-One Peter Thiel Contrarian Truth Standards",
      ruSectionName: "Стандарты и регламенты: Zero-To-One Peter Thiel Contrarian Truth",
      instructions: [
        "Apply core domain tenets for Zero-To-One Peter Thiel Contrarian Truth.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Zero-To-One Peter Thiel Contrarian Truth.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","zero"],
    }),
  },

  "ideation-topup-flywheel-momentum-loop-ideation": {
    id: "ideation-topup-flywheel-momentum-loop-ideation",
    name: "FlywheelMomentumLoopIdeationSkill",
    displayName: "Flywheel Momentum Loop Ideation",
    categoryId: "ideation",
    description: "Designs self-reinforcing business loops where each customer action drives the next.",
    tags: ["ideation","ideation-topup","topup","flywheel"],
    transform: createStandardSkillTransform({
      sectionName: "Flywheel Momentum Loop Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Flywheel Momentum Loop Ideation",
      instructions: [
        "Apply core domain tenets for Flywheel Momentum Loop Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Flywheel Momentum Loop Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","flywheel"],
    }),
  },

  "ideation-topup-network-effect-growth-engine-ideation": {
    id: "ideation-topup-network-effect-growth-engine-ideation",
    name: "NetworkEffectGrowthEngineIdeationSkill",
    displayName: "Network Effect Growth Engine Ideation",
    categoryId: "ideation",
    description: "Invents product features that become exponentially more valuable as more users join.",
    tags: ["ideation","ideation-topup","topup","network"],
    transform: createStandardSkillTransform({
      sectionName: "Network Effect Growth Engine Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Network Effect Growth Engine Ideation",
      instructions: [
        "Apply core domain tenets for Network Effect Growth Engine Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Network Effect Growth Engine Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","network"],
    }),
  },

  "ideation-topup-unbundling-monolithic-industry-services": {
    id: "ideation-topup-unbundling-monolithic-industry-services",
    name: "UnbundlingMonolithicIndustryServicesSkill",
    displayName: "Unbundling Monolithic Industry Services",
    categoryId: "ideation",
    description: "Unbundles complex corporate software suites into hyper-focused single-purpose apps.",
    tags: ["ideation","ideation-topup","topup","unbundling"],
    transform: createStandardSkillTransform({
      sectionName: "Unbundling Monolithic Industry Services Standards",
      ruSectionName: "Стандарты и регламенты: Unbundling Monolithic Industry Services",
      instructions: [
        "Apply core domain tenets for Unbundling Monolithic Industry Services.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Unbundling Monolithic Industry Services.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","unbundling"],
    }),
  },

  "ideation-topup-re-bundling-fragmented-tool-market": {
    id: "ideation-topup-re-bundling-fragmented-tool-market",
    name: "RebundlingFragmentedToolMarketSkill",
    displayName: "Re-bundling Fragmented Tool Market",
    categoryId: "ideation",
    description: "Re-bundles 10 disparate single-purpose tools into a unified seamless platform.",
    tags: ["ideation","ideation-topup","topup","re"],
    transform: createStandardSkillTransform({
      sectionName: "Re-bundling Fragmented Tool Market Standards",
      ruSectionName: "Стандарты и регламенты: Re-bundling Fragmented Tool Market",
      instructions: [
        "Apply core domain tenets for Re-bundling Fragmented Tool Market.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Re-bundling Fragmented Tool Market.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","re"],
    }),
  },

  "ideation-topup-freemium-viral-mechanics-ideation": {
    id: "ideation-topup-freemium-viral-mechanics-ideation",
    name: "FreemiumViralMechanicsIdeationSkill",
    displayName: "Freemium Viral Mechanics Ideation",
    categoryId: "ideation",
    description: "Designs viral sharing mechanics where free users naturally invite paying teammates.",
    tags: ["ideation","ideation-topup","topup","freemium"],
    transform: createStandardSkillTransform({
      sectionName: "Freemium Viral Mechanics Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Freemium Viral Mechanics Ideation",
      instructions: [
        "Apply core domain tenets for Freemium Viral Mechanics Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Freemium Viral Mechanics Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","freemium"],
    }),
  },

  "ideation-topup-product-led-growth-self-serve-onboarding": {
    id: "ideation-topup-product-led-growth-self-serve-onboarding",
    name: "ProductLedGrowthSelfServeOnboardingSkill",
    displayName: "Product-Led Growth Self-Serve Onboarding",
    categoryId: "ideation",
    description: "Ideates self-serve product flows that deliver Time-to-Value in under 60 seconds.",
    tags: ["ideation","ideation-topup","topup","product"],
    transform: createStandardSkillTransform({
      sectionName: "Product-Led Growth Self-Serve Onboarding Standards",
      ruSectionName: "Стандарты и регламенты: Product-Led Growth Self-Serve Onboarding",
      instructions: [
        "Apply core domain tenets for Product-Led Growth Self-Serve Onboarding.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product-Led Growth Self-Serve Onboarding.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","product"],
    }),
  },

  "ideation-topup-api-first-developer-platform-ideation": {
    id: "ideation-topup-api-first-developer-platform-ideation",
    name: "APIFirstDeveloperPlatformIdeationSkill",
    displayName: "API-First Developer Platform Ideation",
    categoryId: "ideation",
    description: "Re-imagines closed software as an open API platform for third-party developers.",
    tags: ["ideation","ideation-topup","topup","api"],
    transform: createStandardSkillTransform({
      sectionName: "API-First Developer Platform Ideation Standards",
      ruSectionName: "Стандарты и регламенты: API-First Developer Platform Ideation",
      instructions: [
        "Apply core domain tenets for API-First Developer Platform Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для API-First Developer Platform Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","api"],
    }),
  },

  "ideation-topup-marketplace-two-sided-liquidity-ideation": {
    id: "ideation-topup-marketplace-two-sided-liquidity-ideation",
    name: "MarketplaceTwoSidedLiquidityIdeationSkill",
    displayName: "Marketplace Two-Sided Liquidity Ideation",
    categoryId: "ideation",
    description: "Solves chicken-and-egg cold-start problems in two-sided buyer-seller marketplaces.",
    tags: ["ideation","ideation-topup","topup","marketplace"],
    transform: createStandardSkillTransform({
      sectionName: "Marketplace Two-Sided Liquidity Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Marketplace Two-Sided Liquidity Ideation",
      instructions: [
        "Apply core domain tenets for Marketplace Two-Sided Liquidity Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Marketplace Two-Sided Liquidity Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","marketplace"],
    }),
  },

  "ideation-topup-community-led-product-ideation": {
    id: "ideation-topup-community-led-product-ideation",
    name: "CommunityLedProductIdeationSkill",
    displayName: "Community-Led Product Ideation",
    categoryId: "ideation",
    description: "Builds product features that empower power users to create and share custom content.",
    tags: ["ideation","ideation-topup","topup","community"],
    transform: createStandardSkillTransform({
      sectionName: "Community-Led Product Ideation Standards",
      ruSectionName: "Стандарты и регламенты: Community-Led Product Ideation",
      instructions: [
        "Apply core domain tenets for Community-Led Product Ideation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Community-Led Product Ideation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","community"],
    }),
  },

  "ideation-topup-master-ideation-innovation-framework": {
    id: "ideation-topup-master-ideation-innovation-framework",
    name: "MasterIdeationInnovationFrameworkSkill",
    displayName: "Master Ideation Innovation Framework",
    categoryId: "ideation",
    description: "Applies world-class lateral thinking, SCAMPER, and design innovation methods.",
    tags: ["ideation","ideation-topup","topup","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Ideation Innovation Framework Standards",
      ruSectionName: "Стандарты и регламенты: Master Ideation Innovation Framework",
      instructions: [
        "Apply core domain tenets for Master Ideation Innovation Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Ideation Innovation Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["ideation","ideation-topup","topup","master"],
    }),
  },
  "ideation-multi-multi-perspective-scamper-innovation-matrix": {
    id: "ideation-multi-multi-perspective-scamper-innovation-matrix",
    name: "MultiPerspectiveSCAMPERInnovationMatrixSkill",
    displayName: "Multi Perspective SCAMPER Innovation Matrix",
    categoryId: "ideation",
    description: "Applies Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, and Reverse.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective SCAMPER Innovation Matrix",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective SCAMPER Innovation Matrix",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective SCAMPER Innovation Matrix.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective SCAMPER Innovation Matrix.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-angle-triz-theory-of-inventive-problem-solving": {
    id: "ideation-multi-multi-angle-triz-theory-of-inventive-problem-solving",
    name: "MultiAngleTRIZTheoryofInventiveProblemSolvingSkill",
    displayName: "Multi Angle TRIZ Theory of Inventive Problem Solving",
    categoryId: "ideation",
    description: "Solves technical contradictions using 40 TRIZ inventive principles and contradiction matrix.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Angle TRIZ Theory of Inventive Problem Solving",
      ruSectionName: "Композитный Multi-Skill: Multi Angle TRIZ Theory of Inventive Problem Solving",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Angle TRIZ Theory of Inventive Problem Solving.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Angle TRIZ Theory of Inventive Problem Solving.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-disruptive-technology-ideation-factory": {
    id: "ideation-multi-multi-horizon-disruptive-technology-ideation-factory",
    name: "MultiHorizonDisruptiveTechnologyIdeationFactorySkill",
    displayName: "Multi Horizon Disruptive Technology Ideation Factory",
    categoryId: "ideation",
    description: "Brainstorms product concepts leveraging emerging tech convergences (AI, Biotech, Quantum, Energy).",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Disruptive Technology Ideation Factory",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Disruptive Technology Ideation Factory",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Disruptive Technology Ideation Factory.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Disruptive Technology Ideation Factory.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-six-thinking-hats-edward-de-bono": {
    id: "ideation-multi-multi-perspective-six-thinking-hats-edward-de-bono",
    name: "MultiPerspectiveSixThinkingHatsEdwarddeBonoSkill",
    displayName: "Multi Perspective Six Thinking Hats Edward de Bono",
    categoryId: "ideation",
    description: "Iterates ideas across White (data), Red (feelings), Black (risk), Yellow (benefits), Green (creativity), Blue (process).",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Six Thinking Hats Edward de Bono",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Six Thinking Hats Edward de Bono",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Six Thinking Hats Edward de Bono.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Six Thinking Hats Edward de Bono.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-stage-design-sprint-innovation-ideation": {
    id: "ideation-multi-multi-stage-design-sprint-innovation-ideation",
    name: "MultiStageDesignSprintInnovationIdeationSkill",
    displayName: "Multi Stage Design Sprint Innovation Ideation",
    categoryId: "ideation",
    description: "Guides 5-day Google Ventures design sprint ideation from map to sketch, decide, prototype, test.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Design Sprint Innovation Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Design Sprint Innovation Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Design Sprint Innovation Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Design Sprint Innovation Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-cross-industry-biomimicry-innovation": {
    id: "ideation-multi-multi-category-cross-industry-biomimicry-innovation",
    name: "MultiCategoryCrossIndustryBiomimicryInnovationSkill",
    displayName: "Multi Category Cross Industry Biomimicry Innovation",
    categoryId: "ideation",
    description: "Translates biological nature mechanisms (e.g. lotus leaf, kingfisher beak) into engineering solutions.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Cross Industry Biomimicry Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Category Cross Industry Biomimicry Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Cross Industry Biomimicry Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Cross Industry Biomimicry Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-lateral-thinking-random-word-association": {
    id: "ideation-multi-multi-perspective-lateral-thinking-random-word-association",
    name: "MultiPerspectiveLateralThinkingRandomWordAssociationSkill",
    displayName: "Multi Perspective Lateral Thinking Random Word Association",
    categoryId: "ideation",
    description: "Breaks cognitive inertia using forced associations with random stimulus words and images.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Lateral Thinking Random Word Association",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Lateral Thinking Random Word Association",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Lateral Thinking Random Word Association.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Lateral Thinking Random Word Association.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-blue-ocean-uncontested-market-canvas": {
    id: "ideation-multi-multi-horizon-blue-ocean-uncontested-market-canvas",
    name: "MultiHorizonBlueOceanUncontestedMarketCanvasSkill",
    displayName: "Multi Horizon Blue Ocean Uncontested Market Canvas",
    categoryId: "ideation",
    description: "Brainstorms radical market offerings eliminating industry standards and creating new demand.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Blue Ocean Uncontested Market Canvas",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Blue Ocean Uncontested Market Canvas",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Blue Ocean Uncontested Market Canvas.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Blue Ocean Uncontested Market Canvas.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-persona-brainstorming-anti-pattern-inversion": {
    id: "ideation-multi-multi-persona-brainstorming-anti-pattern-inversion",
    name: "MultiPersonaBrainstormingAntiPatternInversionSkill",
    displayName: "Multi Persona Brainstorming Anti Pattern Inversion",
    categoryId: "ideation",
    description: "Generates worst possible ideas first ('Reverse Brainstorming') to uncover hidden solutions.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Persona Brainstorming Anti Pattern Inversion",
      ruSectionName: "Композитный Multi-Skill: Multi Persona Brainstorming Anti Pattern Inversion",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Persona Brainstorming Anti Pattern Inversion.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Persona Brainstorming Anti Pattern Inversion.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-layer-crazy-eights-rapid-prototyping-workshop": {
    id: "ideation-multi-multi-layer-crazy-eights-rapid-prototyping-workshop",
    name: "MultiLayerCrazyEightsRapidPrototypingWorkshopSkill",
    displayName: "Multi Layer Crazy Eights Rapid Prototyping Workshop",
    categoryId: "ideation",
    description: "Generates 8 distinct visual or conceptual product ideas in 8 intense minutes.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Crazy Eights Rapid Prototyping Workshop",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Crazy Eights Rapid Prototyping Workshop",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Crazy Eights Rapid Prototyping Workshop.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Crazy Eights Rapid Prototyping Workshop.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-angle-customer-pain-point-first-principles-ideation": {
    id: "ideation-multi-multi-angle-customer-pain-point-first-principles-ideation",
    name: "MultiAngleCustomerPainPointFirstPrinciplesIdeationSkill",
    displayName: "Multi Angle Customer Pain Point First Principles Ideation",
    categoryId: "ideation",
    description: "Deconstructs customer frustrations to fundamental truths, re-building innovative solutions.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Angle Customer Pain Point First Principles Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Angle Customer Pain Point First Principles Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Angle Customer Pain Point First Principles Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Angle Customer Pain Point First Principles Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-future-back-trend-extrapolation-lab": {
    id: "ideation-multi-multi-horizon-future-back-trend-extrapolation-lab",
    name: "MultiHorizonFutureBackTrendExtrapolationLabSkill",
    displayName: "Multi Horizon Future Back Trend Extrapolation Lab",
    categoryId: "ideation",
    description: "Envisions 2035 future worlds and works backwards deriving necessary breakthrough products today.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Future Back Trend Extrapolation Lab",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Future Back Trend Extrapolation Lab",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Future Back Trend Extrapolation Lab.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Future Back Trend Extrapolation Lab.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-cross-industry-analogy-transfer": {
    id: "ideation-multi-multi-category-cross-industry-analogy-transfer",
    name: "MultiCategoryCrossIndustryAnalogyTransferSkill",
    displayName: "Multi Category Cross Industry Analogy Transfer",
    categoryId: "ideation",
    description: "Transfers successful business models from one industry (e.g. Uber/Airbnb) into unrelated sectors.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Cross Industry Analogy Transfer",
      ruSectionName: "Композитный Multi-Skill: Multi Category Cross Industry Analogy Transfer",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Cross Industry Analogy Transfer.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Cross Industry Analogy Transfer.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-morphological-analysis-problem-grid": {
    id: "ideation-multi-multi-perspective-morphological-analysis-problem-grid",
    name: "MultiPerspectiveMorphologicalAnalysisProblemGridSkill",
    displayName: "Multi Perspective Morphological Analysis Problem Grid",
    categoryId: "ideation",
    description: "Combines parameters in a multi-dimensional matrix generating thousands of unique product permutations.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Morphological Analysis Problem Grid",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Morphological Analysis Problem Grid",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Morphological Analysis Problem Grid.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Morphological Analysis Problem Grid.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-stage-b2b-enterprise-saas-micro-feature-innovation": {
    id: "ideation-multi-multi-stage-b2b-enterprise-saas-micro-feature-innovation",
    name: "MultiStageB2BEnterpriseSaaSMicroFeatureInnovationSkill",
    displayName: "Multi Stage B2B Enterprise SaaS Micro Feature Innovation",
    categoryId: "ideation",
    description: "Ideates workflow automation micro-features that eliminate 80% of repetitive enterprise tasks.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage B2B Enterprise SaaS Micro Feature Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage B2B Enterprise SaaS Micro Feature Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage B2B Enterprise SaaS Micro Feature Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage B2B Enterprise SaaS Micro Feature Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-sustainability-circular-economy-ideation": {
    id: "ideation-multi-multi-horizon-sustainability-circular-economy-ideation",
    name: "MultiHorizonSustainabilityCircularEconomyIdeationSkill",
    displayName: "Multi Horizon Sustainability Circular Economy Ideation",
    categoryId: "ideation",
    description: "Brainstorms cradle-to-cradle zero-waste product designs and closed-loop material recycling.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Sustainability Circular Economy Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Sustainability Circular Economy Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Sustainability Circular Economy Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Sustainability Circular Economy Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-layer-brainwriting-6-3-5-group-ideation": {
    id: "ideation-multi-multi-layer-brainwriting-6-3-5-group-ideation",
    name: "MultiLayerBrainwriting635GroupIdeationSkill",
    displayName: "Multi Layer Brainwriting 6-3-5 Group Ideation",
    categoryId: "ideation",
    description: "Runs silent 6-3-5 brainwriting rounds where 6 people write 3 ideas in 5 minutes, passing sheets.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Brainwriting 6-3-5 Group Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Brainwriting 6-3-5 Group Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Brainwriting 6-3-5 Group Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Brainwriting 6-3-5 Group Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-trendjacking-cultural-meme-productization": {
    id: "ideation-multi-multi-perspective-trendjacking-cultural-meme-productization",
    name: "MultiPerspectiveTrendjackingCulturalMemeProductizationSkill",
    displayName: "Multi Perspective Trendjacking Cultural Meme Productization",
    categoryId: "ideation",
    description: "Translates viral internet memes and cultural shifts into real-world consumer products.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Trendjacking Cultural Meme Productization",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Trendjacking Cultural Meme Productization",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Trendjacking Cultural Meme Productization.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Trendjacking Cultural Meme Productization.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-angle-unmet-customer-jobs-to-be-done-ideation": {
    id: "ideation-multi-multi-angle-unmet-customer-jobs-to-be-done-ideation",
    name: "MultiAngleUnmetCustomerJobsToBeDoneIdeationSkill",
    displayName: "Multi Angle Unmet Customer Jobs To Be Done Ideation",
    categoryId: "ideation",
    description: "Ideates solutions for under-served customer jobs with high importance and low satisfaction.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Angle Unmet Customer Jobs To Be Done Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Angle Unmet Customer Jobs To Be Done Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Angle Unmet Customer Jobs To Be Done Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Angle Unmet Customer Jobs To Be Done Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-ai-native-workflow-re-imagination": {
    id: "ideation-multi-multi-horizon-ai-native-workflow-re-imagination",
    name: "MultiHorizonAINativeWorkflowReImaginationSkill",
    displayName: "Multi Horizon AI-Native Workflow Re-Imagination",
    categoryId: "ideation",
    description: "Re-imagines traditional software workflows assuming zero-cost instant AI intelligence.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon AI-Native Workflow Re-Imagination",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon AI-Native Workflow Re-Imagination",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon AI-Native Workflow Re-Imagination.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon AI-Native Workflow Re-Imagination.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-stage-e-commerce-viral-hook-product-ideation": {
    id: "ideation-multi-multi-stage-e-commerce-viral-hook-product-ideation",
    name: "MultiStageECommerceViralHookProductIdeationSkill",
    displayName: "Multi Stage E-Commerce Viral Hook Product Ideation",
    categoryId: "ideation",
    description: "Ideates visual, highly demonstrative physical products engineered for social media virality.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage E-Commerce Viral Hook Product Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage E-Commerce Viral Hook Product Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage E-Commerce Viral Hook Product Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage E-Commerce Viral Hook Product Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-low-code-no-code-saas-micro-app-ideation": {
    id: "ideation-multi-multi-category-low-code-no-code-saas-micro-app-ideation",
    name: "MultiCategoryLowCodeNoCodeSaaSMicroAppIdeationSkill",
    displayName: "Multi Category Low-Code No-Code SaaS Micro App Ideation",
    categoryId: "ideation",
    description: "Ideates niche, highly profitable micro-SaaS tools solvable with low-code automation.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Low-Code No-Code SaaS Micro App Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Category Low-Code No-Code SaaS Micro App Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Low-Code No-Code SaaS Micro App Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Low-Code No-Code SaaS Micro App Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-frictionless-ux-delight-feature-brainstorm": {
    id: "ideation-multi-multi-perspective-frictionless-ux-delight-feature-brainstorm",
    name: "MultiPerspectiveFrictionlessUXDelightFeatureBrainstormSkill",
    displayName: "Multi Perspective Frictionless UX Delight Feature Brainstorm",
    categoryId: "ideation",
    description: "Ideates magical micro-interactions that surprise and delight users during mundane app tasks.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Frictionless UX Delight Feature Brainstorm",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Frictionless UX Delight Feature Brainstorm",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Frictionless UX Delight Feature Brainstorm.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Frictionless UX Delight Feature Brainstorm.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-spatial-computing-ar-vr-experience-ideation": {
    id: "ideation-multi-multi-horizon-spatial-computing-ar-vr-experience-ideation",
    name: "MultiHorizonSpatialComputingARVRExperienceIdeationSkill",
    displayName: "Multi Horizon Spatial Computing AR VR Experience Ideation",
    categoryId: "ideation",
    description: "Brainstorms immersive 3D spatial user experiences for Apple Vision Pro and Meta Quest.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Spatial Computing AR VR Experience Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Spatial Computing AR VR Experience Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Spatial Computing AR VR Experience Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Spatial Computing AR VR Experience Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-hardware-tech-accessory-innovation": {
    id: "ideation-multi-multi-category-hardware-tech-accessory-innovation",
    name: "MultiCategoryHardwareTechAccessoryInnovationSkill",
    displayName: "Multi Category Hardware Tech Accessory Innovation",
    categoryId: "ideation",
    description: "Ideates ergonomic, modular, and multi-functional desk setup and mobile accessories.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Hardware Tech Accessory Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Category Hardware Tech Accessory Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Hardware Tech Accessory Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Hardware Tech Accessory Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-gamification-mechanics-ideation": {
    id: "ideation-multi-multi-perspective-gamification-mechanics-ideation",
    name: "MultiPerspectiveGamificationMechanicsIdeationSkill",
    displayName: "Multi Perspective Gamification Mechanics Ideation",
    categoryId: "ideation",
    description: "Ideates habit-forming game mechanics (streaks, mystery boxes, achievements) for non-game apps.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Gamification Mechanics Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Gamification Mechanics Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Gamification Mechanics Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Gamification Mechanics Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-stage-content-creator-monetization-product-ideation": {
    id: "ideation-multi-multi-stage-content-creator-monetization-product-ideation",
    name: "MultiStageContentCreatorMonetizationProductIdeationSkill",
    displayName: "Multi Stage Content Creator Monetization Product Ideation",
    categoryId: "ideation",
    description: "Ideates novel digital products, newsletters, communities, and courses for content creators.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Content Creator Monetization Product Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Content Creator Monetization Product Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Content Creator Monetization Product Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Content Creator Monetization Product Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-layer-zero-to-one-radical-paradigm-shift-lab": {
    id: "ideation-multi-multi-layer-zero-to-one-radical-paradigm-shift-lab",
    name: "MultiLayerZeroToOneRadicalParadigmShiftLabSkill",
    displayName: "Multi Layer Zero-To-One Radical Paradigm Shift Lab",
    categoryId: "ideation",
    description: "Ideates radical 10x solutions that make existing industry incumbent products obsolete.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Zero-To-One Radical Paradigm Shift Lab",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Zero-To-One Radical Paradigm Shift Lab",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Zero-To-One Radical Paradigm Shift Lab.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Zero-To-One Radical Paradigm Shift Lab.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-smart-home-iot-ecosystem-automation": {
    id: "ideation-multi-multi-horizon-smart-home-iot-ecosystem-automation",
    name: "MultiHorizonSmartHomeIoTEcosystemAutomationSkill",
    displayName: "Multi Horizon Smart Home IoT Ecosystem Automation",
    categoryId: "ideation",
    description: "Brainstorms contextual smart home automations linking sensors, energy, and comfort.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Smart Home IoT Ecosystem Automation",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Smart Home IoT Ecosystem Automation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Smart Home IoT Ecosystem Automation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Smart Home IoT Ecosystem Automation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-culinary-food-beverage-taste-flavor-fusion": {
    id: "ideation-multi-multi-category-culinary-food-beverage-taste-flavor-fusion",
    name: "MultiCategoryCulinaryFoodBeverageTasteFlavorFusionSkill",
    displayName: "Multi Category Culinary Food Beverage Taste Flavor Fusion",
    categoryId: "ideation",
    description: "Ideates unexpected flavor combinations, plant-based alternatives, and functional beverages.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Culinary Food Beverage Taste Flavor Fusion",
      ruSectionName: "Композитный Multi-Skill: Multi Category Culinary Food Beverage Taste Flavor Fusion",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Culinary Food Beverage Taste Flavor Fusion.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Culinary Food Beverage Taste Flavor Fusion.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-stage-fintech-financial-inclusion-product-ideation": {
    id: "ideation-multi-multi-stage-fintech-financial-inclusion-product-ideation",
    name: "MultiStageFinTechFinancialInclusionProductIdeationSkill",
    displayName: "Multi Stage FinTech Financial Inclusion Product Ideation",
    categoryId: "ideation",
    description: "Ideates micro-loan, fractional investing, and mobile payment tools for underserved populations.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage FinTech Financial Inclusion Product Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage FinTech Financial Inclusion Product Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage FinTech Financial Inclusion Product Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage FinTech Financial Inclusion Product Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-educational-edtech-engagement-ideation": {
    id: "ideation-multi-multi-perspective-educational-edtech-engagement-ideation",
    name: "MultiPerspectiveEducationalEdTechEngagementIdeationSkill",
    displayName: "Multi Perspective Educational EdTech Engagement Ideation",
    categoryId: "ideation",
    description: "Ideates interactive learning games and AI tutors making difficult topics fun.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Educational EdTech Engagement Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Educational EdTech Engagement Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Educational EdTech Engagement Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Educational EdTech Engagement Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-commercial-space-economy-orbital-business": {
    id: "ideation-multi-multi-horizon-commercial-space-economy-orbital-business",
    name: "MultiHorizonCommercialSpaceEconomyOrbitalBusinessSkill",
    displayName: "Multi Horizon Commercial Space Economy Orbital Business",
    categoryId: "ideation",
    description: "Brainstorms commercial business models in satellite servicing, space tourism, and microgravity manufacturing.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Commercial Space Economy Orbital Business",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Commercial Space Economy Orbital Business",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Commercial Space Economy Orbital Business.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Commercial Space Economy Orbital Business.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-sustainable-fashion-textile-circularity": {
    id: "ideation-multi-multi-category-sustainable-fashion-textile-circularity",
    name: "MultiCategorySustainableFashionTextileCircularitySkill",
    displayName: "Multi Category Sustainable Fashion Textile Circularity",
    categoryId: "ideation",
    description: "Ideates biodegradable fabrics, rental fashion subscription models, and upcycled garments.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Sustainable Fashion Textile Circularity",
      ruSectionName: "Композитный Multi-Skill: Multi Category Sustainable Fashion Textile Circularity",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Sustainable Fashion Textile Circularity.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Sustainable Fashion Textile Circularity.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-urban-livability-mobility-innovation": {
    id: "ideation-multi-multi-perspective-urban-livability-mobility-innovation",
    name: "MultiPerspectiveUrbanLivabilityMobilityInnovationSkill",
    displayName: "Multi Perspective Urban Livability Mobility Innovation",
    categoryId: "ideation",
    description: "Brainstorms micro-mobility solutions, pocket parks, and neighborhood community sharing hubs.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Urban Livability Mobility Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Urban Livability Mobility Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Urban Livability Mobility Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Urban Livability Mobility Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-stage-healthcare-remote-patient-monitoring-ideation": {
    id: "ideation-multi-multi-stage-healthcare-remote-patient-monitoring-ideation",
    name: "MultiStageHealthcareRemotePatientMonitoringIdeationSkill",
    displayName: "Multi Stage Healthcare Remote Patient Monitoring Ideation",
    categoryId: "ideation",
    description: "Ideates wearable biometric sensor monitoring tools preventing chronic disease flare-ups.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Healthcare Remote Patient Monitoring Ideation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Healthcare Remote Patient Monitoring Ideation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Healthcare Remote Patient Monitoring Ideation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Healthcare Remote Patient Monitoring Ideation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-layer-subconscious-mind-association-brainstorm": {
    id: "ideation-multi-multi-layer-subconscious-mind-association-brainstorm",
    name: "MultiLayerSubconsciousMindAssociationBrainstormSkill",
    displayName: "Multi Layer Subconscious Mind Association Brainstorm",
    categoryId: "ideation",
    description: "Uses dream logic, guided imagery, and subconscious prompts to unlock artistic breakthroughs.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Subconscious Mind Association Brainstorm",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Subconscious Mind Association Brainstorm",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Subconscious Mind Association Brainstorm.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Subconscious Mind Association Brainstorm.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-clean-energy-storage-grid-decarbonization": {
    id: "ideation-multi-multi-horizon-clean-energy-storage-grid-decarbonization",
    name: "MultiHorizonCleanEnergyStorageGridDecarbonizationSkill",
    displayName: "Multi Horizon Clean Energy Storage Grid Decarbonization",
    categoryId: "ideation",
    description: "Ideates long-duration grid battery storage, geothermal, and green hydrogen solutions.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Clean Energy Storage Grid Decarbonization",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Clean Energy Storage Grid Decarbonization",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Clean Energy Storage Grid Decarbonization.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Clean Energy Storage Grid Decarbonization.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-hospitality-boutique-experience-innovation": {
    id: "ideation-multi-multi-category-hospitality-boutique-experience-innovation",
    name: "MultiCategoryHospitalityBoutiqueExperienceInnovationSkill",
    displayName: "Multi Category Hospitality Boutique Experience Innovation",
    categoryId: "ideation",
    description: "Ideates unique thematic hotel stays, immersive dining pop-ups, and experiential travel.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Hospitality Boutique Experience Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Category Hospitality Boutique Experience Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Hospitality Boutique Experience Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Hospitality Boutique Experience Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-community-led-growth-social-features": {
    id: "ideation-multi-multi-perspective-community-led-growth-social-features",
    name: "MultiPerspectiveCommunityLedGrowthSocialFeaturesSkill",
    displayName: "Multi Perspective Community-Led Growth Social Features",
    categoryId: "ideation",
    description: "Ideates peer-to-peer sharing, user-generated template hubs, and collaborative spaces.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Community-Led Growth Social Features",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Community-Led Growth Social Features",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Community-Led Growth Social Features.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Community-Led Growth Social Features.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-stage-agritech-precision-farming-innovation": {
    id: "ideation-multi-multi-stage-agritech-precision-farming-innovation",
    name: "MultiStageAgritechPrecisionFarmingInnovationSkill",
    displayName: "Multi Stage Agritech Precision Farming Innovation",
    categoryId: "ideation",
    description: "Ideates autonomous weeding robots, vertical farm hydroponics, and soil sensor networks.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Agritech Precision Farming Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Agritech Precision Farming Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Agritech Precision Farming Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Agritech Precision Farming Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-layer-intellectual-property-patent-invention-mine": {
    id: "ideation-multi-multi-layer-intellectual-property-patent-invention-mine",
    name: "MultiLayerIntellectualPropertyPatentInventionMineSkill",
    displayName: "Multi Layer Intellectual Property Patent Invention Mine",
    categoryId: "ideation",
    description: "Scans core technology capabilities generating patentable novelty variations and claims.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Intellectual Property Patent Invention Mine",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Intellectual Property Patent Invention Mine",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Intellectual Property Patent Invention Mine.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Intellectual Property Patent Invention Mine.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-autonomous-transport-logistics-fleet": {
    id: "ideation-multi-multi-horizon-autonomous-transport-logistics-fleet",
    name: "MultiHorizonAutonomousTransportLogisticsFleetSkill",
    displayName: "Multi Horizon Autonomous Transport Logistics Fleet",
    categoryId: "ideation",
    description: "Brainstorms autonomous drone delivery networks, self-driving freight, and micro-hubs.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Autonomous Transport Logistics Fleet",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Autonomous Transport Logistics Fleet",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Autonomous Transport Logistics Fleet.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Autonomous Transport Logistics Fleet.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-pet-care-wellness-technology-innovation": {
    id: "ideation-multi-multi-category-pet-care-wellness-technology-innovation",
    name: "MultiCategoryPetCareWellnessTechnologyInnovationSkill",
    displayName: "Multi Category Pet Care Wellness Technology Innovation",
    categoryId: "ideation",
    description: "Ideates smart pet feeders, health trackers, GPS collars, and interactive pet toys.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Pet Care Wellness Technology Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Category Pet Care Wellness Technology Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Pet Care Wellness Technology Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Pet Care Wellness Technology Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-senior-living-elder-care-innovation": {
    id: "ideation-multi-multi-perspective-senior-living-elder-care-innovation",
    name: "MultiPerspectiveSeniorLivingElderCareInnovationSkill",
    displayName: "Multi Perspective Senior Living Elder Care Innovation",
    categoryId: "ideation",
    description: "Ideates fall-detection sensors, memory stimulation games, and mobility assistance aids.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Senior Living Elder Care Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Senior Living Elder Care Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Senior Living Elder Care Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Senior Living Elder Care Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-stage-maritime-freight-ocean-plastic-cleanup": {
    id: "ideation-multi-multi-stage-maritime-freight-ocean-plastic-cleanup",
    name: "MultiStageMaritimeFreightOceanPlasticCleanupSkill",
    displayName: "Multi Stage Maritime Freight Ocean Plastic Cleanup",
    categoryId: "ideation",
    description: "Ideates autonomous ocean plastic skimming barriers and river interceptor vessels.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Maritime Freight Ocean Plastic Cleanup",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Maritime Freight Ocean Plastic Cleanup",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Maritime Freight Ocean Plastic Cleanup.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Maritime Freight Ocean Plastic Cleanup.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-layer-deep-tech-synthetic-biology-material-innovation": {
    id: "ideation-multi-multi-layer-deep-tech-synthetic-biology-material-innovation",
    name: "MultiLayerDeepTechSyntheticBiologyMaterialInnovationSkill",
    displayName: "Multi Layer Deep Tech Synthetic Biology Material Innovation",
    categoryId: "ideation",
    description: "Ideates lab-grown leather, spider silk materials, and engineered enzyme plastics.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Deep Tech Synthetic Biology Material Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Deep Tech Synthetic Biology Material Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Deep Tech Synthetic Biology Material Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Deep Tech Synthetic Biology Material Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-quantum-computing-algorithm-breakthrough": {
    id: "ideation-multi-multi-horizon-quantum-computing-algorithm-breakthrough",
    name: "MultiHorizonQuantumComputingAlgorithmBreakthroughSkill",
    displayName: "Multi Horizon Quantum Computing Algorithm Breakthrough",
    categoryId: "ideation",
    description: "Brainstorms quantum optimization applications in drug discovery, battery chem, and logistics.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Quantum Computing Algorithm Breakthrough",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Quantum Computing Algorithm Breakthrough",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Quantum Computing Algorithm Breakthrough.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Quantum Computing Algorithm Breakthrough.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-music-sound-audio-tech-innovation": {
    id: "ideation-multi-multi-category-music-sound-audio-tech-innovation",
    name: "MultiCategoryMusicSoundAudioTechInnovationSkill",
    displayName: "Multi Category Music Sound Audio Tech Innovation",
    categoryId: "ideation",
    description: "Ideates spatial audio headphones, AI melody generation plugins, and adaptive soundscapes.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Music Sound Audio Tech Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Category Music Sound Audio Tech Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Music Sound Audio Tech Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Music Sound Audio Tech Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-non-profit-social-impact-innovation": {
    id: "ideation-multi-multi-perspective-non-profit-social-impact-innovation",
    name: "MultiPerspectiveNonProfitSocialImpactInnovationSkill",
    displayName: "Multi Perspective Non-Profit Social Impact Innovation",
    categoryId: "ideation",
    description: "Ideates scalable non-profit models addressing homelessness, literacy, and clean water.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Non-Profit Social Impact Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Non-Profit Social Impact Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Non-Profit Social Impact Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Non-Profit Social Impact Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-stage-construction-pre-fab-modular-housing": {
    id: "ideation-multi-multi-stage-construction-pre-fab-modular-housing",
    name: "MultiStageConstructionPreFabModularHousingSkill",
    displayName: "Multi Stage Construction Pre-Fab Modular Housing",
    categoryId: "ideation",
    description: "Ideates 3D-printed homes, flat-pack modular building kits, and sustainable mass timber.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Construction Pre-Fab Modular Housing",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Construction Pre-Fab Modular Housing",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Construction Pre-Fab Modular Housing.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Construction Pre-Fab Modular Housing.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-layer-micro-mobility-electric-bike-cargo-innovation": {
    id: "ideation-multi-multi-layer-micro-mobility-electric-bike-cargo-innovation",
    name: "MultiLayerMicroMobilityElectricBikeCargoInnovationSkill",
    displayName: "Multi Layer Micro-Mobility Electric Bike Cargo Innovation",
    categoryId: "ideation",
    description: "Ideates heavy-payload electric cargo bikes replacing urban delivery vans.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Micro-Mobility Electric Bike Cargo Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Micro-Mobility Electric Bike Cargo Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Micro-Mobility Electric Bike Cargo Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Micro-Mobility Electric Bike Cargo Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-artificial-general-intelligence-agi-society": {
    id: "ideation-multi-multi-horizon-artificial-general-intelligence-agi-society",
    name: "MultiHorizonArtificialGeneralIntelligenceAGISocietySkill",
    displayName: "Multi Horizon Artificial General Intelligence AGI Society",
    categoryId: "ideation",
    description: "Envisions post-scarcity economic models, universal basic assets, and AI human symbiosis.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Artificial General Intelligence AGI Society",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Artificial General Intelligence AGI Society",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Artificial General Intelligence AGI Society.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Artificial General Intelligence AGI Society.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-fitness-wellness-recovery-tech-innovation": {
    id: "ideation-multi-multi-category-fitness-wellness-recovery-tech-innovation",
    name: "MultiCategoryFitnessWellnessRecoveryTechInnovationSkill",
    displayName: "Multi Category Fitness Wellness Recovery Tech Innovation",
    categoryId: "ideation",
    description: "Ideates cold plunge tubs, infrared sauna blankets, and percussion massage tools.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Fitness Wellness Recovery Tech Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Category Fitness Wellness Recovery Tech Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Fitness Wellness Recovery Tech Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Fitness Wellness Recovery Tech Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-perspective-e-sports-vr-gaming-arena-innovation": {
    id: "ideation-multi-multi-perspective-e-sports-vr-gaming-arena-innovation",
    name: "MultiPerspectiveESportsVRGamingArenaInnovationSkill",
    displayName: "Multi Perspective E-Sports VR Gaming Arena Innovation",
    categoryId: "ideation",
    description: "Ideates haptic feedback suits, omni-directional treadmills, and spectator VR modes.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective E-Sports VR Gaming Arena Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective E-Sports VR Gaming Arena Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective E-Sports VR Gaming Arena Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective E-Sports VR Gaming Arena Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-stage-supply-chain-reusable-packaging-system": {
    id: "ideation-multi-multi-stage-supply-chain-reusable-packaging-system",
    name: "MultiStageSupplyChainReusablePackagingSystemSkill",
    displayName: "Multi Stage Supply Chain Reusable Packaging System",
    categoryId: "ideation",
    description: "Ideates durable, trackable tote shipping containers eliminating single-use cardboard.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Supply Chain Reusable Packaging System",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Supply Chain Reusable Packaging System",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Supply Chain Reusable Packaging System.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Supply Chain Reusable Packaging System.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-layer-chemical-material-recycling-catalyst": {
    id: "ideation-multi-multi-layer-chemical-material-recycling-catalyst",
    name: "MultiLayerChemicalMaterialRecyclingCatalystSkill",
    displayName: "Multi Layer Chemical Material Recycling Catalyst",
    categoryId: "ideation",
    description: "Ideates chemical catalysts breaking down mixed polyester/cotton textiles into raw monomers.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Chemical Material Recycling Catalyst",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Chemical Material Recycling Catalyst",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Chemical Material Recycling Catalyst.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Chemical Material Recycling Catalyst.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-autonomous-mining-drone-fleet-innovation": {
    id: "ideation-multi-multi-horizon-autonomous-mining-drone-fleet-innovation",
    name: "MultiHorizonAutonomousMiningDroneFleetInnovationSkill",
    displayName: "Multi Horizon Autonomous Mining Drone Fleet Innovation",
    categoryId: "ideation",
    description: "Brainstorms subterranean mapping drones and autonomous electric haul trucks.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Autonomous Mining Drone Fleet Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Autonomous Mining Drone Fleet Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Autonomous Mining Drone Fleet Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Autonomous Mining Drone Fleet Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-category-artisan-craft-heritage-modernization": {
    id: "ideation-multi-multi-category-artisan-craft-heritage-modernization",
    name: "MultiCategoryArtisanCraftHeritageModernizationSkill",
    displayName: "Multi Category Artisan Craft Heritage Modernization",
    categoryId: "ideation",
    description: "Ideates modern tech enhancements for traditional pottery, woodworking, and weaving.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Category Artisan Craft Heritage Modernization",
      ruSectionName: "Композитный Multi-Skill: Multi Category Artisan Craft Heritage Modernization",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Category Artisan Craft Heritage Modernization.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Category Artisan Craft Heritage Modernization.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },

  "ideation-multi-multi-horizon-master-ideation-innovation-blueprint-engine": {
    id: "ideation-multi-multi-horizon-master-ideation-innovation-blueprint-engine",
    name: "MultiHorizonMasterIdeationInnovationBlueprintEngineSkill",
    displayName: "Multi Horizon Master Ideation Innovation Blueprint Engine",
    categoryId: "ideation",
    description: "Enforces master inventive problem solving, cross-domain breakthrough ideation, and disruptive vision.",
    tags: ["ideation","multi-skill","ideation-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Ideation Innovation Blueprint Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Ideation Innovation Blueprint Engine",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Master Ideation Innovation Blueprint Engine.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Master Ideation Innovation Blueprint Engine.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["ideation","multi-skill","ideation-multi"],
    }),
  },
};
