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
 * Adapt directive statements dynamically according to the actual user task
 */
export function adaptDirectivesToTask(directives: string[], task: string, isRu: boolean): string[] {
  const t = task.trim();
  if (!t || t.length < 3) return directives;

  return directives.map((d) => {
    return d
      .replace(/\[\[target_issue\]\]|\[\[target_system\]\]|\[\[task\]\]/gi, t)
      .replace(/the target system/gi, t.length < 40 ? `"${t}"` : 'the target system')
      .replace(/целевую систему/gi, t.length < 40 ? `«${t}»` : 'целевую систему');
  });
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
 * Helper to standardly transform a prompt by adding directives to a specific section,
 * adapting context to the user's task and eliminating generic weak wrappers.
 */
export function createStandardSkillTransform(
  semanticType: ParsedSection['semanticType'],
  titleRu: string,
  titleEn: string,
  directivesRu: string[],
  directivesEn: string[]
) {
  return (prompt: string, _context?: Record<string, any>): string => {
    const isRu = isRussianText(prompt);
    const cleanedPrompt = prompt
      .replace(/###\s*(?:Goal & Task Context|Context)\s*\n*Execute domain directive with high technical fidelity\.?/gi, '')
      .replace(/Execute domain directive with high technical fidelity\.?/gi, '')
      .trim();

    const task = extractTaskFromGeneratedPrompt(cleanedPrompt) || (isRu ? 'Выполнить задачу' : 'Execute directive');
    const { preamble, sections } = parsePromptSections(cleanedPrompt);

    // If the input was a raw sentence without headers, initialize a clean mandate header
    if (sections.length === 0 && cleanedPrompt.length > 0) {
      sections.push({
        rawHeader: isRu ? '### 1. Постановка Задачи' : '### 1. Operational Mandate',
        level: 3,
        title: isRu ? 'Постановка Задачи' : 'Operational Mandate',
        cleanTitle: isRu ? 'постановка задачи' : 'operational mandate',
        lines: [isRu ? `**Целевая задача**: ${task}` : `**Target Objective**: ${task}`],
        semanticType: 'context',
      });
    }

    const adaptedRu = adaptDirectivesToTask(directivesRu, task, true);
    const adaptedEn = adaptDirectivesToTask(directivesEn, task, false);

    ensureSection(sections, semanticType, titleRu, titleEn, adaptedRu, adaptedEn, isRu);
    return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
  };
}
