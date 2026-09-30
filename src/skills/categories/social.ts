import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const SOCIAL_SKILLS: Record<string, SkillDefinition> = {
  'viral-twitter-x-thread-craft': {
    id: 'viral-twitter-x-thread-craft',
    name: 'ViralTwitterXThreadCraftSkill',
    displayName: 'High-Retention X/Twitter Thread Craft',
    categoryId: 'social',
    description: 'Structures viral X (Twitter) threads: irresistible hook tweet, punchy 5-7 step insights, visual pattern interrupts, and CTA recap.',
    tags: ['social', 'twitter', 'threads', 'viral', 'social-media', 'copywriting'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Вирусного Треда для X / Twitter',
        'High-Retention X / Twitter Thread Specification',
        [
          '- **Твит 1: Неотразимый Хук (Hook)**: Провокационный факт или контринтуитивный инсайт, заставляющий развернуть тред (с иконкой 🧵).',
          '- **Твиты 2–7: Плотная польза**: Каждый твит содержит 1 законченную мысль с буллетами и без лишней воды.',
          '- **Финальный твит: Резюме и CTA**: Краткое TL;DR саммари с призывом подписаться и сделать репост (RT).',
        ],
        [
          '- **Tweet 1: High-Conversion Hook**: Provocative contrarian insight or quantified breakdown compelling clicks (tagged with 🧵).',
          '- **Tweets 2-7: Dense Value Drops**: Self-contained tactical insights formatted with dense whitespace and bulleted lists.',
          '- **Final Tweet: TL;DR Recap & CTA**: Executive summary accompanied by a clear retweet/follow call-to-action.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'linkedin-thought-leadership': {
    id: 'linkedin-thought-leadership',
    name: 'LinkedinThoughtLeadershipSkill',
    displayName: 'LinkedIn Thought Leadership Architecture',
    categoryId: 'social',
    description: 'Formats high-engagement LinkedIn posts: 3-line hook before "see more", whitespace spacing, relatable narrative, and business insight.',
    tags: ['social', 'linkedin', 'thought-leadership', 'b2b-social', 'networking', 'branding'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формат Публикации в LinkedIn (Thought Leadership)',
        'LinkedIn Thought Leadership Post Specification',
        [
          '- **Первые 3 строки (До кнопки «Еще...»)**: Интригующий зачин, заставляющий кликнуть кнопку разворота поста.',
          '- **Воздушная верстка (Whitespace)**: Короткие абзацы по 1–2 предложения с пустыми строками между ними для удобства чтения с мобильных.',
          '- **Бизнес-инсайт и вопрос аудитории**: Глубокий профессиональный вывод и открытый вопрос в конце для стимуляции комментариев.',
        ],
        [
          '- **Top 3-Line Hook**: High-tension opening lines engineered to drive "see more" click-through rates.',
          '- **Mobile Whitespace Formatting**: Breathable layout (1-2 sentence paragraphs separated by single blank lines).',
          '- **Actionable Enterprise Takeaway**: Deep strategic lesson concluded with an engaging open-ended question sparking debate.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'community-moderation-guidelines': {
    id: 'community-moderation-guidelines',
    name: 'CommunityModerationGuidelinesSkill',
    displayName: 'Community Moderation & Strikes Policy',
    categoryId: 'social',
    description: 'Drafts transparent community rules, toxic behavior definitions, progressive disciplinary strike ladders (Warn -> Mute -> Ban).',
    tags: ['social', 'community', 'moderation', 'safety', 'guidelines', 'discord'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Правила Сообщества и Регламент Модерации',
        'Community Guidelines & Moderation Protocol',
        [
          '- **Четкие правила поведения**: Запрет токсичности, доксинга, спама, несанкционированной рекламы и троллинга.',
          '- **Лестница дисциплинарных мер (3 Strikes)**: 1) Официальное предупреждение в ЛС, 2) Мут на 24 часа, 3) Перманентный бан.',
          '- **Процедура апелляции**: Понятный регламент подачи заявки на пересмотр бана через тикет-систему.',
        ],
        [
          '- **Zero-Tolerance Violations**: Explicit prohibitions against harassment, doxxing, unapproved self-promotion, and coordinated trolling.',
          '- **Graduated 3-Strike Disciplinary Ladder**: 1) Formal logged warning, 2) 24h temporary channel timeout/mute, 3) Permanent expulsion.',
          '- **Transparent Appeals Channel**: Documented procedure allowing users to submit structured unban appeals.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'podcast-interview-prep-dossier': {
    id: 'podcast-interview-prep-dossier',
    name: 'PodcastInterviewPrepDossierSkill',
    displayName: 'Podcast Host Dossier & Interview Arcs',
    categoryId: 'social',
    description: 'Constructs comprehensive podcast interview prep dossiers: guest background, contrarian talking points, and non-cliché questions.',
    tags: ['social', 'podcast', 'interview', 'audio', 'journalism', 'media'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Досье для Ведущего Подкаста (Interview Prep)',
        'Podcast Host Prep Dossier & Interview Architecture',
        [
          '- **Краткая справка о госте (Bio & Hooks)**: Ключевые достижения, последние публикации и резонансные цитаты гостя.',
          '- **3 Тематических блока (Interview Arc)**: 1. Происхождение идеи, 2. Преодоление кризиса/сбоя, 3. Прогнозы на будущее.',
          '- **Вопросы без банальностей**: Избегать скучных стандартных вопросов; копать в сторону скрытых компромиссов и инсайдов.',
        ],
        [
          '- **Guest Dossier & Biography**: Notable milestones, recent publications, and provocative public quotes.',
          '- **3-Act Narrative Arc**: Act 1 (Foundational Genesis), Act 2 (Crucible & Crisis Mitigation), Act 3 (Future Frontier Horizon).',
          '- **Non-Cliché Probing Questions**: Deep questions exploring undisclosed trade-offs, failures, and counter-intuitive lessons.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'newsletter-curation-engine': {
    id: 'newsletter-curation-engine',
    name: 'NewsletterCurationEngineSkill',
    displayName: 'High-Signal Newsletter Curation Architecture',
    categoryId: 'social',
    description: 'Formats high-signal tech newsletters: "Deep Dive of the Week", 3 Key Industry Signals, 5 Quick Curated Links, and Poll.',
    tags: ['social', 'newsletter', 'curation', 'email', 'editorial', 'media'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Структура Экспертного Дайджеста (Newsletter Spec)',
        'High-Signal Newsletter Curation Specification',
        [
          '- **Главная тема выпуска (Deep Dive)**: 500 слов глубокого разбора одной важной архитектурной или рыночной новости.',
          '- **3 Ключевых сигнала индустрии**: Короткие емкие выжимки важных трендов с объяснением «Почему это важно».',
          '- **5 Быстрых ссылок (Curated Links)**: Аннотированные ссылки на полезные инструменты, статьи и репозитории.',
        ],
        [
          '- **Lead Deep Dive Feature**: 500-word authoritative breakdown of a pivotal architectural event or market shift.',
          '- **3 Critical Industry Signals**: High-density trend summaries detailing exact business and engineering implications.',
          '- **5 Curated Signal Links**: Annotated resource links highlighting production-grade tools, whitepapers, and GitHub repos.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'social-media-crisis-response': {
    id: 'social-media-crisis-response',
    name: 'SocialMediaCrisisResponseSkill',
    displayName: 'Social PR Crisis Response & Containment',
    categoryId: 'social',
    description: 'Drafts empathetic, transparent social media statements during active PR or technical crises to contain reputational damage.',
    tags: ['social', 'crisis', 'pr', 'containment', 'reputation', 'social-media'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Антикризисное Заявление для Соцсетей (Social PR Crisis)',
        'Social Media Crisis Response & Containment Protocol',
        [
          '- **Признание проблемы без оправданий**: Честно и прямо подтвердить факт инцидента («Мы знаем о проблеме с доступом к аккаунтам»).',
          '- **Прозрачный отчет о действиях**: Рассказать, что уже делает техническая команда для устранения неполадок.',
          '- **Официальный канал обновлений**: Дать ссылку на Status Page и указать точное время следующего обновления информации.',
        ],
        [
          '- **Immediate Authentic Ownership**: Directly acknowledge the issue without evasive corporate speak or blaming third parties.',
          '- **Active Containment Transparency**: Communicate concrete engineering interventions currently underway in real time.',
          '- **Single Source of Truth**: Direct audience to the canonical status dashboard with explicit update timestamps.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'youtube-script-retention-hooks': {
    id: 'youtube-script-retention-hooks',
    name: 'YoutubeScriptRetentionHooksSkill',
    displayName: 'YouTube Script & Audience Retention Hooks',
    categoryId: 'social',
    description: 'Structures high-retention YouTube video scripts: 0-5s visual hook, pattern interrupts every 30s, open loops, and clean outro.',
    tags: ['social', 'youtube', 'video-script', 'retention', 'hooks', 'scriptwriting'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Сценарий Видео с Удержанием Внимания (YouTube Script)',
        'High-Retention YouTube Video Script Specification',
        [
          '- **Хук первых 5 секунд (0-5s Hook)**: Визуальный и речевой крючок, мгновенно подтверждающий обещание из превью/заголовка.',
          '- **Перебивки каждые 30 секунд (Pattern Interrupts)**: Смена кадров, графические вставки (B-Roll) и звуковые эффекты для борьбы с оттоком.',
          '- **Открытые петли (Open Loops)**: Анонс главного секрета, который будет раскрыт ближе к концу видео.',
        ],
        [
          '- **0-5s Direct Visual Hook**: Instant visual and spoken payoff fulfilling the thumbnail/title contract immediately.',
          '- **30-Second Pattern Interrupts**: Scripted B-roll transitions, text callouts, and pacing resets sustaining viewer attention.',
          '- **Open Loop Narrative Bridges**: Tease high-stakes revelations resolved later in the video to maintain audience retention.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'discord-community-onboarding': {
    id: 'discord-community-onboarding',
    name: 'DiscordCommunityOnboardingSkill',
    displayName: 'Discord Community Architecture & Onboarding',
    categoryId: 'social',
    description: 'Architects organized Discord servers: clear category channels, automated reaction roles, bot integrations, and town hall formats.',
    tags: ['social', 'discord', 'community-building', 'onboarding', 'roles', 'channels'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Архитектура Сервера Discord и Онбординг',
        'Discord Community Architecture & Onboarding Spec',
        [
          '- **Структура каналов**: Разделы: `📢-announcements`, `👋-welcome`, `💬-general`, `🛠-dev-chat`, `❓-help-tickets`.',
          '- **Автоматические роли (Reaction Roles)**: Выбор ролей (Frontend, Backend, DevOps) по клику на эмодзи для персонализации ленты.',
          '- **Инструкция для новичков**: Простое сообщение из 3 пунктов с призывом представиться в канале `#introductions`.',
        ],
        [
          '- **Channel Topology**: Category hierarchy: `📢-announcements`, `👋-welcome`, `💬-general`, `🛠-code-review`, `❓-support-tickets`.',
          '- **Automated Reaction Roles**: Self-service role selection (Frontend, Backend, DevOps, Community) to personalize notification feeds.',
          '- **Streamlined Welcome Flow**: 3-step onboarding prompt encouraging newcomers to introduce themselves in `#introductions`.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'ugc-creator-brief-spec': {
    id: 'ugc-creator-brief-spec',
    name: 'UgcCreatorBriefSpecSkill',
    displayName: 'User-Generated Content (UGC) Creator Brief',
    categoryId: 'social',
    description: 'Drafts high-converting briefs for UGC creators: mandatory visual hooks, talking points, do\'s and don\'ts, and export specs.',
    tags: ['social', 'ugc', 'creator-brief', 'influencer-marketing', 'tiktok', 'reels'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'ТЗ для UGC-Креаторов (Creator Brief)',
        'UGC Creator Production Brief Specification',
        [
          '- **3 Варианта хуков**: Предложить 3 разных сценария первых 3 секунд («Я не верил, пока не попробовал...»).',
          '- **Обязательные ключевые сообщения (Talking Points)**: 2–3 главных преимущества продукта, которые должны прозвучать вслух.',
          '- **Список Don\'ts (Чего делать нельзя)**: Запрет на фальшивый восторженный тон, упоминание конкурентов и показ логотипов без разрешения.',
        ],
        [
          '- **3 Visual Hook Angles**: Prescribe 3 distinct 3-second opening hooks tailored for short-form algorithmic discovery.',
          '- **Core Mandatory Talking Points**: 2-3 essential value propositions to verbalize naturally during the product demo.',
          '- **Strict "Don\'ts" Guardrails**: Ban inauthentic infomercial tones, competitor mentions, and poor lighting/audio environments.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'reputation-sentiment-audit': {
    id: 'reputation-sentiment-audit',
    name: 'ReputationSentimentAuditSkill',
    displayName: 'Brand Sentiment & Social Listening Audit',
    categoryId: 'social',
    description: 'Monitors brand reputation across social platforms, classifying net sentiment, identifying top advocates, and tracking detractors.',
    tags: ['social', 'sentiment', 'social-listening', 'reputation', 'brand', 'analytics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Аудит Репутации Бренда и Тональности (Social Listening)',
        'Brand Reputation & Social Listening Sentiment Audit',
        [
          '- **Расчет Net Sentiment Score**: Вычислить $NSS = (Positive\\% - Negative\\%) / Total$ по всем каналам.',
          '- **Анализ критики (Pain Points)**: Сгруппировать претензии пользователей по категориям (баги, цены, поддержка).',
          '- **Программа работы с амбассадорами**: Выделить самых активных позитивных авторов для вовлечения в партнерскую программу.',
        ],
        [
          '- **Net Sentiment Scoring**: Compute $NSS = (Positive - Negative) / Total$ across social platforms and developer forums.',
          '- **Detractor Root Clustering**: Categorize negative mentions into actionable feedback buckets (pricing, bugs, documentation gaps).',
          '- **Advocate Mobilization**: Identify vocal positive brand champions for early beta access and community ambassador invites.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'reddit-ama-host-protocol': {
    id: 'reddit-ama-host-protocol',
    name: 'RedditAmaHostProtocolSkill',
    displayName: 'Reddit "Ask Me Anything" (AMA) Playbook',
    categoryId: 'social',
    description: 'Prepares founders and engineers for Reddit AMAs: authentic proof verification, transparent self-intro, and answering brutal technical questions.',
    tags: ['social', 'reddit', 'ama', 'community', 'developer-relations', 'transparency'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Плейбук Проведения Reddit AMA (Ask Me Anything)',
        'Reddit "Ask Me Anything" (AMA) Playbook & Strategy',
        [
          '- **Искреннее вступительное сообщение**: Рассказать о себе, команде и продукте без рекламного пафоса с ссылкой на верификацию.',
          '- **Прямые ответы на неудобные вопросы**: Не уклоняться от сложных тем (цены, прошлые сбои, конкуренты); отвечать честно и аргументированно.',
          '- **Техническая глубина**: Приводить конкретные детали архитектуры и кода, высоко ценимые сообществом Reddit.',
        ],
        [
          '- **Authentic Intro Post**: Genuine, non-promotional opening narrative accompanied by photographic proof verification.',
          '- **Direct Confrontation of Hard Questions**: Directly address contentious issues (monetization changes, past outages) with radical candor.',
          '- **Technical Specificity**: Deliver dense architectural and engineering specifics celebrated by technical subreddits.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'short-form-tiktok-reels-script': {
    id: 'short-form-tiktok-reels-script',
    name: 'ShortFormTiktokReelsScriptSkill',
    displayName: 'Short-Form Viral Video Script (Reels/TikTok/Shorts)',
    categoryId: 'social',
    description: 'Formats 15-30 second viral video scripts with split columns: Visual Scene / Camera Action vs. Spoken Audio / Text Overlay.',
    tags: ['social', 'tiktok', 'reels', 'shorts', 'video', 'short-form', 'viral'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Сценарий Короткого Видео (Reels / TikTok / Shorts)',
        'Short-Form Video Script Specification (Reels / TikTok)',
        [
          '- **Двухколоночный формат**: Таблица `[Тайминг | Видеоряд / Действие в кадре | Закадровый голос / Текст на экране]`.',
          '- **Быстрый темп (15-30 секунд)**: Смена плана каждые 2–3 секунды для поддержания высокого темпа просмотра.',
          '- **Текстовые плашки (On-Screen Text)**: Выделять ключевые тезисы текстом для пользователей, смотрящих видео без звука.',
        ],
        [
          '- **Two-Column Script Layout**: Table: `[Timestamp (0-15s) | Visual Camera Action / B-Roll | Voiceover / On-Screen Captions]`.',
          '- **Rapid Pacing Dynamics**: Cut visual angles every 2-3 seconds to maximize short-form algorithmic completion rates.',
          '- **Muted Viewer Accommodations**: Script bold on-screen kinetic captions for viewers consuming content with audio muted.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'event-livestream-run-of-show': {
    id: 'event-livestream-run-of-show',
    name: 'EventLivestreamRunOfShowSkill',
    displayName: 'Virtual Event Run-of-Show & Broadcast Schedule',
    categoryId: 'social',
    description: 'Constructs minute-by-minute virtual launch event Run-of-Show schedules with speaker cues, slide triggers, and backup contingency paths.',
    tags: ['social', 'events', 'livestream', 'run-of-show', 'broadcast', 'conference'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Сценарий Прямого Эфира (Event Run-of-Show)',
        'Virtual Event Run-of-Show & Broadcast Schedule',
        [
          '- **Поминутный тайминг**: Таблица `[Время (UTC) | Длительность | Спикер | Сцена / Слайд | Технические команды для режиссера]`.',
          '- **Буферные интервалы (Buffer Time)**: Заложить 3–5 минут запаса на случай затягивания докладов или технических пауз.',
          '- **Аварийный протокол (Plan B)**: Регламент действий режиссера при обрыве связи у спикера (переключение на резервное видео).',
        ],
        [
          '- **Minute-by-Minute Run-of-Show**: Table: `[Time UTC | Duration | Speaker / Stage | Screen Asset / Demo | Technical Director Cue]`.',
          '- **Temporal Headroom Buffers**: Allocate 3-5 minute cushion blocks to absorb demo delays without cascading schedule slips.',
          '- **Live Stream Failover Protocol**: Pre-script emergency backup video streams in the event of speaker connectivity loss.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'advocacy-ambassador-program': {
    id: 'advocacy-ambassador-program',
    name: 'AdvocacyAmbassadorProgramSkill',
    displayName: 'Developer Advocacy & Ambassador Program',
    categoryId: 'social',
    description: 'Structures tiered developer ambassador programs: community contribution tiers, exclusive perks, swag tiers, and leaderboards.',
    tags: ['social', 'devrel', 'ambassador', 'advocacy', 'community', 'developer-marketing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Программа Амбассадоров и DevRel (Ambassador Program)',
        'Developer Advocacy & Community Ambassador Program Spec',
        [
          '- **Уровни участия (Tiers)**: 1. Contributor (активность на форуме), 2. Champion (написание статей/докладов), 3. Fellow (консультации по продукту).',
          '- **Система поощрений**: Эксклюзивный мерч, доступ к закрытым бета-версиям, личные встречи с командой разработки и бейджи в профиле.',
          '- **Критерии активности**: Четкие прозрачные требования для сохранения статуса амбассадора раз в квартал.',
        ],
        [
          '- **Tiered Ambassador Levels**: 1. Community Advocate, 2. Technical Champion (talks/tutorials), 3. Advisory Fellow (product roadmap input).',
          '- **Incentive & Privilege Matrix**: Early access builds, bespoke developer swag, profile verification badges, and core team access.',
          '- **Quarterly Activity Thresholds**: Objective criteria required to maintain active ambassador status.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'social-listening-trend-hijack': {
    id: 'social-listening-trend-hijack',
    name: 'SocialListeningTrendHijackSkill',
    displayName: 'Social Listening & Trend Newsjacking',
    categoryId: 'social',
    description: 'Capitalizes on breaking cultural moments and trending hashtags with brand-safe, contextual commentary.',
    tags: ['social', 'newsjacking', 'trends', 'social-listening', 'viral-marketing'],
    transform: createStandardSkillTransform({
sectionName: 'Trend Hijacking & Newsjacking Protocol',
      ruSectionName: 'Протокол ньюсджекинга и интеграции в тренды (Newsjacking)',
      instructions: [
        'Identify breaking trends within the initial 2-4 hour inflection window before saturation occurs.',
        'Evaluate brand alignment: ensure the cultural meme or news item genuinely intersects with brand values without seeming opportunistic or exploitative.',
        'Adopt native platform vernacular and visual formats (reaction images, succinct quips) matching audience expectations.',
        'Implement strict safety guardrails: forbid newsjacking tragedies, political unrest, natural disasters, or sensitive legal disputes.',
      ],
      ruInstructions: [
        'Выявляйте восходящие тренды в первые 2–4 часа их зарождения до наступления информационной перегрузки.',
        'Оценивайте соответствие ДНК бренда: убедитесь, что инфоповод органично стыкуется с позиционированием компании, а не выглядит натянутым хайпом.',
        'Используйте нативный язык платформы, актуальные мемные форматы и лаконичные формулировки.',
        'Соблюдайте правила этической безопасности: категорически запрещен ньюсджекинг на трагедиях, катастрофах, политических конфликтах и судебных спорах.',
      ],
      semanticType: 'process_directive',
      tags: ['social', 'newsjacking', 'trends', 'social-listening', 'viral-marketing'],
    }),
  },

  'influencer-roi-contract-brief': {
    id: 'influencer-roi-contract-brief',
    name: 'InfluencerRoiContractBriefSkill',
    displayName: 'Influencer Partnership Brief & ROI Matrix',
    categoryId: 'social',
    description: 'Structures creator collaboration briefs: deliverables, usage rights, FTC disclosure compliance, and performance tracking.',
    tags: ['social', 'influencer-marketing', 'creator-brief', 'ftc-compliance', 'sponsorship'],
    transform: createStandardSkillTransform({
sectionName: 'Influencer Partnership & Deliverables Brief',
      ruSectionName: 'Бриф для инфлюенсеров и матрица эффективности (Influencer Brief)',
      instructions: [
        'Clearly define campaign goals, key talking points, mandatory product visuals, and strictly prohibited statements.',
        'Specify concrete deliverables (e.g., 1x 60s dedicated YouTube integration, 2x Instagram Stories with sticker link, 1x TikTok).',
        'Enforce clear FTC disclosure compliance (prominent #ad, #sponsored above the fold, audio verbalization).',
        'Negotiate explicit content usage rights: organic posting vs paid whitelisting ads, perpetuity limitations, and exclusive category lockouts.',
      ],
      ruInstructions: [
        'Четко формулируйте цели кампании, ключевые тезисы (key messages), обязательные кадры продукта и строгий стоп-лист формулировок.',
        'Конкретизируйте состав материалов: хронометраж интеграции, формат (видео, сторис с кликабельной ссылкой), даты и таймслоты публикации.',
        'Контролируйте требования законодательства о рекламе: заметная плашка #реклама, указание ERID/токена и маркировки.',
        'Фиксируйте права на использование контента: органические публикации, запуск таргетированной рекламы от лица блогера (whitelisting) и сроки эксклюзивности.',
      ],
      semanticType: 'structural_directive',
      tags: ['social', 'influencer-marketing', 'creator-brief', 'ftc-compliance', 'sponsorship'],
    }),
  },

  'instagram-carousel-retention-flow': {
    id: 'instagram-carousel-retention-flow',
    name: 'InstagramCarouselRetentionFlowSkill',
    displayName: 'Educational Instagram Carousel Architecture',
    categoryId: 'social',
    description: 'Engineers 10-slide educational carousels with irresistible cover hooks, narrative tension, and high-save conclusion slides.',
    tags: ['social', 'instagram', 'carousel', 'visual-storytelling', 'retention'],
    transform: createStandardSkillTransform({
sectionName: 'Instagram Carousel Storytelling Architecture',
      ruSectionName: 'Архитектура обучающей карусели для Instagram',
      instructions: [
        'Slide 1 (Cover Hook): Create high-contrast visual title with bold curiosity gap or contrarian value promise.',
        'Slide 2-3 (The Pain Point): Validate audience struggle, explain why common conventional wisdom fails, and set high stakes.',
        'Slide 4-8 (The Step-by-Step System): Deliver actionable, high-signal insights with 1 digestible concept per slide and visual diagrams.',
        'Slide 9-10 (Summary & Call to Action): Provide a single-slide recap cheat-sheet and prompt: "Save this post for later reference / Share with a friend".',
      ],
      ruInstructions: [
        'Слайд 1 (Обложка): Контрастный цепляющий заголовок с сильным крючком любопытства или провокационным тезисом.',
        'Слайды 2–3 (Проблема и боль): Описание знакомой боли аудитории, разоблачение неработающих стандартных советов и повышение ставок.',
        'Слайды 4–8 (Пошаговое решение): Практическая суть методики по формуле «1 слайд = 1 законченный тезис» со схемами и примерами.',
        'Слайды 9–10 (Шпаргалка и CTA): Итоговая карточка-резюме для сохранения в закладки и призыв переслать коллеге.',
      ],
      semanticType: 'structural_directive',
      tags: ['social', 'instagram', 'carousel', 'visual-storytelling', 'retention'],
    }),
  },

  'community-code-of-conduct-enforcement': {
    id: 'community-code-of-conduct-enforcement',
    name: 'CommunityCodeOfConductEnforcementSkill',
    displayName: 'Community Code of Conduct & Tiered Sanctions',
    categoryId: 'social',
    description: 'Establishes clear community standards and transparent tiered moderation: verbal warning, timeout, temporary suspension, and permanent ban.',
    tags: ['social', 'community-management', 'code-of-conduct', 'moderation', 'policy'],
    transform: createStandardSkillTransform({
sectionName: 'Community Code of Conduct & Sanctions Policy',
      ruSectionName: 'Правила сообщества и лестница модерационных мер',
      instructions: [
        'Articulate core community values: mutual respect, constructive disagreement, zero harassment, and intellectual honesty.',
        'Explicitly classify violations: hate speech, personal attacks, spam/self-promotion, doxxing, and bad-faith trolling.',
        'Enforce a predictable 4-tier progressive sanctions ladder: 1) Public/Private Warning, 2) 24h Mute/Timeout, 3) 7-day Suspension, 4) Permanent Ban.',
        'Provide a transparent, dignified ban appeal process with clear response timeframes and human moderator review.',
      ],
      ruInstructions: [
        'Формулируйте ценности комьюнити: взаимное уважение, культура конструктивной дискуссии, отсутствие травли и токсичности.',
        'Классифицируйте нарушения: язык вражды, переход на личности, спам, самореклама, деанонимизация (doxxing) и троллинг.',
        'Применяйте прозрачную 4-ступенчатую лестницу санкций: 1) Предупреждение, 2) Тайм-аут на 24 часа, 3) Блокировка на 7 дней, 4) Перманентный бан.',
        'Обеспечивайте понятный механизм подачи апелляции на блокировку с регламентированным сроком рассмотрения живым модератором.',
      ],
      semanticType: 'compliance_directive',
      tags: ['social', 'community-management', 'code-of-conduct', 'moderation', 'policy'],
    }),
  },

  'tiktok-hook-drop-loop-architecture': {
    id: 'tiktok-hook-drop-loop-architecture',
    name: 'TiktokHookDropLoopArchitectureSkill',
    displayName: 'Short-Form Video Hook & Seamless Loop Scripting',
    categoryId: 'social',
    description: 'Scripts 15-45s vertical videos with sub-2-second hooks, micro-pacing drops, visual pattern interrupts, and seamless loops.',
    tags: ['social', 'tiktok', 'reels', 'shorts', 'video-scripting', 'seamless-loop'],
    transform: createStandardSkillTransform({
sectionName: 'Short-Form Video Hook & Loop Architecture',
      ruSectionName: 'Сценарий короткого вертикального видео (TikTok / Reels / Shorts)',
      instructions: [
        'Seconds 0-2 (Visual & Verbal Hook): Deliver an immediate high-energy hook with visual motion; ban generic intros ("Hey guys!").',
        'Seconds 3-20 (Value Delivery & Pacing): Use pattern interrupts every 3-4 seconds (zoom-in, b-roll cut, text pop-up, sound effect).',
        'Seconds 21-35 (Climax / Payoff): Deliver the core insight, transformation, or punchline without artificial delay.',
        'Final Second (Seamless Loop Transition): Craft the closing sentence so its ending rhythm connects grammatically to the opening hook.',
      ],
      ruInstructions: [
        'Секунды 0–2 (Хук): Мгновенный визуальный и речевой хук с динамикой в кадре; категорически запрещены медленные приветствия.',
        'Секунды 3–20 (Динамика пользы): Смена планов каждые 3–4 секунды (наплыв камеры, B-roll, текстовые плашки, звуковые акценты).',
        'Секунды 21–35 (Кульминация): Выдача главного инсайта или неожиданной развязки без затягивания хронометража.',
        'Финал (Бесшовный луп): Завершающая фраза строится так, чтобы грамматически и интонационно перетекать в первое слово вступительного хука.',
      ],
      semanticType: 'structural_directive',
      tags: ['social', 'tiktok', 'reels', 'shorts', 'video-scripting', 'seamless-loop'],
    }),
  },

  'sub-reddit-growth-playbook': {
    id: 'sub-reddit-growth-playbook',
    name: 'SubRedditGrowthPlaybookSkill',
    displayName: 'Organic Subreddit Growth & Reddiquette Protocol',
    categoryId: 'social',
    description: 'Builds authentic Reddit community engagement following Reddiquette, strict non-spam authenticity, and community-led flywheels.',
    tags: ['social', 'reddit', 'community', 'growth', 'reddiquette', 'moderation'],
    transform: createStandardSkillTransform({
sectionName: 'Subreddit Growth & Reddiquette Protocol',
      ruSectionName: 'Органическое развитие Reddit-сообщества и соблюдение Reddiquette',
      instructions: [
        'Adhere strictly to Reddiquette: add genuine informational or entertainment value; never publish corporate marketing copy.',
        'Observe the 9:1 value-to-self-promotion ratio: contribute 9 high-quality community discussions for every 1 mention of proprietary products.',
        'Seed high-signal discussions: open-ended technical debates, weekly troubleshooting megathreads, and AMA sessions with industry figures.',
        'Configure AutoModerator rules to filter low-effort spam, enforce flair categorizations, and welcome first-time posters.',
      ],
      ruInstructions: [
        'Строго следуйте правилам Reddiquette: несите реальную пользу или уникальный контент; избегайте корпоративного рекламного официоза.',
        'Соблюдайте пропорцию 9:1: на каждые 9 полезных экспертных комментариев и постов допускается не более 1 упоминания своего продукта.',
        'Инициируйте вовлекающие дискуссии: глубокие технические споры, еженедельные тематические мегатрэды и экспертные сессии AMA.',
        'Настраивайте правила бота AutoModerator для фильтрации спама, обязательного проставления тегов (flairs) и приветствия новичков.',
      ],
      semanticType: 'process_directive',
      tags: ['social', 'reddit', 'community', 'growth', 'reddiquette', 'moderation'],
    }),
  },

  'podcast-shownotes-seo-timings': {
    id: 'podcast-shownotes-seo-timings',
    name: 'PodcastShownotesSeoTimingsSkill',
    displayName: 'Podcast Show Notes, Timestamps & SEO Packaging',
    categoryId: 'social',
    description: 'Packages audio episodes with clickable chapter timestamps, keyword-rich summaries, guest bios, and resource link catalogs.',
    tags: ['social', 'podcast', 'show-notes', 'timestamps', 'seo', 'audio-packaging'],
    transform: createStandardSkillTransform({
sectionName: 'Podcast Show Notes & SEO Architecture',
      ruSectionName: 'Шоуноуты подкаста, таймкоды и SEO-упаковка выпусков',
      instructions: [
        'Write an engaging 2-paragraph episode hook summarizing the core debate and transformative revelations.',
        'Provide precise, clickable chapter timestamps formatted [MM:SS] with curiosity-inducing topic titles.',
        'Extract 3-5 memorable quote soundbites formatted for easy social sharing.',
        'Catalog all mentioned books, software tools, guest social handles, and sponsor discount codes with accessible markdown links.',
      ],
      ruInstructions: [
        'Пишите яркое двух-абзацное интро выпуска с акцентом на главный спор, инсайты и практические выводы беседы.',
        'Формируйте точные кликабельные таймкоды в формате [ММ:СС] с интригующими названиями смысловых блоков.',
        'Выделяйте 3–5 емких цитат гостя, готовых для репостов и создания визуальных карточек в соцсетях.',
        'Составляйте список всех упомянутых книг, сервисов, ссылок на профили гостя и промокодов партнеров.',
      ],
      semanticType: 'structural_directive',
      tags: ['social', 'podcast', 'show-notes', 'timestamps', 'seo', 'audio-packaging'],
    }),
  },

  'social-media-calendar-orchestration': {
    id: 'social-media-calendar-orchestration',
    name: 'SocialMediaCalendarOrchestrationSkill',
    displayName: 'Cross-Platform Content Repurposing & Editorial Calendar',
    categoryId: 'social',
    description: 'Orchestrates 1 pillar asset into 15+ atomized multi-channel posts mapped across a structured 30-day editorial calendar.',
    tags: ['social', 'content-calendar', 'atomization', 'cross-platform', 'repurposing'],
    transform: createStandardSkillTransform({
sectionName: 'Content Atomization & Editorial Calendar Protocol',
      ruSectionName: 'Атомизация контента и кроссплатформенный контент-план',
      instructions: [
        'Take 1 long-form pillar asset (podcast, whitepaper, webinar) and atomize it into 15+ platform-native derivatives.',
        'Map derivatives to optimal channels: LinkedIn (case analysis), X/Twitter (unrolled insight thread), Instagram (carousel), TikTok (soundbite clip), Newsletter (executive memo).',
        'Distribute posts across an editorial cadence balancing 4 pillars: Thought Leadership (40%), How-To Education (30%), Social Proof (20%), and Conversion CTA (10%).',
        'Organize publishing schedule in a clear table: Date, Pillar, Platform, Format, Hook, Copy, Visual Asset, and UTM Tracking Link.',
      ],
      ruInstructions: [
        'Берете один большой флагманский материал (вебинар, лонгрид, исследование) и декомпозируете его на 15+ нативных постов под разные соцсети.',
        'Адаптируйте формат под специфику платформ: лонгрид в LinkedIn, тред инсайтов в X, визуальная карусель в Instagram, видео-нарезка в Shorts, рассылка.',
        'Балансируйте тематические рубрики: экспертное мнение (40%), прикладные инструкции (30%), кейсы и отзывы (20%), прямые продажи (10%).',
        'Сводите план в наглядную таблицу: дата, рубрика, площадка, формат, цепляющий хук, текст, визуал и ссылка с UTM-меткой.',
      ],
      semanticType: 'process_directive',
      tags: ['social', 'content-calendar', 'atomization', 'cross-platform', 'repurposing'],
    }),
  },

  'b2b-executive-personal-branding': {
    id: 'b2b-executive-personal-branding',
    name: 'B2bExecutivePersonalBrandingSkill',
    displayName: 'B2B Executive Ghostwriting & Personal Brand Narrative',
    categoryId: 'social',
    description: 'Crafts authoritative founder/C-suite personal brand narratives on LinkedIn: vulnerability, operational lessons, and strategic vision.',
    tags: ['social', 'executive-branding', 'linkedin', 'ghostwriting', 'leadership', 'b2b'],
    transform: createStandardSkillTransform({
sectionName: 'Executive Personal Brand Ghostwriting Protocol',
      ruSectionName: 'Гострайтинг и персональный бренд топ-менеджера (LinkedIn / Telegram)',
      instructions: [
        'Anchor posts in authentic executive vulnerability: real operational failures, hard management decisions, and behind-the-scenes board discussions.',
        'Avoid self-aggrandizing humblebrags; translate personal founder experiences into universal, actionable leadership frameworks.',
        'Use punchy executive formatting: single-sentence opening statement, clean paragraph breaks, bold key takeaway sentences, and conversational sign-off.',
        'Close with provocative questions inviting high-caliber peer comments from other executives and industry leaders.',
      ],
      ruInstructions: [
        'Опирайтесь на искреннюю открытость руководителя: реальные ошибки управления, трудные решения при найме/увольнении и опыт кризисов.',
        'Избегайте самолюбования и скрытого хвастовства (humblebragging); трансформируйте личный опыт в практические управленческие выводы.',
        'Используйте динамичный ритмичный текст: лаконичный сильный тезис в начале, короткие абзацы и выделение ключевых мыслей.',
        'Завершайте посты открытым дискуссионным вопросом, приглашающим к диалогу других предпринимателей и директоров.',
      ],
      semanticType: "role",
      tags: ['social', 'executive-branding', 'linkedin', 'ghostwriting', 'leadership', 'b2b'],
    }),
  },

  'crisis-trolling-brigade-containment': {
    id: 'crisis-trolling-brigade-containment',
    name: 'CrisisTrollingBrigadeContainmentSkill',
    displayName: 'Brigading, Review Bombing & Troll Containment Protocol',
    categoryId: 'social',
    description: 'Contains coordinated digital attacks: review bombing, comment section brigading, and targeted bad-faith smear campaigns.',
    tags: ['social', 'crisis-management', 'trolling', 'brigading', 'review-bombing', 'reputation'],
    transform: createStandardSkillTransform({
sectionName: 'Brigading & Review Bombing Containment Protocol',
      ruSectionName: 'Протокол сдерживания набегов троллей и ревью-бомбинга (Brigading Containment)',
      instructions: [
        'Differentiate organic customer dissatisfaction from coordinated bad-faith brigading (sudden spike in 1-star reviews from new accounts).',
        'Enforce a temporary slowdown mode: restrict comment sections, require account age verifications, and deploy keyword moderation filters.',
        'Do not engage in combative public arguments with bad-faith actors; starve trolls of attention while providing a calm, factual public statement.',
        'Submit structured evidence packages to platform trust & safety teams to initiate coordinated review removals and IP-level bans.',
      ],
      ruInstructions: [
        'Отличайте реальное недовольство клиентов от скоординированных атак ботов и хейтеров (залповый наплыв отзывов с нулевых аккаунтов).',
        'Включайте режим защиты: замедление комментирования (slow mode), ограничение доступа для новых аккаунтов и фильтрация по стоп-словам.',
        'Категорически запрещайте вступать в публичные перепалки; сохраняйте ледяное спокойствие и публикуйте единственное нейтральное официальное разъяснение.',
        'Фиксируйте доказательства атаки для службы поддержки платформ (скриншоты, таймстемпы, паттерны) для удаления заказных отзывов.',
      ],
      semanticType: 'guardrail_directive',
      tags: ['social', 'crisis-management', 'trolling', 'brigading', 'review-bombing', 'reputation'],
    }),
  },

  'live-webinar-interactive-chat-host': {
    id: 'live-webinar-interactive-chat-host',
    name: 'LiveWebinarInteractiveChatHostSkill',
    displayName: 'Live Webinar Chat Engagement & Moderation Runbook',
    categoryId: 'social',
    description: 'Drives lively audience engagement, curates high-value questions for speakers, and maintains welcoming chat energy during live events.',
    tags: ['social', 'webinar', 'live-streaming', 'chat-moderation', 'audience-engagement'],
    transform: createStandardSkillTransform({
sectionName: 'Live Event Chat Moderation & Engagement Runbook',
      ruSectionName: 'Модерация и ведение интерактивного чата вебинара / стрима',
      instructions: [
        'Warm up the audience during the pre-stream 5 minutes with low-friction icebreakers (e.g., "Drop your city and current project in the chat!").',
        'Monitor chat velocity, pin essential links (slide decks, promo offers), and answer technical audio/video questions immediately.',
        'Tag and curate the top 5 audience questions, categorizing them by theme for the speaker\'s live Q&A segment.',
        'Neutralize disruptive participants swiftly with discrete private warnings or quiet mutes without derailing the main presentation.',
      ],
      ruInstructions: [
        'Разогревайте аудиторию за 5 минут до начала простыми вопросами («Напишите ваш город и чем вы занимаетесь»).',
        'Поддерживайте динамику чата, закрепляйте важные ссылки на презентацию и оперативно решайте технические проблемы со звуком.',
        'Отбирайте и структурируйте лучшие вопросы зрителей по тематическим группам для передачи спикеру на финальном блоке Q&A.',
        'Молниеносно нейтрализуйте спамеров и провокаторов точечными мутами, не привлекая лишнего внимания аудитории.',
      ],
      semanticType: 'process_directive',
      tags: ['social', 'webinar', 'live-streaming', 'chat-moderation', 'audience-engagement'],
    }),
  },

  'customer-advocacy-case-study-story': {
    id: 'customer-advocacy-case-study-story',
    name: 'CustomerAdvocacyCaseStudyStorySkill',
    displayName: 'Customer Case Study Narrative: Problem, Pivot, Metrics',
    categoryId: 'social',
    description: 'Structures magnetic B2B customer success stories: initial desperation, failed attempts, adoption breakthrough, and verified ROI.',
    tags: ['social', 'case-study', 'customer-success', 'storytelling', 'social-proof', 'b2b-marketing'],
    transform: createStandardSkillTransform({
sectionName: 'Customer Success Case Study Architecture',
      ruSectionName: 'Архитектура клиентского кейса (Customer Success Story)',
      instructions: [
        'Hero Journey Framing: Make the customer the hero and your product the trusted guide; never boast about your product in isolation.',
        'Act I (The Struggle): Vividly describe the painful bottleneck, quantifiable lost revenue, and team frustration before the solution.',
        'Act II (The Pivot & Implementation): Explain why competitive alternatives were rejected, smooth onboarding moments, and early "aha" wins.',
        'Act III (Verified Results): Lead with 3 bold metrics (e.g., "+310% ARR growth, -45% operational toil, 14-day payback period") with customer quotes.',
      ],
      ruInstructions: [
        'Стройте повествование по пути героя: главный герой — клиент, ваш продукт — надежный инструмент и наставник, а не самоцель.',
        'Акт I (Боль и тупик): Ярко опишите кризисную ситуацию клиента, финансовые потери и выгорание команды до внедрения решения.',
        'Акт II (Точка поворота): Почему были отброшены другие варианты, как проходил запуск и в какой момент наступил первый быстрый успех.',
        'Акт III (Измеримый триумф): Выносите в заголовок 3 твердые цифры (+300% к выручке, сокращение издержек вдвое, окупаемость за месяц) и цитату клиента.',
      ],
      semanticType: 'structural_directive',
      tags: ['social', 'case-study', 'customer-success', 'storytelling', 'social-proof', 'b2b-marketing'],
    }),
  },

  'threads-bluesky-microblogging-cadence': {
    id: 'threads-bluesky-microblogging-cadence',
    name: 'ThreadsBlueskyMicrobloggingCadenceSkill',
    displayName: 'Decentralized Microblogging (Threads & Bluesky) Pacing',
    categoryId: 'social',
    description: 'Optimizes content for open social graphs (Bluesky, Mastodon, Threads): authentic dialogue, chronological feeds, and community custom feeds.',
    tags: ['social', 'microblogging', 'threads', 'bluesky', 'mastodon', 'conversational'],
    transform: createStandardSkillTransform({
sectionName: 'Decentralized Microblogging Voice & Pacing',
      ruSectionName: 'Стиль и динамика микроблогов (Threads / Bluesky / Mastodon)',
      instructions: [
        'Embrace text-first conversational intimacy: ditch aggressive algorithm-gaming rage-bait in favor of curious musings and witty banter.',
        'Engage directly in replies: reply comments carry massive distribution weight on open social graphs compared to broadcast-only posts.',
        'Optimize for user-curated custom algorithmic feeds and topic hashtags without keyword stuffing.',
        'Foster genuine community serendipity by asking questions, amplifying peer creators, and sharing unpolished in-progress experiments.',
      ],
      ruInstructions: [
        'Делайте ставку на живое общение и естественность текста: откажитесь от агрессивного кликбейта в пользу остроумных наблюдений и открытых размышлений.',
        'Активно участвуйте в ветках ответов: в открытых социальных сетях содержательные ответы в комментариях дают колоссальный охват.',
        'Оптимизируйте публикации под пользовательские тематические ленты и подборки без спама хештегами.',
        'Стимулируйте спонтанное общение: задавайте вопросы, делитесь черновиками проектов и поддерживайте интересных авторов.',
      ],
      semanticType: "role",
      tags: ['social', 'microblogging', 'threads', 'bluesky', 'mastodon', 'conversational'],
    }),
  },

  'newsletter-welcome-sequence-drip': {
    id: 'newsletter-welcome-sequence-drip',
    name: 'NewsletterWelcomeSequenceDripSkill',
    displayName: 'Newsletter 5-Part Welcome Onboarding Email Drip',
    categoryId: 'social',
    description: 'Architects an automated 5-email welcome onboarding series converting casual subscribers into passionate super-fans and buyers.',
    tags: ['social', 'email-marketing', 'welcome-sequence', 'newsletter', 'lead-nurturing'],
    transform: createStandardSkillTransform({
sectionName: '5-Part Newsletter Welcome Drip Sequence',
      ruSectionName: 'Приветственная цепочка писем рассылки из 5 писем (Welcome Drip)',
      instructions: [
        'Email 1 (Immediate Delivery & Whitelist): Deliver promised lead magnet immediately, set expectations, and prompt a 1-click reply to guarantee inbox placement.',
        'Email 2 (Origin Story & Vulnerability): Share the personal origin story and core foundational philosophy that separates this newsletter from the rest.',
        'Email 3 (Best-of Vault): Deliver direct links to your top 3 most popular, high-signal past editions.',
        'Email 4 (The Contrarian Epiphany): Challenge a widely accepted industry dogma, providing a transformative paradigm shift.',
        'Email 5 (The Invitation / Soft Pitch): Invite to join the core community or present an introductory special offer.',
      ],
      ruInstructions: [
        'Письмо 1 (Моментальная доставка пользы): Немедленная отправка обещанного лид-магнита, инструкция добавить адрес в контакты и просьба ответить одним словом.',
        'Письмо 2 (История и философия): Личная история автора, преодоление трудностей и ключевой манифест рассылки.',
        'Письмо 3 (Золотой фонд): Подборка из 3 лучших и самых вирусных прошлых выпусков с максимальной концентрацией пользы.',
        'Письмо 4 (Разрушение мифа): Провокационный разбор популярного заблуждения индустрии и предложение принципиально нового взгляда.',
        'Письмо 5 (Приглашение и оффер): Приглашение в закрытый клуб, ссылка на сообщество или специальное вводное предложение.',
      ],
      semanticType: 'structural_directive',
      tags: ['social', 'email-marketing', 'welcome-sequence', 'newsletter', 'lead-nurturing'],
    }),
  },

  'social-giveaway-contest-compliance': {
    id: 'social-giveaway-contest-compliance',
    name: 'SocialGiveawayContestComplianceSkill',
    displayName: 'Social Media Giveaway & Sweepstakes Compliance',
    categoryId: 'social',
    description: 'Structures viral giveaways ensuring full legal compliance: No Purchase Necessary, official terms, platform release, and eligibility.',
    tags: ['social', 'giveaway', 'contest', 'sweepstakes', 'legal-compliance', 'viral-growth'],
    transform: createStandardSkillTransform({
sectionName: 'Social Media Giveaway Compliance Architecture',
      ruSectionName: 'Юридические и механические правила конкурсов в соцсетях (Giveaway Rules)',
      instructions: [
        'Ensure legal distinction between Sweepstakes (chance), Contest (skill), and illegal Lottery (chance + consideration + prize); mandate "NO PURCHASE NECESSARY".',
        'State complete Official Rules: Eligibility criteria (age, residency), entry period start/end with timezone, and approximate retail value (ARV) of prizes.',
        'Include mandatory platform liability release: explicitly state that the promotion is "in no way sponsored, endorsed, or administered by" the social platform.',
        'Specify transparent random drawing methodology, winner notification procedures, and prize forfeiture timelines.',
      ],
      ruInstructions: [
        'Четко соблюдайте законность: конкурс (оценка мастерства) против розыгрыша (случайный выбор); обязательное правило «Покупка не требуется».',
        'Публикуйте полные правила: требования к участникам (возраст, география), точные сроки проведения с таймзоной и рыночная стоимость призов.',
        'Включайте обязательный дисклеймер об освобождении платформы от ответственности (розыгрыш никак не связан с администрацией соцсети).',
        'Фиксируйте прозрачный способ определения победителя (рандомайзер с видеозаписью), порядок вручения и срок подтверждения выигрыша.',
      ],
      semanticType: 'compliance_directive',
      tags: ['social', 'giveaway', 'contest', 'sweepstakes', 'legal-compliance', 'viral-growth'],
    }),
  },

  'community-superfan-champion-council': {
    id: 'community-superfan-champion-council',
    name: 'CommunitySuperfanChampionCouncilSkill',
    displayName: 'Superfan VIP Champions Council Activation',
    categoryId: 'social',
    description: 'Identifies the top 1% power users and activates them as an exclusive VIP Advisory Council for beta feedback and advocacy.',
    tags: ['social', 'superfans', 'ambassador', 'vip-council', 'community-loyalty'],
    transform: createStandardSkillTransform({
sectionName: 'Superfan VIP Champions Council Framework',
      ruSectionName: 'Программа суперфанатов и совет амбассадоров (VIP Champions)',
      instructions: [
        'Identify top 1% community advocates using participation velocity, unsolicited peer helpfulness, and brand enthusiasm.',
        'Grant exclusive insider perks: private Slack/Discord channel, monthly roadmaps previews with founders, beta access, and branded swag.',
        'Empower champions with non-financial recognition: special community badges, stage shoutouts, and co-host privileges.',
        'Establish feedback advisory rituals: quarterly product feedback councils where champions critique early feature prototypes.',
      ],
      ruInstructions: [
        'Выявляйте топ-1% самых активных участников по частоте помощи другим, качеству постов и лояльности бренду.',
        'Предоставляйте эксклюзивные привилегии: закрытый канал с фаундерами, ранний доступ к бета-версиям и закрытый мерч.',
        'Используйте нематериальную мотивацию: особые бейджи в профиле, благодарности на стримах и права модераторов.',
        'Проводите регулярные закрытые сессии совета амбассадоров для закрытого тестирования прототипов и сбора честной критики.',
      ],
      semanticType: 'process_directive',
      tags: ['social', 'superfans', 'ambassador', 'vip-council', 'community-loyalty'],
    }),
  },
  "linkedin-carousel-educational-storyboard": {
    id: "linkedin-carousel-educational-storyboard",
    name: "LinkedinCarouselEducationalStoryboardSkill",
    displayName: "LinkedIn High-Dwell Multi-Slide Carousel Architecture",
    categoryId: "social",
    description: "Designs 8-12 slide PDF document carousels optimized for maximum dwell time, scroll completion, and professional saves.",
    tags: ["social","linkedin","carousel","storyboarding","b2b-content"],
    transform: createStandardSkillTransform({
      sectionName: "LinkedIn Carousel Storyboard Architecture",
      ruSectionName: "Архитектура образовательных каруселей для LinkedIn (высокий Dwell Time)",
      instructions: [
        "Slide 1: High-contrast title hook with tangible promise and \"Swipe ->\" micro-cue.",
        "Slides 2-7: One single clear insight per slide with diagrammatic visuals and bold key terms.",
        "Slide 8: Summary cheat-sheet recap, followed by Final Slide with save/repost CTA."
],
      ruInstructions: [
        "Слайд 1: Контрастный заголовок с измеримым обещанием пользы и стрелкой свайпа.",
        "Слайды 2-7: Строго одна ключевая мысль на слайд с визуальными акцентами.",
        "Слайд 8: Сводная шпаргалка, и финальный слайд с призывом сохранить/поделиться."
],
      semanticType: "process_directive",
      tags: ["social","linkedin","carousel","storyboarding","b2b-content"],
    }),
  },

  "youtube-hook-retention-curve-scripting": {
    id: "youtube-hook-retention-curve-scripting",
    name: "YoutubeHookRetentionCurveScriptingSkill",
    displayName: "YouTube First-30-Seconds Hook & Retention Curve Engineering",
    categoryId: "social",
    description: "Engineers script pacing to eliminate the initial 30-second drop-off and maintain high average percentage viewed (APV).",
    tags: ["social","youtube","retention-rate","video-scripts","apv"],
    transform: createStandardSkillTransform({
      sectionName: "YouTube Retention Scripting Protocol",
      ruSectionName: "Сценарий первых 30 секунд YouTube и удержание аудитории (APV)",
      instructions: [
        "Seconds 0-5: Visual and verbal confirmation matching title/thumbnail promise without generic intros.",
        "Seconds 6-30: High-stakes context setting + immediate open loop tease.",
        "Insert pattern interrupts, pacing resets, and B-roll visual shifts every 4-7 seconds."
],
      ruInstructions: [
        "0-5 секунды: Мгновенное подтверждение темы с превью без затяжных заставок.",
        "6-30 секунды: Поднятие ставок и создание открытой интриги (Open Loop).",
        "Внедряйте смену планов и перебивки каждые 4-7 секунд для удержания фокуса."
],
      semanticType: "process_directive",
      tags: ["social","youtube","retention-rate","video-scripts","apv"],
    }),
  },

  "short-form-tiktok-reels-retention-loop": {
    id: "short-form-tiktok-reels-retention-loop",
    name: "ShortFormTiktokReelsRetentionLoopSkill",
    displayName: "TikTok / Reels / Shorts Seamless Loop Architecture",
    categoryId: "social",
    description: "Constructs 15-45 second vertical video scripts with seamless audio/visual loops, causing viewers to watch multiple loops before realizing.",
    tags: ["social","tiktok","reels","shorts","looping-video"],
    transform: createStandardSkillTransform({
      sectionName: "Short-Form Seamless Loop Scripting",
      ruSectionName: "Сценарии бесшовных зацикленных видео (Reels / TikTok / Shorts)",
      instructions: [
        "Connect the final sentence smoothly into the opening sentence of the video.",
        "Deliver core value in under 25 seconds with energetic, fast-paced narration.",
        "Ensure on-screen action loops seamlessly without abrupt cuts."
],
      ruInstructions: [
        "Свяжите последнее предложение видео с первым для создания эффекта бесконечного цикла.",
        "Уложите главную мысль в 25 секунд без \"воды\" и пауз.",
        "Обеспечьте бесшовный визуальный переход между концом и началом ролика."
],
      semanticType: "process_directive",
      tags: ["social","tiktok","reels","shorts","looping-video"],
    }),
  },

  "reddit-authentic-non-promotional-post-craft": {
    id: "reddit-authentic-non-promotional-post-craft",
    name: "RedditAuthenticNonPromotionalPostCraftSkill",
    displayName: "Reddit High-Karma Vulnerable & Technical Post Craft",
    categoryId: "social",
    description: "Drafts deeply authentic, transparent, and non-promotional Reddit posts tailored to specific subreddit cultures (e.g. r/SaaS, r/programming).",
    tags: ["social","reddit","community","organic-growth","authenticity"],
    transform: createStandardSkillTransform({
      sectionName: "Reddit Subreddit Culture Alignment",
      ruSectionName: "Создание аутентичных нерекламных постов для сообществ Reddit",
      instructions: [
        "Eliminate marketing jargon, corporate speak, and direct promotional links.",
        "Lead with raw vulnerability, failures, postmortems, or transparent unit metrics.",
        "Provide 100% standalone value inside the text; only share links upon explicit request in comments."
],
      ruInstructions: [
        "Уберите весь маркетинг, ссылки на лендинги и корпоративный тон.",
        "Начните с честного разбора ошибок, цифр и реального практического опыта.",
        "Дайте полную пользу прямо в тексте; ссылки оставляйте только по запросу в комментариях."
],
      semanticType: "process_directive",
      tags: ["social","reddit","community","organic-growth","authenticity"],
    }),
  },

  "discord-community-engagement-ritual-engine": {
    id: "discord-community-engagement-ritual-engine",
    name: "DiscordCommunityEngagementRitualEngineSkill",
    displayName: "Discord & Telegram Community Engagement Rituals",
    categoryId: "social",
    description: "Designs recurring community rituals (weekly show-and-tell, AMA stages, challenge streaks, onboarding gates) to drive organic daily active users.",
    tags: ["social","community","discord","telegram","rituals","retention"],
    transform: createStandardSkillTransform({
      sectionName: "Community Ritual & Engagement Engine",
      ruSectionName: "Архитектура регулярных ритуалов и вовлечения комьюнити (Discord/TG)",
      instructions: [
        "Establish a 7-day cadence of predictable community events (e.g. #FeedbackFriday, #BuildInPublic Monday).",
        "Design low-friction micro-interactions (polls, reaction-role unlocks, daily questions).",
        "Incentivize peer-to-peer discussions rather than top-down broadcast announcements."
],
      ruInstructions: [
        "Создайте недельный календарь предсказуемых событий (#FeedbackFriday, разборы проектов).",
        "Внедрите микро-активности с низким порогом входа (опросы, реакции, вопрос дня).",
        "Стимулируйте горизонтальное общение участников между собой, а не только новости от админа."
],
      semanticType: 'protocol',
      tags: ["social","community","discord","telegram","rituals","retention"],
    }),
  },

  "newsletter-welcome-email-nurture-sequence": {
    id: "newsletter-welcome-email-nurture-sequence",
    name: "NewsletterWelcomeEmailNurtureSequenceSkill",
    displayName: "Newsletter 5-Part Welcome & Nurture Onboarding Sequence",
    categoryId: "social",
    description: "Drafts high-converting 5-email welcome sequences: The Immediate Gift, The Origin Story, The Core Philosophy, The Best-Of Digest, and The Soft Pitch.",
    tags: ["social","email-marketing","newsletter","welcome-sequence","retention"],
    transform: createStandardSkillTransform({
      sectionName: "Email Nurture Sequence Protocol",
      ruSectionName: "5-шаговая вводная email-цепочка для подписчиков рассылки",
      instructions: [
        "Email 1: Deliver promised lead magnet instantly and prompt a whitelist reply.",
        "Email 2-3: Share vulnerability, origin story, and core contrarian worldview.",
        "Email 4-5: Curate top high-performing content and introduce relevant product tiers gently."
],
      ruInstructions: [
        "Письмо 1: Мгновенная доставка лид-магнита и просьба ответить на письмо для попадания во входящие.",
        "Письма 2-3: Личная история преодоления трудностей и авторская философия.",
        "Письма 4-5: Дайджест лучших материалов и мягкое предложение основного продукта."
],
      semanticType: "process_directive",
      tags: ["social","email-marketing","newsletter","welcome-sequence","retention"],
    }),
  },

  "podcast-guest-booking-pitch-mastery": {
    id: "podcast-guest-booking-pitch-mastery",
    name: "PodcastGuestBookingPitchMasterySkill",
    displayName: "Top 1% Podcast Guest Pitch & Media Kit",
    categoryId: "social",
    description: "Drafts tailored podcast guest pitches referencing recent episodes, proposing 3 spicy contrarian topics, and demonstrating ready audience reach.",
    tags: ["social","pr","podcasting","guest-pitch","media-outreach"],
    transform: createStandardSkillTransform({
      sectionName: "Podcast Guest Pitch Architecture",
      ruSectionName: "Питч для гостевых участий в топовых подкастах и медиа-кит",
      instructions: [
        "Demonstrate genuine listener proof by referencing specific quotes from recent episodes.",
        "Propose 3 distinct, provocative topic angles with catchy episode titles tailored to their audience.",
        "Include concise credibility bullet points and promotional co-distribution commitments."
],
      ruInstructions: [
        "Покажите, что реально слушали подкаст, сославшись на конкретную цитату из недавнего выпуска.",
        "Предложите 3 провокационные темы с готовыми цепляющими названиями выпусков.",
        "Приведите ключевые регалии и готовность промотировать выпуск на свою базу."
],
      semanticType: "process_directive",
      tags: ["social","pr","podcasting","guest-pitch","media-outreach"],
    }),
  },

  "crisis-social-media-pr-firestorm-response": {
    id: "crisis-social-media-pr-firestorm-response",
    name: "CrisisSocialMediaPrFirestormResponseSkill",
    displayName: "Social Media PR Crisis & Firestorm Response Protocol",
    categoryId: "social",
    description: "Manages viral backlash: immediate containment, genuine accountability statements, channel pause directives, and empathetic remediation.",
    tags: ["social","crisis-pr","brand-protection","firestorm","communications"],
    transform: createStandardSkillTransform({
      sectionName: "PR Firestorm Response Protocol",
      ruSectionName: "Протокол антикризисного PR и реагирования на негатив в соцсетях",
      instructions: [
        "Immediately pause all scheduled automated marketing posts and promotional ad campaigns.",
        "Draft swift, non-defensive accountability statement acknowledging impact without evasive excuses.",
        "Outline concrete, time-bound remedial actions and dedicate a 1-on-1 resolution team."
],
      ruInstructions: [
        "Немедленно остановите все запланированные рекламные посты и автоматические кампании.",
        "Выпустите искреннее заявление без оправданий и перекладывания вины.",
        "Озвучьте четкие шаги по исправлению ситуации и выделите команду для точечной работы с пострадавшими."
],
      semanticType: "process_directive",
      tags: ["social","crisis-pr","brand-protection","firestorm","communications"],
    }),
  },

  "influencer-creator-brief-creative-freedom": {
    id: "influencer-creator-brief-creative-freedom",
    name: "InfluencerCreatorBriefCreativeFreedomSkill",
    displayName: "Influencer Campaign Brief & Creative Freedom Matrix",
    categoryId: "social",
    description: "Balances strict brand messaging guardrails with native creator autonomy to maximize sponsored integration authenticity and conversions.",
    tags: ["social","influencer-marketing","creator-brief","sponsorships","ugc"],
    transform: createStandardSkillTransform({
      sectionName: "Creator Brief & Guardrails Specification",
      ruSectionName: "Бриф для блогеров и баланс креативной свободы интеграций",
      instructions: [
        "Specify 2-3 mandatory key talking points and strict do-not-mention guardrails.",
        "Empower the creator to adapt the storytelling format to their native audience voice.",
        "Define clear visual deliverable specs, tracking link mechanics, and FTC sponsorship disclosure guidelines (#ad)."
],
      ruInstructions: [
        "Укажите 2-3 обязательных тезиса и строгий стоп-лист запрещенных формулировок.",
        "Предоставьте блогеру свободу подачи в его привычном авторском стиле.",
        "Зафиксируйте технические требования к видео, UTM-меткам и маркировке рекламы."
],
      semanticType: 'protocol',
      tags: ["social","influencer-marketing","creator-brief","sponsorships","ugc"],
    }),
  },

  "product-hunt-launch-day-playbook": {
    id: "product-hunt-launch-day-playbook",
    name: "ProductHuntLaunchDayPlaybookSkill",
    displayName: "Product Hunt Launch Day Hour-by-Hour Playbook",
    categoryId: "social",
    description: "Executes a disciplined 24-hour Product Hunt launch: Hunter alignment, Maker comment story, community activation waves, and comment responses.",
    tags: ["social","product-hunt","launch","gtm","growth-hacking"],
    transform: createStandardSkillTransform({
      sectionName: "Product Hunt Launch Architecture",
      ruSectionName: "Почасовой регламент запуска на Product Hunt",
      instructions: [
        "12:01 AM PST: Publish listing with compelling animated GIF thumbnail, tagline, and First Maker Comment.",
        "Schedule 4 staggered global outreach waves (Asia, Europe, US East, US West) to sustain rank momentum.",
        "Respond to 100% of user comments within 15 minutes with thoughtful, value-additive replies."
],
      ruInstructions: [
        "00:01 PST: Опубликуйте проект с анимированной обложкой, емким теглайном и первым комментарием создателя.",
        "Разделите оповещение комьюнити на 4 волны по часовым поясам для удержания позиций в топе.",
        "Отвечайте на каждый комментарий в течение 15 минут с развернутыми ответами."
],
      semanticType: "process_directive",
      tags: ["social","product-hunt","launch","gtm","growth-hacking"],
    }),
  },

  "twitter-x-growth-algorithm-tuning": {
    id: "twitter-x-growth-algorithm-tuning",
    name: "TwitterXGrowthAlgorithmTuningSkill",
    displayName: "X / Twitter Algorithmic Optimization & Engagement Signals",
    categoryId: "social",
    description: "Aligns posting strategies with open-source X algorithm weights: Retweets, Replies, Bookmarks, Media embeds, and Author Reputation scores.",
    tags: ["social","twitter","x-algorithm","engagement","growth"],
    transform: createStandardSkillTransform({
      sectionName: "X / Twitter Algorithm Tuning Protocol",
      ruSectionName: "Оптимизация под алгоритмы X / Twitter (букмарки, реплаи, цитирования)",
      instructions: [
        "Optimize for high-weight ranking signals: Bookmarks (high utility cheat sheets) and Extended Replies.",
        "Avoid outbound links in the root tweet; place links in the second tweet of the thread.",
        "Actively engage with commenters in the first 60 minutes after posting to boost tweet velocity score."
],
      ruInstructions: [
        "Делайте фокус на сохранение в закладки (чек-листы) и содержательные ветки реплаев.",
        "Не вставляйте внешние ссылки в первый твит; переносите ссылки во второй твит треда.",
        "Ведите активный диалог в первые 60 минут после публикации для разгона алгоритма."
],
      semanticType: "process_directive",
      tags: ["social","twitter","x-algorithm","engagement","growth"],
    }),
  },

  "viral-meme-culture-jacking-speed-engine": {
    id: "viral-meme-culture-jacking-speed-engine",
    name: "ViralMemeCultureJackingSpeedEngineSkill",
    displayName: "Meme Culture Jacking & Trend Hijacking Framework",
    categoryId: "social",
    description: "Rapidly maps trending cultural meme formats onto niche industry pain points with zero corporate cringe.",
    tags: ["social","memes","culture-jacking","humor","viral-marketing"],
    transform: createStandardSkillTransform({
      sectionName: "Meme Culture Jacking Protocol",
      ruSectionName: "Протокол ситуативного мем-маркетинга и ньюсджекинга",
      instructions: [
        "Identify emerging cultural memes with rising velocity within 24 hours of breakout.",
        "Map the underlying emotional conflict cleanly onto a relatable domain pain point.",
        "Maintain ruthless simplicity; do not over-explain or over-brand the visual."
],
      ruInstructions: [
        "Перехватывайте вирусные мем-форматы в первые 24 часа их взрывного роста.",
        "Точно наложите эмоциональную суть мема на острую профессиональную боль аудитории.",
        "Сохраняйте лаконичность: не перегружайте картинку брендингом и длинными текстами."
],
      semanticType: "process_directive",
      tags: ["social","memes","culture-jacking","humor","viral-marketing"],
    }),
  },

  "b2b-executive-ghostwriting-voice-mirror": {
    id: "b2b-executive-ghostwriting-voice-mirror",
    name: "B2bExecutiveGhostwritingVoiceMirrorSkill",
    displayName: "Executive Ghostwriting & Stylometric Voice Mirroring",
    categoryId: "social",
    description: "Captures an executive’s cadence, sentence rhythm, preferred metaphors, and vocabulary to produce high-impact thought leadership content.",
    tags: ["social","ghostwriting","executive-branding","thought-leadership","stylometry"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Voice Ghostwriting Protocol",
      ruSectionName: "Гострайтинг для топ-менеджеров и калибровка авторского голоса",
      instructions: [
        "Analyze executive speech samples for average sentence length, rhetorical devices, and signature phrases.",
        "Draft opinion pieces expressing bold, decisive points of view rather than bland corporate press releases.",
        "Refine drafts through the executive’s personal lens of operational anecdotes."
],
      ruInstructions: [
        "Изучите образцы речи руководителя: ритм предложений, любимые метафоры и фразеологизмы.",
        "Формулируйте смелые управленческие тезисы, избегая безликого корпоративного языка.",
        "Обогащайте посты реальными рабочими примерами из практики спикера."
],
      semanticType: "process_directive",
      tags: ["social","ghostwriting","executive-branding","thought-leadership","stylometry"],
    }),
  },

  "community-advocate-superfan-ambassador-program": {
    id: "community-advocate-superfan-ambassador-program",
    name: "CommunityAdvocateSuperfanAmbassadorProgramSkill",
    displayName: "Superfan & Brand Ambassador Community Program",
    categoryId: "social",
    description: "Identifies top 1% power users and empowers them with exclusive preview builds, direct founder access, exclusive swag, and co-creation privileges.",
    tags: ["social","ambassador","superfans","brand-advocacy","community-growth"],
    transform: createStandardSkillTransform({
      sectionName: "Brand Ambassador Program Architecture",
      ruSectionName: "Программа амбассадоров и суперфанатов бренда",
      instructions: [
        "Identify high-engagement advocates via product telemetry and community activity.",
        "Grant exclusive insider perks: private beta channels, direct founder townhalls, special badges.",
        "Equip ambassadors with co-marketing toolkits and referral rewards."
],
      ruInstructions: [
        "Выявите самых активных пользователей по метрикам продукта и активности в чатах.",
        "Предоставьте им закрытые привилегии: доступ к бета-тестам, созвоны с фаундерами, знаки отличия.",
        "Снабдите амбассадоров промо-материалами и реферальными бонусами."
],
      semanticType: 'protocol',
      tags: ["social","ambassador","superfans","brand-advocacy","community-growth"],
    }),
  },

  "live-stream-webinar-interactive-run-of-show": {
    id: "live-stream-webinar-interactive-run-of-show",
    name: "LiveStreamWebinarInteractiveRunOfShowSkill",
    displayName: "Live Webinar / Stream Run-of-Show & Audience Interaction",
    categoryId: "social",
    description: "Constructs minute-by-minute live broadcast run-of-show schedules balancing technical demos, audience live polls, and conversion pitches.",
    tags: ["social","webinars","live-streaming","run-of-show","virtual-events"],
    transform: createStandardSkillTransform({
      sectionName: "Live Broadcast Run-of-Show Protocol",
      ruSectionName: "Поминутный сценарий вебинаров и интерактивных трансляций (Run-of-Show)",
      instructions: [
        "Minutes 0-5: Icebreaker engagement + audio/tech verification.",
        "Minutes 5-35: High-density educational walkthrough with interactive chat polls every 7 minutes.",
        "Minutes 35-50: Live Q&A triage, ending with an irresistible, time-limited event offer."
],
      ruInstructions: [
        "0-5 мин: Приветствие, проверка связи и разогревающий вопрос в чат.",
        "5-35 мин: Плотный контентный блок с опросами аудитории каждые 7 минут.",
        "35-50 мин: Ответы на вопросы зрителей и презентация спецпредложения."
],
      semanticType: "process_directive",
      tags: ["social","webinars","live-streaming","run-of-show","virtual-events"],
    }),
  },

  "ugc-viral-challenge-campaign-architecture": {
    id: "ugc-viral-challenge-campaign-architecture",
    name: "UgcViralChallengeCampaignArchitectureSkill",
    displayName: "UGC Hashtag Challenge & Incentive Mechanics",
    categoryId: "social",
    description: "Designs low-barrier viral user-generated content (UGC) challenges with recognizable audio tracks, visual templates, and gamified leaderboards.",
    tags: ["social","ugc","hashtag-challenge","viral-campaigns","gamification"],
    transform: createStandardSkillTransform({
      sectionName: "UGC Viral Challenge Architecture",
      ruSectionName: "Архитектура вирусных UGC-челленджей и пользовательского контента",
      instructions: [
        "Create an easily reproducible visual/audio premise requiring zero special equipment.",
        "Seed the challenge with 10-20 micro-creators demonstrating the format simultaneously.",
        "Aggregate submissions via dedicated hashtag and curate community favorites weekly."
],
      ruInstructions: [
        "Придумайте легко повторяемое действие под запоминающийся звук без сложного реквизита.",
        "Запустите челлендж с посевом у 10-20 блогеров в один день.",
        "Агрегируйте работы по уникальному хештегу и награждайте лучшие креативы."
],
      semanticType: 'protocol',
      tags: ["social","ugc","hashtag-challenge","viral-campaigns","gamification"],
    }),
  },

  "customer-review-testimonial-harvesting-system": {
    id: "customer-review-testimonial-harvesting-system",
    name: "CustomerReviewTestimonialHarvestingSystemSkill",
    displayName: "Automated 5-Star Testimonial & Case Study Harvesting",
    categoryId: "social",
    description: "Triggers timely automated review requests at moments of peak user delight (NPS 9-10 scores, feature milestones) to collect verified G2/Trustpilot reviews.",
    tags: ["social","reviews","testimonials","g2","trustpilot","social-proof"],
    transform: createStandardSkillTransform({
      sectionName: "Testimonial & Review Harvesting Protocol",
      ruSectionName: "Система сбора отзывов и кейсов в моменты максимальной радости клиента",
      instructions: [
        "Trigger review requests immediately after milestone moments (e.g. 100th task completed, positive NPS rating).",
        "Provide a 3-question guided prompt (Challenge, Solution, Measurable Result).",
        "Direct promoters to public third-party review platforms (G2, Capterra, Google Reviews)."
],
      ruInstructions: [
        "Отправляйте запрос отзыва в момент триумфа пользователя (закрытие крупной цели, высокий NPS).",
        "Дайте структуру из 3 вопросов (Какая была проблема? Как решили? Какой получили результат?).",
        "Направляйте довольных клиентов на независимые платформы отзывов (G2, Trustpilot)."
],
      semanticType: "process_directive",
      tags: ["social","reviews","testimonials","g2","trustpilot","social-proof"],
    }),
  },

  "social-listening-sentiment-trend-radar": {
    id: "social-listening-sentiment-trend-radar",
    name: "SocialListeningSentimentTrendRadarSkill",
    displayName: "Social Listening & Real-Time Sentiment Radar",
    categoryId: "social",
    description: "Monitors brand keywords, competitor sentiment shifts, and unaddressed customer frustrations across Reddit, X, and forums.",
    tags: ["social","social-listening","sentiment-analysis","brand-monitoring","reputation"],
    transform: createStandardSkillTransform({
      sectionName: "Social Listening & Sentiment Radar Protocol",
      ruSectionName: "Мониторинг инфополя и радар тональности бренда (Social Listening)",
      instructions: [
        "Track brand, competitor, and industry keyword clusters across forums and networks.",
        "Classify sentiment spikes (Positive Advocacy vs Negative Churn Signals).",
        "Route high-urgency unresolved support or sales opportunities to relevant internal teams in under 30 minutes."
],
      ruInstructions: [
        "Настройте мониторинг упоминаний бренда, конкурентов и ключевых терминов индустрии.",
        "Классифицируйте всплески тональности (позитивные отзывы vs негативные жалобы).",
        "Маршрутизируйте острые вопросы в службу заботы или отдел продаж менее чем за 30 минут."
],
      semanticType: 'protocol',
      tags: ["social","social-listening","sentiment-analysis","brand-monitoring","reputation"],
    }),
  },

  "quora-medium-seo-authority-syndication": {
    id: "quora-medium-seo-authority-syndication",
    name: "QuoraMediumSeoAuthoritySyndicationSkill",
    displayName: "Quora & Medium Long-Form SEO Authority Syndication",
    categoryId: "social",
    description: "Repurposes canonical blog research into high-ranking Quora answers and Medium partner articles with proper canonical links.",
    tags: ["social","quora","medium","seo-syndication","content-repurposing"],
    transform: createStandardSkillTransform({
      sectionName: "Content Syndication & Authority Protocol",
      ruSectionName: "Синдикация контента на Medium и Quora для усиления авторитета и SEO",
      instructions: [
        "Select high-intent Quora questions indexed on Google page 1.",
        "Draft in-depth, definitive answers linking back to primary research assets.",
        "Syndicate articles on Medium using `rel=canonical` tags to protect original SEO ranking."
],
      ruInstructions: [
        "Найдите вопросы на Quora с высоким трафиком из поисковиков.",
        "Напишите экспертные исчерпывающие ответы со ссылками на первоисточники.",
        "Опубликуйте материалы на Medium с тегом rel=canonical для сохранения поискового веса оригинала."
],
      semanticType: "process_directive",
      tags: ["social","quora","medium","seo-syndication","content-repurposing"],
    }),
  },

  "crowdfunding-backer-update-storytelling": {
    id: "crowdfunding-backer-update-storytelling",
    name: "CrowdfundingBackerUpdateStorytellingSkill",
    displayName: "Kickstarter / Crowdfunding Backer Update Storytelling",
    categoryId: "social",
    description: "Drafts transparent crowdfunding updates balancing behind-the-scenes manufacturing triumphs, shipping timelines, and community appreciation.",
    tags: ["social","crowdfunding","kickstarter","backer-updates","transparency"],
    transform: createStandardSkillTransform({
      sectionName: "Crowdfunding Backer Update Protocol",
      ruSectionName: "Прозрачные отчеты для бэкеров краудфандинговых кампаний (Kickstarter)",
      instructions: [
        "Open with transparent manufacturing and logistics milestone progress.",
        "Share visual behind-the-scenes photos of tooling, molds, and testing batches.",
        "Address delays honestly with clear mitigation timelines and backer Q&A responses."
],
      ruInstructions: [
        "Начните с честного статуса производства, упаковки и доставки.",
        "Покажите живые фотографии образцов, тестов и сборочной линии.",
        "Открыто прокомментируйте задержки, назвав новые реалистичные сроки и ответив на вопросы."
],
      semanticType: "process_directive",
      tags: ["social","crowdfunding","kickstarter","backer-updates","transparency"],
    }),
  },
  "social-viral-tiktok-shorts-3-second-hook-retention": {
    id: "social-viral-tiktok-shorts-3-second-hook-retention",
    name: "ViralTikTokShorts3SecondHookRetentionSkill",
    displayName: "Viral TikTok/Shorts 3-Second Hook Retention",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Viral TikTok/Shorts 3-Second Hook Retention.",
    tags: ["social","viral","tiktok","shorts"],
    transform: createStandardSkillTransform({
      sectionName: "TikTok Hook Retention Standards",
      ruSectionName: "Стандарты и практические требования: Viral TikTok/Shorts 3-Second Hook Retention",
      instructions: [
        "Apply core domain tenets and industry best practices for Viral TikTok/Shorts 3-Second Hook Retention.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Viral TikTok/Shorts 3-Second Hook Retention.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","viral","tiktok","shorts"],
    }),
  },

  "social-linkedin-executive-personal-branding-algorithm": {
    id: "social-linkedin-executive-personal-branding-algorithm",
    name: "LinkedInExecutivePersonalBrandingAlgorithmSkill",
    displayName: "LinkedIn Executive Personal Branding Algorithm",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for LinkedIn Executive Personal Branding Algorithm.",
    tags: ["social","linkedin","executive","personal"],
    transform: createStandardSkillTransform({
      sectionName: "LinkedIn Algorithm Branding Standards",
      ruSectionName: "Стандарты и практические требования: LinkedIn Executive Personal Branding Algorithm",
      instructions: [
        "Apply core domain tenets and industry best practices for LinkedIn Executive Personal Branding Algorithm.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для LinkedIn Executive Personal Branding Algorithm.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","linkedin","executive","personal"],
    }),
  },

  "social-community-discord-server-onboarding-roles": {
    id: "social-community-discord-server-onboarding-roles",
    name: "CommunityDiscordServerOnboardingRolesSkill",
    displayName: "Community Discord Server Onboarding & Roles",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Community Discord Server Onboarding & Roles.",
    tags: ["social","community","discord","server"],
    transform: createStandardSkillTransform({
      sectionName: "Discord Server Community Blueprint",
      ruSectionName: "Стандарты и практические требования: Community Discord Server Onboarding & Roles",
      instructions: [
        "Apply core domain tenets and industry best practices for Community Discord Server Onboarding & Roles.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Community Discord Server Onboarding & Roles.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","community","discord","server"],
    }),
  },

  "social-influencer-sponsorship-roi-utm-attribution": {
    id: "social-influencer-sponsorship-roi-utm-attribution",
    name: "InfluencerSponsorshipROIUTMAttributionSkill",
    displayName: "Influencer Sponsorship ROI & UTM Attribution",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Influencer Sponsorship ROI & UTM Attribution.",
    tags: ["social","influencer","sponsorship","roi"],
    transform: createStandardSkillTransform({
      sectionName: "Influencer Sponsorship Tracking Protocol",
      ruSectionName: "Стандарты и практические требования: Influencer Sponsorship ROI & UTM Attribution",
      instructions: [
        "Apply core domain tenets and industry best practices for Influencer Sponsorship ROI & UTM Attribution.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Influencer Sponsorship ROI & UTM Attribution.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","influencer","sponsorship","roi"],
    }),
  },

  "social-crisis-public-relations-twitter-storm-defusal": {
    id: "social-crisis-public-relations-twitter-storm-defusal",
    name: "CrisisPublicRelationsTwitterStormDefusalSkill",
    displayName: "Crisis Public Relations Twitter Storm Defusal",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Crisis Public Relations Twitter Storm Defusal.",
    tags: ["social","crisis","public","relations"],
    transform: createStandardSkillTransform({
      sectionName: "Crisis PR Defusal Architecture",
      ruSectionName: "Стандарты и практические требования: Crisis Public Relations Twitter Storm Defusal",
      instructions: [
        "Apply core domain tenets and industry best practices for Crisis Public Relations Twitter Storm Defusal.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Crisis Public Relations Twitter Storm Defusal.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","crisis","public","relations"],
    }),
  },

  "social-reddit-authentic-community-engagement-no-self-promo": {
    id: "social-reddit-authentic-community-engagement-no-self-promo",
    name: "RedditAuthenticCommunityEngagementNoSelfPromoSkill",
    displayName: "Reddit Authentic Community Engagement (No-Self-Promo)",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Reddit Authentic Community Engagement (No-Self-Promo).",
    tags: ["social","reddit","authentic","community"],
    transform: createStandardSkillTransform({
      sectionName: "Reddit Community Engagement Standards",
      ruSectionName: "Стандарты и практические требования: Reddit Authentic Community Engagement (No-Self-Promo)",
      instructions: [
        "Apply core domain tenets and industry best practices for Reddit Authentic Community Engagement (No-Self-Promo).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Reddit Authentic Community Engagement (No-Self-Promo).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","reddit","authentic","community"],
    }),
  },

  "social-instagram-carousel-micro-learning-slide-deck": {
    id: "social-instagram-carousel-micro-learning-slide-deck",
    name: "InstagramCarouselMicroLearningSlideDeckSkill",
    displayName: "Instagram Carousel Micro-Learning Slide Deck",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Instagram Carousel Micro-Learning Slide Deck.",
    tags: ["social","instagram","carousel","micro"],
    transform: createStandardSkillTransform({
      sectionName: "Instagram Carousel Slide Blueprint",
      ruSectionName: "Стандарты и практические требования: Instagram Carousel Micro-Learning Slide Deck",
      instructions: [
        "Apply core domain tenets and industry best practices for Instagram Carousel Micro-Learning Slide Deck.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Instagram Carousel Micro-Learning Slide Deck.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","instagram","carousel","micro"],
    }),
  },

  "social-podcast-guest-pitching-email-outreach-sequence": {
    id: "social-podcast-guest-pitching-email-outreach-sequence",
    name: "PodcastGuestPitchingEmailOutreachSequenceSkill",
    displayName: "Podcast Guest Pitching Email Outreach Sequence",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Podcast Guest Pitching Email Outreach Sequence.",
    tags: ["social","podcast","guest","pitching"],
    transform: createStandardSkillTransform({
      sectionName: "Podcast Guest Outreach Sequence",
      ruSectionName: "Стандарты и практические требования: Podcast Guest Pitching Email Outreach Sequence",
      instructions: [
        "Apply core domain tenets and industry best practices for Podcast Guest Pitching Email Outreach Sequence.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Podcast Guest Pitching Email Outreach Sequence.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","podcast","guest","pitching"],
    }),
  },

  "social-youtube-thumbnail-title-click-through-optimization": {
    id: "social-youtube-thumbnail-title-click-through-optimization",
    name: "YouTubeThumbnailTitleClickThroughOptimizationSkill",
    displayName: "YouTube Thumbnail & Title Click-Through Optimization",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for YouTube Thumbnail & Title Click-Through Optimization.",
    tags: ["social","youtube","thumbnail","title"],
    transform: createStandardSkillTransform({
      sectionName: "YouTube CTR Optimization Standards",
      ruSectionName: "Стандарты и практические требования: YouTube Thumbnail & Title Click-Through Optimization",
      instructions: [
        "Apply core domain tenets and industry best practices for YouTube Thumbnail & Title Click-Through Optimization.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для YouTube Thumbnail & Title Click-Through Optimization.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","youtube","thumbnail","title"],
    }),
  },

  "social-social-proof-ugc-user-generated-content-campaign": {
    id: "social-social-proof-ugc-user-generated-content-campaign",
    name: "SocialProofUGCUserGeneratedContentCampaignSkill",
    displayName: "Social Proof UGC (User-Generated Content) Campaign",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Social Proof UGC (User-Generated Content) Campaign.",
    tags: ["social","social","proof","ugc"],
    transform: createStandardSkillTransform({
      sectionName: "UGC Campaign Social Proof Blueprint",
      ruSectionName: "Стандарты и практические требования: Social Proof UGC (User-Generated Content) Campaign",
      instructions: [
        "Apply core domain tenets and industry best practices for Social Proof UGC (User-Generated Content) Campaign.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Social Proof UGC (User-Generated Content) Campaign.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","social","proof","ugc"],
    }),
  },

  "social-twitter-x-long-form-educational-thread-architecture": {
    id: "social-twitter-x-long-form-educational-thread-architecture",
    name: "TwitterXLongFormEducationalThreadArchitectureSkill",
    displayName: "Twitter/X Long-Form Educational Thread Architecture",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Twitter/X Long-Form Educational Thread Architecture.",
    tags: ["social","twitter","x","long"],
    transform: createStandardSkillTransform({
      sectionName: "Twitter Thread Narrative Architecture",
      ruSectionName: "Стандарты и практические требования: Twitter/X Long-Form Educational Thread Architecture",
      instructions: [
        "Apply core domain tenets and industry best practices for Twitter/X Long-Form Educational Thread Architecture.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Twitter/X Long-Form Educational Thread Architecture.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","twitter","x","long"],
    }),
  },

  "social-online-community-ambassador-champion-program": {
    id: "social-online-community-ambassador-champion-program",
    name: "OnlineCommunityAmbassadorChampionProgramSkill",
    displayName: "Online Community Ambassador Champion Program",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Online Community Ambassador Champion Program.",
    tags: ["social","online","community","ambassador"],
    transform: createStandardSkillTransform({
      sectionName: "Community Ambassador Program Standards",
      ruSectionName: "Стандарты и практические требования: Online Community Ambassador Champion Program",
      instructions: [
        "Apply core domain tenets and industry best practices for Online Community Ambassador Champion Program.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Online Community Ambassador Champion Program.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","online","community","ambassador"],
    }),
  },

  "social-brand-hashtag-challenge-gamification-campaign": {
    id: "social-brand-hashtag-challenge-gamification-campaign",
    name: "BrandHashtagChallengeGamificationCampaignSkill",
    displayName: "Brand Hashtag Challenge Gamification Campaign",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Brand Hashtag Challenge Gamification Campaign.",
    tags: ["social","brand","hashtag","challenge"],
    transform: createStandardSkillTransform({
      sectionName: "Brand Hashtag Gamification Protocol",
      ruSectionName: "Стандарты и практические требования: Brand Hashtag Challenge Gamification Campaign",
      instructions: [
        "Apply core domain tenets and industry best practices for Brand Hashtag Challenge Gamification Campaign.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Brand Hashtag Challenge Gamification Campaign.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","brand","hashtag","challenge"],
    }),
  },

  "social-b2b-social-selling-linkedin-inmail-outreach": {
    id: "social-b2b-social-selling-linkedin-inmail-outreach",
    name: "B2BSocialSellingLinkedInInMailOutreachSkill",
    displayName: "B2B Social Selling LinkedIn InMail Outreach",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for B2B Social Selling LinkedIn InMail Outreach.",
    tags: ["social","b2b","social","selling"],
    transform: createStandardSkillTransform({
      sectionName: "Social Selling InMail Standards",
      ruSectionName: "Стандарты и практические требования: B2B Social Selling LinkedIn InMail Outreach",
      instructions: [
        "Apply core domain tenets and industry best practices for B2B Social Selling LinkedIn InMail Outreach.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для B2B Social Selling LinkedIn InMail Outreach.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","b2b","social","selling"],
    }),
  },

  "social-community-moderation-anti-trolling-rule-enforcement": {
    id: "social-community-moderation-anti-trolling-rule-enforcement",
    name: "CommunityModerationAntiTrollingRuleEnforcementSkill",
    displayName: "Community Moderation Anti-Trolling Rule Enforcement",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Community Moderation Anti-Trolling Rule Enforcement.",
    tags: ["social","community","moderation","anti"],
    transform: createStandardSkillTransform({
      sectionName: "Community Anti-Trolling Rules",
      ruSectionName: "Стандарты и практические требования: Community Moderation Anti-Trolling Rule Enforcement",
      instructions: [
        "Apply core domain tenets and industry best practices for Community Moderation Anti-Trolling Rule Enforcement.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Community Moderation Anti-Trolling Rule Enforcement.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","community","moderation","anti"],
    }),
  },

  "social-live-stream-engagement-q-a-chat-polling-protocol": {
    id: "social-live-stream-engagement-q-a-chat-polling-protocol",
    name: "LiveStreamEngagementQAChatPollingProtocolSkill",
    displayName: "Live Stream Engagement Q&A Chat Polling Protocol",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Live Stream Engagement Q&A Chat Polling Protocol.",
    tags: ["social","live","stream","engagement"],
    transform: createStandardSkillTransform({
      sectionName: "Live Stream Engagement Standards",
      ruSectionName: "Стандарты и практические требования: Live Stream Engagement Q&A Chat Polling Protocol",
      instructions: [
        "Apply core domain tenets and industry best practices for Live Stream Engagement Q&A Chat Polling Protocol.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Live Stream Engagement Q&A Chat Polling Protocol.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","live","stream","engagement"],
    }),
  },

  "social-micro-influencer-seed-gifting-campaign-blueprint": {
    id: "social-micro-influencer-seed-gifting-campaign-blueprint",
    name: "MicroInfluencerSeedGiftingCampaignBlueprintSkill",
    displayName: "Micro-Influencer Seed Gifting Campaign Blueprint",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Micro-Influencer Seed Gifting Campaign Blueprint.",
    tags: ["social","micro","influencer","seed"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-Influencer Gifting Blueprint",
      ruSectionName: "Стандарты и практические требования: Micro-Influencer Seed Gifting Campaign Blueprint",
      instructions: [
        "Apply core domain tenets and industry best practices for Micro-Influencer Seed Gifting Campaign Blueprint.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Micro-Influencer Seed Gifting Campaign Blueprint.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","micro","influencer","seed"],
    }),
  },

  "social-social-media-analytics-engagement-rate-benchmark": {
    id: "social-social-media-analytics-engagement-rate-benchmark",
    name: "SocialMediaAnalyticsEngagementRateBenchmarkSkill",
    displayName: "Social Media Analytics Engagement Rate Benchmark",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Social Media Analytics Engagement Rate Benchmark.",
    tags: ["social","social","media","analytics"],
    transform: createStandardSkillTransform({
      sectionName: "Social Analytics Benchmark Protocol",
      ruSectionName: "Стандарты и практические требования: Social Media Analytics Engagement Rate Benchmark",
      instructions: [
        "Apply core domain tenets and industry best practices for Social Media Analytics Engagement Rate Benchmark.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Social Media Analytics Engagement Rate Benchmark.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","social","media","analytics"],
    }),
  },

  "social-viral-meme-format-subcultural-hijacking-ethical": {
    id: "social-viral-meme-format-subcultural-hijacking-ethical",
    name: "ViralMemeFormatSubculturalHijackingEthicalSkill",
    displayName: "Viral Meme Format Subcultural Hijacking (Ethical)",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Viral Meme Format Subcultural Hijacking (Ethical).",
    tags: ["social","viral","meme","format"],
    transform: createStandardSkillTransform({
      sectionName: "Meme Hijacking Ethical Standards",
      ruSectionName: "Стандарты и практические требования: Viral Meme Format Subcultural Hijacking (Ethical)",
      instructions: [
        "Apply core domain tenets and industry best practices for Viral Meme Format Subcultural Hijacking (Ethical).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Viral Meme Format Subcultural Hijacking (Ethical).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","viral","meme","format"],
    }),
  },

  "social-product-hunt-launch-day-community-mobilization": {
    id: "social-product-hunt-launch-day-community-mobilization",
    name: "ProductHuntLaunchDayCommunityMobilizationSkill",
    displayName: "Product Hunt Launch Day Community Mobilization",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Product Hunt Launch Day Community Mobilization.",
    tags: ["social","product","hunt","launch"],
    transform: createStandardSkillTransform({
      sectionName: "Product Hunt Mobilization Protocol",
      ruSectionName: "Стандарты и практические требования: Product Hunt Launch Day Community Mobilization",
      instructions: [
        "Apply core domain tenets and industry best practices for Product Hunt Launch Day Community Mobilization.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Product Hunt Launch Day Community Mobilization.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","product","hunt","launch"],
    }),
  },

  "social-newsletter-cross-promotion-swap-sponsorship": {
    id: "social-newsletter-cross-promotion-swap-sponsorship",
    name: "NewsletterCrossPromotionSwapSponsorshipSkill",
    displayName: "Newsletter Cross-Promotion Swap Sponsorship",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Newsletter Cross-Promotion Swap Sponsorship.",
    tags: ["social","newsletter","cross","promotion"],
    transform: createStandardSkillTransform({
      sectionName: "Newsletter Cross-Promo Protocol",
      ruSectionName: "Стандарты и практические требования: Newsletter Cross-Promotion Swap Sponsorship",
      instructions: [
        "Apply core domain tenets and industry best practices for Newsletter Cross-Promotion Swap Sponsorship.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Newsletter Cross-Promotion Swap Sponsorship.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","newsletter","cross","promotion"],
    }),
  },

  "social-customer-story-video-testimonial-interview-blueprint": {
    id: "social-customer-story-video-testimonial-interview-blueprint",
    name: "CustomerStoryVideoTestimonialInterviewBlueprintSkill",
    displayName: "Customer Story Video Testimonial Interview Blueprint",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Customer Story Video Testimonial Interview Blueprint.",
    tags: ["social","customer","story","video"],
    transform: createStandardSkillTransform({
      sectionName: "Video Testimonial Interview Standards",
      ruSectionName: "Стандарты и практические требования: Customer Story Video Testimonial Interview Blueprint",
      instructions: [
        "Apply core domain tenets and industry best practices for Customer Story Video Testimonial Interview Blueprint.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Customer Story Video Testimonial Interview Blueprint.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","customer","story","video"],
    }),
  },

  "social-pinterest-search-engine-keyword-pin-strategy": {
    id: "social-pinterest-search-engine-keyword-pin-strategy",
    name: "PinterestSearchEngineKeywordPinStrategySkill",
    displayName: "Pinterest Search Engine Keyword Pin Strategy",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Pinterest Search Engine Keyword Pin Strategy.",
    tags: ["social","pinterest","search","engine"],
    transform: createStandardSkillTransform({
      sectionName: "Pinterest Search Strategy Blueprint",
      ruSectionName: "Стандарты и практические требования: Pinterest Search Engine Keyword Pin Strategy",
      instructions: [
        "Apply core domain tenets and industry best practices for Pinterest Search Engine Keyword Pin Strategy.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Pinterest Search Engine Keyword Pin Strategy.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","pinterest","search","engine"],
    }),
  },

  "social-brand-tone-of-voice-multi-channel-social-matrix": {
    id: "social-brand-tone-of-voice-multi-channel-social-matrix",
    name: "BrandToneofVoiceMultiChannelSocialMatrixSkill",
    displayName: "Brand Tone of Voice Multi-Channel Social Matrix",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Brand Tone of Voice Multi-Channel Social Matrix.",
    tags: ["social","brand","tone","of"],
    transform: createStandardSkillTransform({
      sectionName: "Social Voice Tone Matrix Standards",
      ruSectionName: "Стандарты и практические требования: Brand Tone of Voice Multi-Channel Social Matrix",
      instructions: [
        "Apply core domain tenets and industry best practices for Brand Tone of Voice Multi-Channel Social Matrix.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Brand Tone of Voice Multi-Channel Social Matrix.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","brand","tone","of"],
    }),
  },

  "social-social-listening-sentiment-spike-alert-protocol": {
    id: "social-social-listening-sentiment-spike-alert-protocol",
    name: "SocialListeningSentimentSpikeAlertProtocolSkill",
    displayName: "Social Listening Sentiment Spike Alert Protocol",
    categoryId: "social",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Social Listening Sentiment Spike Alert Protocol.",
    tags: ["social","social","listening","sentiment"],
    transform: createStandardSkillTransform({
      sectionName: "Social Listening Sentiment Alert Rules",
      ruSectionName: "Стандарты и практические требования: Social Listening Sentiment Spike Alert Protocol",
      instructions: [
        "Apply core domain tenets and industry best practices for Social Listening Sentiment Spike Alert Protocol.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Social Listening Sentiment Spike Alert Protocol.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["social","social","listening","sentiment"],
    }),
  },
};
