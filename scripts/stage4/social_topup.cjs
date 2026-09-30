const { appendSkills } = require('../appendSkills.cjs');

function makeSkill(catFileName, categoryId, prefix, item) {
  const title = item.title;
  const cleanId = `${prefix}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  const pascalName = title.replace(/[^a-zA-Z0-9]/g, '') + 'Skill';

  return {
    id: cleanId,
    name: pascalName,
    displayName: item.displayName || title,
    categoryId: categoryId,
    description: item.desc || `Applies composite ${title} Multi-Skill architecture.`,
    tags: [categoryId, 'multi-skill', prefix, ...(item.tags || [])],
    sectionName: item.sec || `Multi-Skill: ${title}`,
    ruSectionName: item.ruSec || `Композитный Multi-Skill: ${title}`,
    instructions: item.inst || [
      `Phase 1: Setup social media strategy, channel parameters, and target audience persona for ${title}.`,
      `Phase 2: Multi-format content generation, virality optimization, and posting schedule.`,
      `Phase 3: Synthesize community response analysis and performance metrics.`
    ],
    ruInstructions: item.ruInst || [
      `Этап 1: Инициализация стратегии соцсетей, параметров каналов и целевой аудитории для ${title}.`,
      `Этап 2: Многоформатная генерация контента, виральная оптимизация и контент-план.`,
      `Этап 3: Синтез анализа отклика сообщества и метрик эффективности.`
    ],
    semanticType: item.sem || 'process_directive'
  };
}

const SOCIAL_TOPUP_10 = [
  { title: "Multi Channel TikTok YouTube Shorts Reels Cross Post Automation", desc: "Automates multi-platform short video publishing with channel-specific caption tweaks." },
  { title: "Multi Platform Influencer Contract Deliverable Tracking", desc: "Tracks influencer deliverables, usage rights expirations, and promo code attribution." },
  { title: "Multi Format LinkedIn Newsletter Subscriber Growth Funnel", desc: "Builds LinkedIn newsletters converting organic feed readers into dedicated subscribers." },
  { title: "Multi Channel E-Commerce Product Launch Social Hype Campaign", desc: "Creates 14-day countdown hype campaign for e-commerce drops across Instagram and TikTok." },
  { title: "Multi Platform Community Moderation Rule Enforcement Engine", desc: "Automates toxic comment removal, spam filtering, and warning dispatches across social accounts." },
  { title: "Multi Format Podcast Video Clip Highlight Reel Creator", desc: "Extracts high-retention 60-second video podcast clips with animated captions for social." },
  { title: "Multi Channel B2B Employer Branding Talent Attraction", desc: "Showcases employee stories and office culture to attract high-caliber job candidates." },
  { title: "Multi Platform Social Commerce In-App Checkout Funnel", desc: "Configures seamless social media in-app shop checkouts and live stream product tags." },
  { title: "Multi Format Crowdfunding Backer Update Social Storytelling", desc: "Drafts engaging campaign updates maintaining momentum and backer excitement." },
  { title: "Multi Horizon Master Social Growth Audience Expansion Engine", desc: "Enforces master social growth strategy, viral mechanics, community management, and channel dominance." }
];

const skills = SOCIAL_TOPUP_10.map(item => makeSkill('social', 'social', 'social-multi-topup', item));
appendSkills('social', skills);
console.log("Social Top-up Complete!");
