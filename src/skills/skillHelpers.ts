import type { ParsedSection } from '../utils/promptEngine';
import {
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  deduplicateBullets,
  isRussianText,
  extractTaskFromGeneratedPrompt,
} from '../utils/promptEngine';

export {
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  deduplicateBullets,
  isRussianText,
  extractTaskFromGeneratedPrompt,
};

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
    (s) => s.semanticType === semanticType || s.cleanTitle.includes(isRu ? titleRu.toLowerCase() : titleEn.toLowerCase())
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

/**
 * Helper to standardly transform a prompt by adding directives to a specific section
 */
export function createStandardSkillTransform(
  semanticType: ParsedSection['semanticType'],
  titleRu: string,
  titleEn: string,
  directivesRu: string[],
  directivesEn: string[]
) {
  return (prompt: string): string => {
    const isRu = isRussianText(prompt);
    const { preamble, sections } = parsePromptSections(prompt);
    ensureSection(sections, semanticType, titleRu, titleEn, directivesRu, directivesEn, isRu);
    return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
  };
}
