import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
