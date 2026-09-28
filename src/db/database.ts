import Dexie, { type Table } from 'dexie';
import type {
  PromptItem,
  PromptBoard,
  FolderItem,
  TagItem,
  ComponentBlock,
  FrameworkItem,
  PromptChain,
  HistoryEntry,
  FavoriteItem,
} from '../types';

export interface SettingRecord {
  key: string;
  value: any;
}

export class PromptProDatabase extends Dexie {
  prompts!: Table<PromptItem, string>;
  boards!: Table<PromptBoard, string>;
  folders!: Table<FolderItem, string>;
  tags!: Table<TagItem, string>;
  components!: Table<ComponentBlock, string>;
  frameworks!: Table<FrameworkItem, string>;
  chains!: Table<PromptChain, string>;
  history!: Table<HistoryEntry, string>;
  favorites!: Table<FavoriteItem, string>;
  settings!: Table<SettingRecord, string>;
  userComponents!: Table<ComponentBlock, string>;

  constructor() {
    super('PromptLibraryProDB');
    this.version(1).stores({
      prompts: 'id, title, category, folderId, isFavorite, usageCount, createdAt, updatedAt, *tags',
      boards: 'id, title, createdAt, updatedAt',
      folders: 'id, name, parentId, createdAt',
      tags: 'id, name',
      components: 'id, categoryId, name, *tags, usageCount',
      frameworks: 'id, name, category, *tags',
      chains: 'id, name, createdAt, updatedAt',
      history: 'id, promptId, timestamp',
      favorites: 'id, itemType, itemId, createdAt',
      settings: 'key',
      userComponents: 'id, categoryId, name, *tags, createdAt',
    });
  }
}

export const db = new PromptProDatabase();
