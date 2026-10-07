import { SKILLS_REGISTRY, type SkillDefinition } from './skillsRegistry';
import { getDeliverableSkillMismatch } from './skillApplicability';
import { classifyTask } from '../utils/taskIntent';

/**
 * Curated optional recommendations for each Prompt Generator domain.
 * IDs are validated against the built-in registry and covered by regression tests.
 */
export const DOMAIN_RECOMMENDED_SKILLS: Record<string, string[]> = {
  Coding: ['code-audit-smells', 'type-safety-contracts', 'regression-test-specs'],
  Business: ['unit-economics-modeling', 'gtm-roadmap-phasing', 'defensible-moats'],
  Copywriting: [
    'copywriting-aida-attention-interest-desire',
    'copywriting-pas-problem-agitate-solve',
    'writing-multi-multi-layer-headline-subheadline-paragraph-harmony',
  ],
  Product: [
    'customer-journey-empathy-friction-map',
    'heuristic-evaluation-nielsen',
    'microcopy-ux-writing',
  ],
  Research: [
    'literature-review-synthesis',
    'methodology-critique-peer-review',
    'analysis-multi-multi-perspective-qualitative-research-analysis',
  ],
  Executive: [
    'core-summary-first-executive-structure-bluf',
    'comparative-tradeoff-matrix',
    'bulleted-executive-memo',
  ],
};

export function getDomainRecommendedSkills(domain: string, task = ''): SkillDefinition[] {
  const classification = classifyTask(task, domain);
  return (DOMAIN_RECOMMENDED_SKILLS[domain] || [])
    .map((id) => SKILLS_REGISTRY[id])
    .filter((skill): skill is SkillDefinition => Boolean(skill))
    .filter((skill) => !getDeliverableSkillMismatch(skill.id, classification.deliverable, task));
}

export function getUnknownDomainRecommendationIds(): Array<{ domain: string; id: string }> {
  return Object.entries(DOMAIN_RECOMMENDED_SKILLS).flatMap(([domain, ids]) =>
    ids.filter((id) => !SKILLS_REGISTRY[id]).map((id) => ({ domain, id }))
  );
}
