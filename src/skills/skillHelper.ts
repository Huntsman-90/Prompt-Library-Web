import type { ParsedSection } from '../utils/promptEngine';
import {
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  deduplicateBullets,
  isRussianText,
  extractTaskFromGeneratedPrompt,
} from '../utils/promptEngine';
import { derivePreciseRole } from './skillArchitect';

export interface SkillDefinition {
  id: string;
  name: string; // e.g. "RoleCalibrationSkill"
  displayName: string; // e.g. "Role Calibration"
  categoryId: string; // matches CATEGORIES id
  description: string;
  tags: string[];
  iconName?: string;
  subSkills?: string[]; // IDs of sub-skills for composite skills
  transform: (prompt: string, context?: Record<string, any>) => string;
}

/**
 * Helper to ensure a section exists or merge directives into it
 */
export function ensureSection(
  sections: ParsedSection[],
  semanticType: ParsedSection['semanticType'],
  titleRu: string,
  titleEn: string,
  directivesRu: string[],
  directivesEn: string[],
  isRu: boolean
): void {
  const existing = sections.find(
    (s) =>
      s.semanticType === semanticType ||
      s.cleanTitle.includes(isRu ? titleRu.toLowerCase() : titleEn.toLowerCase())
  );

  const title = isRu ? titleRu : titleEn;
  const directives = isRu ? directivesRu : directivesEn;

  if (existing) {
    existing.lines = deduplicateBullets([...existing.lines, ...directives]);
  } else {
    sections.push({
      rawHeader: `### ${title}`,
      level: 3,
      title,
      cleanTitle: title.toLowerCase(),
      lines: directives,
      semanticType,
    });
  }
}

export {
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  deduplicateBullets,
  isRussianText,
  extractTaskFromGeneratedPrompt,
  derivePreciseRole,
};
