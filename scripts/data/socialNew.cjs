const newSocialSkills = [
  {
    id: 'linkedin-carousel-educational-storyboard',
    name: 'LinkedinCarouselEducationalStoryboardSkill',
    displayName: 'LinkedIn High-Dwell Multi-Slide Carousel Architecture',
    categoryId: 'social',
    description: 'Designs 8-12 slide PDF document carousels optimized for maximum dwell time, scroll completion, and professional saves.',
    tags: ['social', 'linkedin', 'carousel', 'storyboarding', 'b2b-content'],
    sectionName: 'LinkedIn Carousel Storyboard Architecture',
    ruSectionName: 'Архитектура образовательных каруселей для LinkedIn (высокий Dwell Time)',
    semanticType: 'process_directive',
    instructions: [
      'Slide 1: High-contrast title hook with tangible promise and "Swipe ->" micro-cue.',
      'Slides 2-7: One single clear insight per slide with diagrammatic visuals and bold key terms.',
      'Slide 8: Summary cheat-sheet recap, followed by Final Slide with save/repost CTA.'
    ],
    ruInstructions: [
      'Слайд 1: Контрастный заголовок с измеримым обещанием пользы и стрелкой свайпа.',
      'Слайды 2-7: Строго одна ключевая мысль на слайд с визуальными акцентами.',
      'Слайд 8: Сводная шпаргалка, и финальный слайд с призывом сохранить/поделиться.'
    ]
  },
  {
    id: 'youtube-hook-retention-curve-scripting',
    name: 'YoutubeHookRetentionCurveScriptingSkill',
    displayName: 'YouTube First-30-Seconds Hook & Retention Curve Engineering',
    categoryId: 'social',
    description: 'Engineers script pacing to eliminate the initial 30-second drop-off and maintain high average percentage viewed (APV).',
    tags: ['social', 'youtube', 'retention-rate', 'video-scripts', 'apv'],
    sectionName: 'YouTube Retention Scripting Protocol',
    ruSectionName: 'Сценарий первых 30 секунд YouTube и удержание аудитории (APV)',
    semanticType: 'process_directive',
    instructions: [
      'Seconds 0-5: Visual and verbal confirmation matching title/thumbnail promise without generic intros.',
      'Seconds 6-30: High-stakes context setting + immediate open loop tease.',
      'Insert pattern interrupts, pacing resets, and B-roll visual shifts every 4-7 seconds.'
    ],
    ruInstructions: [
      '0-5 секунды: Мгновенное подтверждение темы с превью без затяжных заставок.',
      '6-30 секунды: Поднятие ставок и создание открытой интриги (Open Loop).',
      'Внедряйте смену планов и перебивки каждые 4-7 секунд для удержания фокуса.'
    ]
  },
  {
    id: 'short-form-tiktok-reels-retention-loop',
    name: 'ShortFormTiktokReelsRetentionLoopSkill',
    displayName: 'TikTok / Reels / Shorts Seamless Loop Architecture',
    categoryId: 'social',
    description: 'Constructs 15-45 second vertical video scripts with seamless audio/visual loops, causing viewers to watch multiple loops before realizing.',
    tags: ['social', 'tiktok', 'reels', 'shorts', 'looping-video'],
    sectionName: 'Short-Form Seamless Loop Scripting',
    ruSectionName: 'Сценарии бесшовных зацикленных видео (Reels / TikTok / Shorts)',
    semanticType: 'process_directive',
    instructions: [
      'Connect the final sentence smoothly into the opening sentence of the video.',
      'Deliver core value in under 25 seconds with energetic, fast-paced narration.',
      'Ensure on-screen action loops seamlessly without abrupt cuts.'
    ],
    ruInstructions: [
      'Свяжите последнее предложение видео с первым для создания эффекта бесконечного цикла.',
      'Уложите главную мысль в 25 секунд без "воды" и пауз.',
      'Обеспечьте бесшовный визуальный переход между концом и началом ролика.'
    ]
  },
  {
    id: 'reddit-authentic-non-promotional-post-craft',
    name: 'RedditAuthenticNonPromotionalPostCraftSkill',
    displayName: 'Reddit High-Karma Vulnerable & Technical Post Craft',
    categoryId: 'social',
    description: 'Drafts deeply authentic, transparent, and non-promotional Reddit posts tailored to specific subreddit cultures (e.g. r/SaaS, r/programming).',
    tags: ['social', 'reddit', 'community', 'organic-growth', 'authenticity'],
    sectionName: 'Reddit Subreddit Culture Alignment',
    ruSectionName: 'Создание аутентичных нерекламных постов для сообществ Reddit',
    semanticType: 'process_directive',
    instructions: [
      'Eliminate marketing jargon, corporate speak, and direct promotional links.',
      'Lead with raw vulnerability, failures, postmortems, or transparent unit metrics.',
      'Provide 100% standalone value inside the text; only share links upon explicit request in comments.'
    ],
    ruInstructions: [
      'Уберите весь маркетинг, ссылки на лендинги и корпоративный тон.',
      'Начните с честного разбора ошибок, цифр и реального практического опыта.',
      'Дайте полную пользу прямо в тексте; ссылки оставляйте только по запросу в комментариях.'
    ]
  },
  {
    id: 'discord-community-engagement-ritual-engine',
    name: 'DiscordCommunityEngagementRitualEngineSkill',
    displayName: 'Discord & Telegram Community Engagement Rituals',
    categoryId: 'social',
    description: 'Designs recurring community rituals (weekly show-and-tell, AMA stages, challenge streaks, onboarding gates) to drive organic daily active users.',
    tags: ['social', 'community', 'discord', 'telegram', 'rituals', 'retention'],
    sectionName: 'Community Ritual & Engagement Engine',
    ruSectionName: 'Архитектура регулярных ритуалов и вовлечения комьюнити (Discord/TG)',
    semanticType: 'strategy_framework',
    instructions: [
      'Establish a 7-day cadence of predictable community events (e.g. #FeedbackFriday, #BuildInPublic Monday).',
      'Design low-friction micro-interactions (polls, reaction-role unlocks, daily questions).',
      'Incentivize peer-to-peer discussions rather than top-down broadcast announcements.'
    ],
    ruInstructions: [
      'Создайте недельный календарь предсказуемых событий (#FeedbackFriday, разборы проектов).',
      'Внедрите микро-активности с низким порогом входа (опросы, реакции, вопрос дня).',
      'Стимулируйте горизонтальное общение участников между собой, а не только новости от админа.'
    ]
  },
  {
    id: 'newsletter-welcome-email-nurture-sequence',
    name: 'NewsletterWelcomeEmailNurtureSequenceSkill',
    displayName: 'Newsletter 5-Part Welcome & Nurture Onboarding Sequence',
    categoryId: 'social',
    description: 'Drafts high-converting 5-email welcome sequences: The Immediate Gift, The Origin Story, The Core Philosophy, The Best-Of Digest, and The Soft Pitch.',
    tags: ['social', 'email-marketing', 'newsletter', 'welcome-sequence', 'retention'],
    sectionName: 'Email Nurture Sequence Protocol',
    ruSectionName: '5-шаговая вводная email-цепочка для подписчиков рассылки',
    semanticType: 'process_directive',
    instructions: [
      'Email 1: Deliver promised lead magnet instantly and prompt a whitelist reply.',
      'Email 2-3: Share vulnerability, origin story, and core contrarian worldview.',
      'Email 4-5: Curate top high-performing content and introduce relevant product tiers gently.'
    ],
    ruInstructions: [
      'Письмо 1: Мгновенная доставка лид-магнита и просьба ответить на письмо для попадания во входящие.',
      'Письма 2-3: Личная история преодоления трудностей и авторская философия.',
      'Письма 4-5: Дайджест лучших материалов и мягкое предложение основного продукта.'
    ]
  },
  {
    id: 'podcast-guest-booking-pitch-mastery',
    name: 'PodcastGuestBookingPitchMasterySkill',
    displayName: 'Top 1% Podcast Guest Pitch & Media Kit',
    categoryId: 'social',
    description: 'Drafts tailored podcast guest pitches referencing recent episodes, proposing 3 spicy contrarian topics, and demonstrating ready audience reach.',
    tags: ['social', 'pr', 'podcasting', 'guest-pitch', 'media-outreach'],
    sectionName: 'Podcast Guest Pitch Architecture',
    ruSectionName: 'Питч для гостевых участий в топовых подкастах и медиа-кит',
    semanticType: 'process_directive',
    instructions: [
      'Demonstrate genuine listener proof by referencing specific quotes from recent episodes.',
      'Propose 3 distinct, provocative topic angles with catchy episode titles tailored to their audience.',
      'Include concise credibility bullet points and promotional co-distribution commitments.'
    ],
    ruInstructions: [
      'Покажите, что реально слушали подкаст, сославшись на конкретную цитату из недавнего выпуска.',
      'Предложите 3 провокационные темы с готовыми цепляющими названиями выпусков.',
      'Приведите ключевые регалии и готовность промотировать выпуск на свою базу.'
    ]
  },
  {
    id: 'crisis-social-media-pr-firestorm-response',
    name: 'CrisisSocialMediaPrFirestormResponseSkill',
    displayName: 'Social Media PR Crisis & Firestorm Response Protocol',
    categoryId: 'social',
    description: 'Manages viral backlash: immediate containment, genuine accountability statements, channel pause directives, and empathetic remediation.',
    tags: ['social', 'crisis-pr', 'brand-protection', 'firestorm', 'communications'],
    sectionName: 'PR Firestorm Response Protocol',
    ruSectionName: 'Протокол антикризисного PR и реагирования на негатив в соцсетях',
    semanticType: 'process_directive',
    instructions: [
      'Immediately pause all scheduled automated marketing posts and promotional ad campaigns.',
      'Draft swift, non-defensive accountability statement acknowledging impact without evasive excuses.',
      'Outline concrete, time-bound remedial actions and dedicate a 1-on-1 resolution team.'
    ],
    ruInstructions: [
      'Немедленно остановите все запланированные рекламные посты и автоматические кампании.',
      'Выпустите искреннее заявление без оправданий и перекладывания вины.',
      'Озвучьте четкие шаги по исправлению ситуации и выделите команду для точечной работы с пострадавшими.'
    ]
  },
  {
    id: 'influencer-creator-brief-creative-freedom',
    name: 'InfluencerCreatorBriefCreativeFreedomSkill',
    displayName: 'Influencer Campaign Brief & Creative Freedom Matrix',
    categoryId: 'social',
    description: 'Balances strict brand messaging guardrails with native creator autonomy to maximize sponsored integration authenticity and conversions.',
    tags: ['social', 'influencer-marketing', 'creator-brief', 'sponsorships', 'ugc'],
    sectionName: 'Creator Brief & Guardrails Specification',
    ruSectionName: 'Бриф для блогеров и баланс креативной свободы интеграций',
    semanticType: 'strategy_framework',
    instructions: [
      'Specify 2-3 mandatory key talking points and strict do-not-mention guardrails.',
      'Empower the creator to adapt the storytelling format to their native audience voice.',
      'Define clear visual deliverable specs, tracking link mechanics, and FTC sponsorship disclosure guidelines (#ad).'
    ],
    ruInstructions: [
      'Укажите 2-3 обязательных тезиса и строгий стоп-лист запрещенных формулировок.',
      'Предоставьте блогеру свободу подачи в его привычном авторском стиле.',
      'Зафиксируйте технические требования к видео, UTM-меткам и маркировке рекламы.'
    ]
  },
  {
    id: 'product-hunt-launch-day-playbook',
    name: 'ProductHuntLaunchDayPlaybookSkill',
    displayName: 'Product Hunt Launch Day Hour-by-Hour Playbook',
    categoryId: 'social',
    description: 'Executes a disciplined 24-hour Product Hunt launch: Hunter alignment, Maker comment story, community activation waves, and comment responses.',
    tags: ['social', 'product-hunt', 'launch', 'gtm', 'growth-hacking'],
    sectionName: 'Product Hunt Launch Architecture',
    ruSectionName: 'Почасовой регламент запуска на Product Hunt',
    semanticType: 'process_directive',
    instructions: [
      '12:01 AM PST: Publish listing with compelling animated GIF thumbnail, tagline, and First Maker Comment.',
      'Schedule 4 staggered global outreach waves (Asia, Europe, US East, US West) to sustain rank momentum.',
      'Respond to 100% of user comments within 15 minutes with thoughtful, value-additive replies.'
    ],
    ruInstructions: [
      '00:01 PST: Опубликуйте проект с анимированной обложкой, емким теглайном и первым комментарием создателя.',
      'Разделите оповещение комьюнити на 4 волны по часовым поясам для удержания позиций в топе.',
      'Отвечайте на каждый комментарий в течение 15 минут с развернутыми ответами.'
    ]
  },
  {
    id: 'twitter-x-growth-algorithm-tuning',
    name: 'TwitterXGrowthAlgorithmTuningSkill',
    displayName: 'X / Twitter Algorithmic Optimization & Engagement Signals',
    categoryId: 'social',
    description: 'Aligns posting strategies with open-source X algorithm weights: Retweets, Replies, Bookmarks, Media embeds, and Author Reputation scores.',
    tags: ['social', 'twitter', 'x-algorithm', 'engagement', 'growth'],
    sectionName: 'X / Twitter Algorithm Tuning Protocol',
    ruSectionName: 'Оптимизация под алгоритмы X / Twitter (букмарки, реплаи, цитирования)',
    semanticType: 'process_directive',
    instructions: [
      'Optimize for high-weight ranking signals: Bookmarks (high utility cheat sheets) and Extended Replies.',
      'Avoid outbound links in the root tweet; place links in the second tweet of the thread.',
      'Actively engage with commenters in the first 60 minutes after posting to boost tweet velocity score.'
    ],
    ruInstructions: [
      'Делайте фокус на сохранение в закладки (чек-листы) и содержательные ветки реплаев.',
      'Не вставляйте внешние ссылки в первый твит; переносите ссылки во второй твит треда.',
      'Ведите активный диалог в первые 60 минут после публикации для разгона алгоритма.'
    ]
  },
  {
    id: 'viral-meme-culture-jacking-speed-engine',
    name: 'ViralMemeCultureJackingSpeedEngineSkill',
    displayName: 'Meme Culture Jacking & Trend Hijacking Framework',
    categoryId: 'social',
    description: 'Rapidly maps trending cultural meme formats onto niche industry pain points with zero corporate cringe.',
    tags: ['social', 'memes', 'culture-jacking', 'humor', 'viral-marketing'],
    sectionName: 'Meme Culture Jacking Protocol',
    ruSectionName: 'Протокол ситуативного мем-маркетинга и ньюсджекинга',
    semanticType: 'process_directive',
    instructions: [
      'Identify emerging cultural memes with rising velocity within 24 hours of breakout.',
      'Map the underlying emotional conflict cleanly onto a relatable domain pain point.',
      'Maintain ruthless simplicity; do not over-explain or over-brand the visual.'
    ],
    ruInstructions: [
      'Перехватывайте вирусные мем-форматы в первые 24 часа их взрывного роста.',
      'Точно наложите эмоциональную суть мема на острую профессиональную боль аудитории.',
      'Сохраняйте лаконичность: не перегружайте картинку брендингом и длинными текстами.'
    ]
  },
  {
    id: 'b2b-executive-ghostwriting-voice-mirror',
    name: 'B2bExecutiveGhostwritingVoiceMirrorSkill',
    displayName: 'Executive Ghostwriting & Stylometric Voice Mirroring',
    categoryId: 'social',
    description: 'Captures an executive’s cadence, sentence rhythm, preferred metaphors, and vocabulary to produce high-impact thought leadership content.',
    tags: ['social', 'ghostwriting', 'executive-branding', 'thought-leadership', 'stylometry'],
    sectionName: 'Executive Voice Ghostwriting Protocol',
    ruSectionName: 'Гострайтинг для топ-менеджеров и калибровка авторского голоса',
    semanticType: 'process_directive',
    instructions: [
      'Analyze executive speech samples for average sentence length, rhetorical devices, and signature phrases.',
      'Draft opinion pieces expressing bold, decisive points of view rather than bland corporate press releases.',
      'Refine drafts through the executive’s personal lens of operational anecdotes.'
    ],
    ruInstructions: [
      'Изучите образцы речи руководителя: ритм предложений, любимые метафоры и фразеологизмы.',
      'Формулируйте смелые управленческие тезисы, избегая безликого корпоративного языка.',
      'Обогащайте посты реальными рабочими примерами из практики спикера.'
    ]
  },
  {
    id: 'community-advocate-superfan-ambassador-program',
    name: 'CommunityAdvocateSuperfanAmbassadorProgramSkill',
    displayName: 'Superfan & Brand Ambassador Community Program',
    categoryId: 'social',
    description: 'Identifies top 1% power users and empowers them with exclusive preview builds, direct founder access, exclusive swag, and co-creation privileges.',
    tags: ['social', 'ambassador', 'superfans', 'brand-advocacy', 'community-growth'],
    sectionName: 'Brand Ambassador Program Architecture',
    ruSectionName: 'Программа амбассадоров и суперфанатов бренда',
    semanticType: 'strategy_framework',
    instructions: [
      'Identify high-engagement advocates via product telemetry and community activity.',
      'Grant exclusive insider perks: private beta channels, direct founder townhalls, special badges.',
      'Equip ambassadors with co-marketing toolkits and referral rewards.'
    ],
    ruInstructions: [
      'Выявите самых активных пользователей по метрикам продукта и активности в чатах.',
      'Предоставьте им закрытые привилегии: доступ к бета-тестам, созвоны с фаундерами, знаки отличия.',
      'Снабдите амбассадоров промо-материалами и реферальными бонусами.'
    ]
  },
  {
    id: 'live-stream-webinar-interactive-run-of-show',
    name: 'LiveStreamWebinarInteractiveRunOfShowSkill',
    displayName: 'Live Webinar / Stream Run-of-Show & Audience Interaction',
    categoryId: 'social',
    description: 'Constructs minute-by-minute live broadcast run-of-show schedules balancing technical demos, audience live polls, and conversion pitches.',
    tags: ['social', 'webinars', 'live-streaming', 'run-of-show', 'virtual-events'],
    sectionName: 'Live Broadcast Run-of-Show Protocol',
    ruSectionName: 'Поминутный сценарий вебинаров и интерактивных трансляций (Run-of-Show)',
    semanticType: 'process_directive',
    instructions: [
      'Minutes 0-5: Icebreaker engagement + audio/tech verification.',
      'Minutes 5-35: High-density educational walkthrough with interactive chat polls every 7 minutes.',
      'Minutes 35-50: Live Q&A triage, ending with an irresistible, time-limited event offer.'
    ],
    ruInstructions: [
      '0-5 мин: Приветствие, проверка связи и разогревающий вопрос в чат.',
      '5-35 мин: Плотный контентный блок с опросами аудитории каждые 7 минут.',
      '35-50 мин: Ответы на вопросы зрителей и презентация спецпредложения.'
    ]
  },
  {
    id: 'ugc-viral-challenge-campaign-architecture',
    name: 'UgcViralChallengeCampaignArchitectureSkill',
    displayName: 'UGC Hashtag Challenge & Incentive Mechanics',
    categoryId: 'social',
    description: 'Designs low-barrier viral user-generated content (UGC) challenges with recognizable audio tracks, visual templates, and gamified leaderboards.',
    tags: ['social', 'ugc', 'hashtag-challenge', 'viral-campaigns', 'gamification'],
    sectionName: 'UGC Viral Challenge Architecture',
    ruSectionName: 'Архитектура вирусных UGC-челленджей и пользовательского контента',
    semanticType: 'strategy_framework',
    instructions: [
      'Create an easily reproducible visual/audio premise requiring zero special equipment.',
      'Seed the challenge with 10-20 micro-creators demonstrating the format simultaneously.',
      'Aggregate submissions via dedicated hashtag and curate community favorites weekly.'
    ],
    ruInstructions: [
      'Придумайте легко повторяемое действие под запоминающийся звук без сложного реквизита.',
      'Запустите челлендж с посевом у 10-20 блогеров в один день.',
      'Агрегируйте работы по уникальному хештегу и награждайте лучшие креативы.'
    ]
  },
  {
    id: 'customer-review-testimonial-harvesting-system',
    name: 'CustomerReviewTestimonialHarvestingSystemSkill',
    displayName: 'Automated 5-Star Testimonial & Case Study Harvesting',
    categoryId: 'social',
    description: 'Triggers timely automated review requests at moments of peak user delight (NPS 9-10 scores, feature milestones) to collect verified G2/Trustpilot reviews.',
    tags: ['social', 'reviews', 'testimonials', 'g2', 'trustpilot', 'social-proof'],
    sectionName: 'Testimonial & Review Harvesting Protocol',
    ruSectionName: 'Система сбора отзывов и кейсов в моменты максимальной радости клиента',
    semanticType: 'process_directive',
    instructions: [
      'Trigger review requests immediately after milestone moments (e.g. 100th task completed, positive NPS rating).',
      'Provide a 3-question guided prompt (Challenge, Solution, Measurable Result).',
      'Direct promoters to public third-party review platforms (G2, Capterra, Google Reviews).'
    ],
    ruInstructions: [
      'Отправляйте запрос отзыва в момент триумфа пользователя (закрытие крупной цели, высокий NPS).',
      'Дайте структуру из 3 вопросов (Какая была проблема? Как решили? Какой получили результат?).',
      'Направляйте довольных клиентов на независимые платформы отзывов (G2, Trustpilot).'
    ]
  },
  {
    id: 'social-listening-sentiment-trend-radar',
    name: 'SocialListeningSentimentTrendRadarSkill',
    displayName: 'Social Listening & Real-Time Sentiment Radar',
    categoryId: 'social',
    description: 'Monitors brand keywords, competitor sentiment shifts, and unaddressed customer frustrations across Reddit, X, and forums.',
    tags: ['social', 'social-listening', 'sentiment-analysis', 'brand-monitoring', 'reputation'],
    sectionName: 'Social Listening & Sentiment Radar Protocol',
    ruSectionName: 'Мониторинг инфополя и радар тональности бренда (Social Listening)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Track brand, competitor, and industry keyword clusters across forums and networks.',
      'Classify sentiment spikes (Positive Advocacy vs Negative Churn Signals).',
      'Route high-urgency unresolved support or sales opportunities to relevant internal teams in under 30 minutes.'
    ],
    ruInstructions: [
      'Настройте мониторинг упоминаний бренда, конкурентов и ключевых терминов индустрии.',
      'Классифицируйте всплески тональности (позитивные отзывы vs негативные жалобы).',
      'Маршрутизируйте острые вопросы в службу заботы или отдел продаж менее чем за 30 минут.'
    ]
  },
  {
    id: 'quora-medium-seo-authority-syndication',
    name: 'QuoraMediumSeoAuthoritySyndicationSkill',
    displayName: 'Quora & Medium Long-Form SEO Authority Syndication',
    categoryId: 'social',
    description: 'Repurposes canonical blog research into high-ranking Quora answers and Medium partner articles with proper canonical links.',
    tags: ['social', 'quora', 'medium', 'seo-syndication', 'content-repurposing'],
    sectionName: 'Content Syndication & Authority Protocol',
    ruSectionName: 'Синдикация контента на Medium и Quora для усиления авторитета и SEO',
    semanticType: 'process_directive',
    instructions: [
      'Select high-intent Quora questions indexed on Google page 1.',
      'Draft in-depth, definitive answers linking back to primary research assets.',
      'Syndicate articles on Medium using `rel=canonical` tags to protect original SEO ranking.'
    ],
    ruInstructions: [
      'Найдите вопросы на Quora с высоким трафиком из поисковиков.',
      'Напишите экспертные исчерпывающие ответы со ссылками на первоисточники.',
      'Опубликуйте материалы на Medium с тегом rel=canonical для сохранения поискового веса оригинала.'
    ]
  },
  {
    id: 'crowdfunding-backer-update-storytelling',
    name: 'CrowdfundingBackerUpdateStorytellingSkill',
    displayName: 'Kickstarter / Crowdfunding Backer Update Storytelling',
    categoryId: 'social',
    description: 'Drafts transparent crowdfunding updates balancing behind-the-scenes manufacturing triumphs, shipping timelines, and community appreciation.',
    tags: ['social', 'crowdfunding', 'kickstarter', 'backer-updates', 'transparency'],
    sectionName: 'Crowdfunding Backer Update Protocol',
    ruSectionName: 'Прозрачные отчеты для бэкеров краудфандинговых кампаний (Kickstarter)',
    semanticType: 'process_directive',
    instructions: [
      'Open with transparent manufacturing and logistics milestone progress.',
      'Share visual behind-the-scenes photos of tooling, molds, and testing batches.',
      'Address delays honestly with clear mitigation timelines and backer Q&A responses.'
    ],
    ruInstructions: [
      'Начните с честного статуса производства, упаковки и доставки.',
      'Покажите живые фотографии образцов, тестов и сборочной линии.',
      'Открыто прокомментируйте задержки, назвав новые реалистичные сроки и ответив на вопросы.'
    ]
  }
];

module.exports = { newSocialSkills };
