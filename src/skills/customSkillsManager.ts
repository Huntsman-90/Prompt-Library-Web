import { db } from '../db/database';
import type { UserSkill } from '../types';
import type { SkillDefinition } from './skillsRegistry';
import {
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  deduplicateBullets,
  isRussianText,
  extractTaskFromGeneratedPrompt,
  ensureSection,
} from './skillHelpers';
import { purgeGenericBoilerplate } from './skillArchitect';

const LOCAL_STORAGE_KEY = 'prompt_library_user_skills';

// In-memory cache of registered user skills
let userSkillsCache: UserSkill[] = [];
const listeners: Array<() => void> = [];

export function subscribeToCustomSkills(callback: () => void): () => void {
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

function notifyListeners(): void {
  listeners.forEach((l) => {
    try {
      l();
    } catch (e) {
      console.error('Error in custom skills listener', e);
    }
  });
}

/**
 * Creates an executable transform function for a user-defined custom skill.
 */
export function createUserSkillTransform(userSkill: UserSkill): (prompt: string, context?: Record<string, any>) => string {
  return (prompt: string, _context?: Record<string, any>): string => {
    const isRu = isRussianText(prompt);
    const cleanedInput = purgeGenericBoilerplate(prompt);
    const task = extractTaskFromGeneratedPrompt(cleanedInput) || (isRu ? 'Выполнить специализированную задачу' : 'Execute specialized task directive');
    
    // Parse directives from user input
    let directivesText = userSkill.transformationDirectives || '';
    
    // Support template variables like {{task}} or {{input}}
    directivesText = directivesText
      .replace(/\{\{task\}\}/gi, task)
      .replace(/\{\{input\}\}/gi, cleanedInput)
      .replace(/\[\[task\]\]/gi, task)
      .replace(/\[\[target_issue\]\]/gi, task);

    const directiveLines = directivesText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const { preamble, sections } = parsePromptSections(cleanedInput);
    const targetSectionType = userSkill.targetSection || 'protocol';

    ensureSection(
      sections,
      targetSectionType,
      userSkill.displayName,
      userSkill.displayName,
      directiveLines,
      directiveLines,
      isRu
    );

    return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
  };
}

/**
 * Converts a UserSkill record into a SkillDefinition compatible with SKILLS_REGISTRY
 */
export function userSkillToDefinition(userSkill: UserSkill): SkillDefinition {
  return {
    id: userSkill.id,
    name: userSkill.name,
    displayName: userSkill.displayName,
    categoryId: userSkill.categoryId || 'my_skills',
    description: userSkill.description || 'Custom user-created prompt engineering skill.',
    tags: Array.isArray(userSkill.tags) ? ['custom', ...userSkill.tags] : ['custom'],
    iconName: userSkill.iconName || 'Zap',
    isUserCreated: true,
    transform: createUserSkillTransform(userSkill),
  };
}

/**
 * Loads all custom skills from Dexie / localStorage
 */
export async function loadUserSkills(): Promise<UserSkill[]> {
  try {
    let skills: UserSkill[] = [];
    if (db.userSkills) {
      skills = await db.userSkills.toArray();
    }
    
    if (skills.length === 0) {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          skills = JSON.parse(stored);
        } catch {
          skills = [];
        }
      }
    }

    userSkillsCache = skills;
    return skills;
  } catch (err) {
    console.warn('Failed to load user skills from Dexie, fallback to localStorage', err);
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      userSkillsCache = stored ? JSON.parse(stored) : [];
      return userSkillsCache;
    } catch {
      userSkillsCache = [];
      return [];
    }
  }
}

/**
 * Get the synchronous cached list of user skills
 */
export function getCachedUserSkills(): UserSkill[] {
  return [...userSkillsCache];
}

/**
 * Saves or updates a user-defined custom skill
 */
export async function saveUserSkill(
  skillData: Partial<UserSkill> & { name: string; displayName: string; transformationDirectives: string }
): Promise<UserSkill> {
  const now = new Date().toISOString();
  const id = skillData.id || `custom-skill-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  
  // Format clean identifier
  const cleanName = skillData.name.trim().replace(/\s+/g, '') || `CustomSkill_${Date.now()}`;
  const finalName = cleanName.endsWith('Skill') ? cleanName : `${cleanName}Skill`;

  const newSkill: UserSkill = {
    id,
    name: finalName,
    displayName: skillData.displayName.trim() || skillData.name,
    categoryId: skillData.categoryId || 'my_skills',
    description: skillData.description?.trim() || 'Custom user-defined skill',
    tags: Array.isArray(skillData.tags) ? skillData.tags : ['custom'],
    iconName: skillData.iconName || 'Zap',
    transformationDirectives: skillData.transformationDirectives.trim(),
    targetSection: skillData.targetSection || 'protocol',
    isUserCreated: true,
    createdAt: skillData.createdAt || now,
    updatedAt: now,
  };

  // Update in-memory cache
  const existingIdx = userSkillsCache.findIndex((s) => s.id === id);
  if (existingIdx !== -1) {
    userSkillsCache[existingIdx] = newSkill;
  } else {
    userSkillsCache.push(newSkill);
  }

  // Persist in localStorage
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userSkillsCache));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  // Persist in IndexedDB
  try {
    if (db.userSkills) {
      await db.userSkills.put(newSkill);
    }
  } catch (err) {
    console.warn('Dexie save error for userSkills:', err);
  }

  notifyListeners();
  return newSkill;
}

/**
 * Deletes a user-defined custom skill
 */
export async function deleteUserSkill(id: string): Promise<boolean> {
  userSkillsCache = userSkillsCache.filter((s) => s.id !== id);

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userSkillsCache));
  } catch (e) {
    console.warn('LocalStorage delete error:', e);
  }

  try {
    if (db.userSkills) {
      await db.userSkills.delete(id);
    }
  } catch (err) {
    console.warn('Dexie delete error for userSkills:', err);
  }

  notifyListeners();
  return true;
}
