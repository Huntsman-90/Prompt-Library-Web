import { db } from './database';
import { COMPONENTS_PART_1 } from '../data/componentsSeedPart1';
import { COMPONENTS_PART_2 } from '../data/componentsSeedPart2';
import { COMPONENTS_PART_3 } from '../data/componentsSeedPart3';
import { COMPONENTS_PART_4 } from '../data/componentsSeedPart4';
import { COMPONENTS_PART_5 } from '../data/componentsSeedPart5';
import { FRAMEWORKS_SEED } from '../data/frameworksSeed';
import { DEFAULT_PROMPTS, DEFAULT_FOLDERS, DEFAULT_BOARDS } from '../data/defaultPrompts';

export async function initializeDatabase(): Promise<void> {
  const seedFlag = await db.settings.get('seed_version');

  // If already seeded at current version, skip
  if (seedFlag?.value === '3.1.0') {
    return;
  }

  const allComponents = [
    ...COMPONENTS_PART_1,
    ...COMPONENTS_PART_2,
    ...COMPONENTS_PART_3,
    ...COMPONENTS_PART_4,
    ...COMPONENTS_PART_5,
  ];

  // Clear and update components and frameworks with v3.0.0 massive professional library
  await db.components.clear();
  await db.components.bulkPut(allComponents);

  await db.frameworks.clear();
  await db.frameworks.bulkPut(FRAMEWORKS_SEED);

  // Check if prompts already exist
  const existingPromptsCount = await db.prompts.count();
  if (existingPromptsCount === 0) {
    await db.prompts.bulkPut(DEFAULT_PROMPTS);
  }

  // Check if folders already exist
  const existingFoldersCount = await db.folders.count();
  if (existingFoldersCount === 0) {
    await db.folders.bulkPut(DEFAULT_FOLDERS);
  }

  // Check if boards already exist
  const existingBoardsCount = await db.boards.count();
  if (existingBoardsCount === 0) {
    await db.boards.bulkPut(DEFAULT_BOARDS);
  }

  // Mark seed completed
  await db.settings.put({ key: 'seed_version', value: '3.1.0' });
  console.log(`Database seeded v3.1.0: ${allComponents.length} components, ${FRAMEWORKS_SEED.length} frameworks.`);
}
