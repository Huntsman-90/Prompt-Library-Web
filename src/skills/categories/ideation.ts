import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
