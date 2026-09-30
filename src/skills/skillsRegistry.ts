import { composeSkillsArchitecture } from './skillArchitect';

import { CORE_SKILLS } from './categories/core';
import { REASONING_SKILLS } from './categories/reasoning';
import { CONTROL_FLOW_SKILLS } from './categories/controlFlow';
import { OUTPUT_SKILLS } from './categories/output';
import { WRITING_SKILLS } from './categories/writing';
import { ANALYSIS_SKILLS } from './categories/analysis';
import { METAPROMPTING_SKILLS } from './categories/metaprompting';
import { GUARDRAILS_SKILLS } from './categories/guardrails';
import { AGENTIC_SKILLS } from './categories/agentic';
import { DIALOGUE_SKILLS } from './categories/dialogue';
import { UX_DESIGN_SKILLS } from './categories/uxDesign';
import { CREATIVE_SKILLS } from './categories/creative';
import { IDEATION_SKILLS } from './categories/ideation';
import { CODING_SKILLS } from './categories/coding';
import { BUSINESS_SKILLS } from './categories/business';
import { DATA_KNOWLEDGE_SKILLS } from './categories/dataKnowledge';
import { PERSONAS_SKILLS } from './categories/personas';
import { EDUCATION_SKILLS } from './categories/education';
import { MEDICAL_SKILLS } from './categories/medical';
import { LEGAL_SKILLS } from './categories/legal';
import { RESEARCH_SKILLS } from './categories/research';
import { SOCIAL_SKILLS } from './categories/social';
import { TECHNICAL_SKILLS } from './categories/technical';
import { MISCELLANEOUS_SKILLS } from './categories/miscellaneous';
import { FRAMEWORKS_SKILLS } from './categories/frameworks';
import { getCachedUserSkills, userSkillToDefinition, loadUserSkills } from './customSkillsManager';

export interface SkillDefinition {
  id: string;
  name: string; // e.g. "RoleCalibrationSkill"
  displayName: string; // e.g. "Role Calibration"
  categoryId: string; // matches CATEGORIES id or "my_skills"
  description: string;
  tags: string[];
  iconName?: string;
  subSkills?: string[]; // IDs of sub-skills for composite skills
  isUserCreated?: boolean;
  transform: (prompt: string, context?: Record<string, any>) => string;
}

const RAW_BUILTIN_SKILLS_REGISTRY: Record<string, any> = {
  ...CORE_SKILLS,
  ...REASONING_SKILLS,
  ...CONTROL_FLOW_SKILLS,
  ...OUTPUT_SKILLS,
  ...WRITING_SKILLS,
  ...ANALYSIS_SKILLS,
  ...METAPROMPTING_SKILLS,
  ...GUARDRAILS_SKILLS,
  ...AGENTIC_SKILLS,
  ...DIALOGUE_SKILLS,
  ...UX_DESIGN_SKILLS,
  ...CREATIVE_SKILLS,
  ...IDEATION_SKILLS,
  ...CODING_SKILLS,
  ...BUSINESS_SKILLS,
  ...DATA_KNOWLEDGE_SKILLS,
  ...PERSONAS_SKILLS,
  ...EDUCATION_SKILLS,
  ...MEDICAL_SKILLS,
  ...LEGAL_SKILLS,
  ...RESEARCH_SKILLS,
  ...SOCIAL_SKILLS,
  ...TECHNICAL_SKILLS,
  ...MISCELLANEOUS_SKILLS,
  ...FRAMEWORKS_SKILLS,
};

/**
 * Built-in skills registry (760+ skills across all categories)
 */
export const BUILTIN_SKILLS_REGISTRY: Record<string, SkillDefinition> = Object.fromEntries(
  Object.entries(RAW_BUILTIN_SKILLS_REGISTRY).map(([key, raw]) => {
    const fn = raw.transform || raw.promptTransform || ((p: string) => p);
    const tags = Array.isArray(raw.tags) ? raw.tags : [];
    return [
      key,
      {
        ...raw,
        tags,
        transform: fn,
      } as SkillDefinition,
    ];
  })
);

// Initialize user skills from storage
if (typeof window !== 'undefined') {
  loadUserSkills().catch(() => {});
}

/**
 * Dynamic registry proxy supporting both built-in and custom user skills
 */
export const SKILLS_REGISTRY: Record<string, SkillDefinition> = new Proxy(BUILTIN_SKILLS_REGISTRY, {
  get(target, prop: string) {
    if (prop in target) {
      return target[prop];
    }
    const userSkills = getCachedUserSkills();
    const foundUserSkill = userSkills.find((s) => s.id === prop);
    if (foundUserSkill) {
      return userSkillToDefinition(foundUserSkill);
    }
    return undefined;
  },
  has(target, prop: string) {
    if (prop in target) return true;
    return getCachedUserSkills().some((s) => s.id === prop);
  },
  ownKeys(target) {
    const builtinKeys = Reflect.ownKeys(target);
    const userKeys = getCachedUserSkills().map((s) => s.id);
    return Array.from(new Set([...builtinKeys, ...userKeys]));
  },
  getOwnPropertyDescriptor(target, prop: string) {
    if (prop in target) {
      return Reflect.getOwnPropertyDescriptor(target, prop);
    }
    const found = getCachedUserSkills().find((s) => s.id === prop);
    if (found) {
      return {
        configurable: true,
        enumerable: true,
        writable: false,
        value: userSkillToDefinition(found),
      };
    }
    return undefined;
  },
});

/**
 * Get all skills that belong to a specific category (including user-created skills)
 */
export function getSkillsByCategory(categoryId: string): SkillDefinition[] {
  const userSkillDefs = getCachedUserSkills().map(userSkillToDefinition);

  if (categoryId === 'my_skills') {
    return userSkillDefs;
  }

  const builtinInCat = Object.values(BUILTIN_SKILLS_REGISTRY).filter((s) => s.categoryId === categoryId);
  const userInCat = userSkillDefs.filter((s) => s.categoryId === categoryId);

  return [...builtinInCat, ...userInCat];
}

/**
 * Get all registered skills (built-in + user-created)
 */
export function getAllSkills(): SkillDefinition[] {
  const userSkillDefs = getCachedUserSkills().map(userSkillToDefinition);
  return [...Object.values(BUILTIN_SKILLS_REGISTRY), ...userSkillDefs];
}

/**
 * Apply a single skill using the architectural synthesizer
 */
export function applySkill(prompt: string, skillId: string, context?: Record<string, any>): {
  prompt: string;
  appliedSkill: SkillDefinition | null;
} {
  const skill = SKILLS_REGISTRY[skillId];
  if (!skill) {
    return { prompt, appliedSkill: null };
  }

  // If user-created skill, run direct transform or compose
  if (skill.isUserCreated) {
    const transformed = skill.transform(prompt, context);
    return { prompt: transformed, appliedSkill: skill };
  }

  const result = composeSkillsArchitecture(prompt, [skillId], context);
  return { prompt: result.prompt, appliedSkill: skill };
}

/**
 * Apply multiple skills in coherent architectural composition
 */
export function applySkills(prompt: string, skillIds: string[], context?: Record<string, any>): {
  prompt: string;
  appliedSkills: SkillDefinition[];
} {
  if (!skillIds || skillIds.length === 0) {
    return { prompt, appliedSkills: [] };
  }
  return composeSkillsArchitecture(prompt, skillIds, context);
}

/**
 * Detect which skills are currently embedded/active in a prompt
 */
export function detectSkillsInPrompt(prompt: string): SkillDefinition[] {
  if (!prompt) return [];
  const lower = prompt.toLowerCase();
  const detected: SkillDefinition[] = [];

  const addIfPresent = (id: string, regex: RegExp) => {
    if (regex.test(lower) && SKILLS_REGISTRY[id]) {
      detected.push(SKILLS_REGISTRY[id]);
    }
  };

  // Check user skills
  for (const u of getCachedUserSkills()) {
    if (
      lower.includes(u.name.toLowerCase()) ||
      lower.includes(u.displayName.toLowerCase()) ||
      (u.tags && u.tags.some((t) => lower.includes(t.toLowerCase())))
    ) {
      detected.push(userSkillToDefinition(u));
    }
  }

  // Core & Roles
  addIfPresent('role-calibration', /роль|role & authority|вы выступаете в роли/i);
  addIfPresent('operational-objective', /целевой мандат|operational objective|главная миссия/i);
  addIfPresent('definition-of-done', /definition of done|критерии приемки|критерий завершенности/i);
  addIfPresent('scope-boundary', /scope boundaries|non-goals|границы скоупа/i);
  addIfPresent('tradeoff-hierarchy', /компромисс|trade-off|иерархия приоритетов/i);
  addIfPresent('epistemic-calibration', /эпистемическ|степень уверенности|границы знания/i);

  // Reasoning
  addIfPresent('chain-of-thought', /chain-of-thought|пошагового рассуждения|пошаговая дедукция/i);
  addIfPresent('tree-of-thoughts', /tree-of-thoughts|древо рассуждений|дерево рассуждений/i);
  addIfPresent('first-principles', /first principles|первооснов|первых принципов/i);
  addIfPresent('inversion-thinking', /pre-mortem|инверсивное мышление|катастрофическ/i);
  addIfPresent('deductive-falsification', /фальсификаци|popperian/i);
  addIfPresent('second-order-effects', /второго порядка|second-order/i);

  // Analysis
  addIfPresent('root-cause-analysis', /5 почему|5 whys|root cause|причинно-следствен/i);
  addIfPresent('gap-analysis', /gap analysis|as-is vs to-be|анализ разрывов/i);
  addIfPresent('swot-to-tows', /tows|матрица tows|swot/i);
  addIfPresent('cost-of-inaction', /cost of inaction|цена бездействия/i);
  addIfPresent('fmea-risk-matrix', /fmea|rpn|анализ видов и последствий/i);
  addIfPresent('timeline-reconstruction', /timeline|хронология инцидента|t0-t3|контрольным точкам/i);

  // Agentic & Control Flow
  addIfPresent('react-loop', /react|thought:.*action:.*observation:/i);
  addIfPresent('task-decomposition', /dag|декомпозиция задач|граф подзадач/i);
  addIfPresent('tool-use-protocol', /tool use|вызова инструментов|валидации схем/i);
  addIfPresent('memory-context-protocol', /scratchpad|рабочей памяти|рабочий блокнот/i);
  addIfPresent('self-healing-agent', /self-healing|самовосстановлен/i);
  addIfPresent('conditional-branching', /conditional branching|условного ветвления/i);
  addIfPresent('circuit-breaker-pattern', /circuit breaker|размыкатель цепи/i);

  // Guardrails
  addIfPresent('constraint-injection', /negative constraints|защитные барьеры|запрещено|негативные инварианты/i);
  addIfPresent('blameless-principle', /blameless|безнаказанности|поиск виновных/i);
  addIfPresent('anti-hallucination-grounding', /галлюцинац|grounding|опора на данные/i);
  addIfPresent('pii-data-redaction', /pii|персональных данных|маскирование/i);
  addIfPresent('jailbreak-defense', /jailbreak|prompt injection|переопределения инструкций/i);

  // Output
  addIfPresent('json-schema-strict', /strict json|валидный json|raw json/i);
  addIfPresent('executive-markdown-table', /decision matrix|исполнительная матрица|сравнительная таблица/i);
  addIfPresent('action-items-matrix', /action items|превентивных мер|матрица превентивных|матрица корректирующих/i);
  addIfPresent('hierarchical-report', /hierarchical report|3-tier report|трехуровневая иерархия/i);
  addIfPresent('mermaid-diagram-flow', /mermaid|flowchart|диаграмма/i);

  // Coding & Technical
  addIfPresent('code-audit-smells', /code audit|аудит кода|code smell/i);
  addIfPresent('type-safety-contracts', /type safety|типобезопасности|typescript/i);
  addIfPresent('regression-test-specs', /regression safety|регрессионной безопасности|vitest|jest/i);
  addIfPresent('incident-postmortem', /postmortem|постмортем/i);
  addIfPresent('kubernetes-manifest-hardening', /kubernetes|k8s|manifest/i);
  addIfPresent('terraform-iac-module', /terraform|iac|opentofu/i);

  // Business & Strategy
  addIfPresent('unit-economics-modeling', /unit economics|юнит-экономики|cac|ltv/i);
  addIfPresent('gtm-roadmap-phasing', /gtm roadmap|дорожная карта выхода|go-to-market/i);
  addIfPresent('defensible-moats', /defensible moats|защитных рвов|7 powers/i);
  addIfPresent('pricing-tier-architecture', /pricing tier|тарифных планов/i);

  // Frameworks
  addIfPresent('blameless-retrospective-framework', /blameless incident retrospective suite|фреймворк безнаказанного постмортема/i);
  addIfPresent('code-refactoring-suite', /code refactoring suite|рефакторинга и архитектурного аудита/i);
  addIfPresent('gtm-strategy-engine', /gtm strategy engine|вывода продукта на рынок/i);
  addIfPresent('agentic-task-solver', /agentic task solver|автономного агента/i);

  return detected;
}
