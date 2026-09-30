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
  if (!t || t.length < 3 || /^Execute\s+/i.test(t) || /^Выполнить\s+/i.test(t)) {
    return directives;
  }

  return directives.map((d) => {
    return d
      .replace(/\[\[target_issue\]\]|\[\[target_system\]\]|\[\[task\]\]/gi, t)
      .replace(/the target system/gi, t.length < 50 ? `"${t}"` : 'the target system')
      .replace(/целевую систему/gi, t.length < 50 ? `«${t}»` : 'целевую систему');
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

export interface StandardSkillConfig {
  sectionName: string;
  ruSectionName: string;
  instructions: string[];
  ruInstructions: string[];
  semanticType?: ParsedSection['semanticType'];
  tags?: string[];
}

/**
 * Helper to standardly transform a prompt by adding directives to a specific section,
 * adapting context to the user's task and eliminating generic weak wrappers.
 */
export function createStandardSkillTransform(
  configOrSemanticType: ParsedSection['semanticType'] | StandardSkillConfig,
  titleRu?: string,
  titleEn?: string,
  directivesRu?: string[],
  directivesEn?: string[]
) {
  let semanticType: ParsedSection['semanticType'];
  let tRu: string;
  let tEn: string;
  let dRu: string[];
  let dEn: string[];

  if (typeof configOrSemanticType === 'object' && configOrSemanticType !== null) {
    semanticType = configOrSemanticType.semanticType || 'process_directive';
    tRu = configOrSemanticType.ruSectionName || configOrSemanticType.sectionName;
    tEn = configOrSemanticType.sectionName || configOrSemanticType.ruSectionName;
    dRu = configOrSemanticType.ruInstructions || configOrSemanticType.instructions || [];
    dEn = configOrSemanticType.instructions || configOrSemanticType.ruInstructions || [];
  } else {
    semanticType = configOrSemanticType;
    tRu = titleRu || '';
    tEn = titleEn || '';
    dRu = directivesRu || [];
    dEn = directivesEn || [];
  }

  return (prompt: string, _context?: Record<string, any>): string => {
    const isRu = isRussianText(prompt);
    let cleanedPrompt = (prompt || '')
      .replace(/###\s*(?:Goal & Task Context|Context)\s*\n*Execute[^\n]*\n*/gi, '')
      .replace(/^Execute\s+.*with\s+(?:production\s+rigor|high\s+domain\s+rigor|complete\s+production\s+deliverables)[^\n]*\n*/gim, '')
      .replace(/Execute domain directive with high technical fidelity\.?/gi, '')
      .trim();

    const task = extractTaskFromGeneratedPrompt(cleanedPrompt);
    const { preamble, sections } = parsePromptSections(cleanedPrompt);

    // Only add a task context section if the user genuinely supplied an unformatted task sentence
    const hasRealTask =
      Boolean(task) &&
      task.length > 4 &&
      !/^Execute\s+/i.test(task) &&
      !/^Выполнить\s+(?:задачу|директиву)/i.test(task);

    if (sections.length === 0 && preamble.trim().length > 0 && hasRealTask) {
      sections.push({
        rawHeader: isRu ? '### 1. Постановка Задачи' : '### 1. Operational Mandate',
        level: 3,
        title: isRu ? 'Постановка Задачи' : 'Operational Mandate',
        cleanTitle: isRu ? 'постановка задачи' : 'operational mandate',
        lines: [isRu ? `**Целевая задача**: ${task}` : `**Target Objective**: ${task}`],
        semanticType: 'context',
      });
    }

    const adaptedRu = adaptDirectivesToTask(dRu, hasRealTask ? task : '', true);
    const adaptedEn = adaptDirectivesToTask(dEn, hasRealTask ? task : '', false);

    ensureSection(sections, semanticType, tRu, tEn, adaptedRu, adaptedEn, isRu);
    return reconstructPrompt(sections.length > 0 && hasRealTask ? '' : preamble, deduplicatePromptSections(sections, isRu));
  };
}
