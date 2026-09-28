import { db } from './database';
import { COMPONENTS_PART_1 } from '../data/componentsSeedPart1';
import { COMPONENTS_PART_2 } from '../data/componentsSeedPart2';
import { COMPONENTS_PART_3 } from '../data/componentsSeedPart3';
import { FRAMEWORKS_SEED } from '../data/frameworksSeed';
import { DEFAULT_PROMPTS, DEFAULT_FOLDERS, DEFAULT_BOARDS } from '../data/defaultPrompts';

export async function initializeDatabase(): Promise<void> {
  const seedFlag = await db.settings.get('seed_version');

  // If already seeded at current version, skip
  if (seedFlag?.value === '1.0.0') {
    return;
  }

  const allComponents = [
    ...COMPONENTS_PART_1,
    ...COMPONENTS_PART_2,
    ...COMPONENTS_PART_3,
  ];

  // Bulk put components
  await db.components.bulkPut(allComponents);

  // Bulk put frameworks
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
  await db.settings.put({ key: 'seed_version', value: '1.0.0' });
  console.log(`Database seeded: ${allComponents.length} components, ${FRAMEWORKS_SEED.length} frameworks.`);
}
