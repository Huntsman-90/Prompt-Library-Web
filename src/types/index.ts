export interface PromptItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  folderId?: string | null;
  tags: string[];
  variables: string[]; // extracted [[var]] or {{var}}
  isFavorite: boolean;
  usageCount: number;
  rating?: number;
  targetModel?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromptBoard {
  id: string;
  title: string;
  description: string;
  color: string; // hex or tailwind token
  promptIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FolderItem {
  id: string;
  name: string;
  parentId?: string | null;
  color?: string;
  createdAt: string;
}

export interface TagItem {
  id: string;
  name: string;
  color: string;
}

export interface ComponentBlock {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  content: string;
  tags: string[];
  isUserCreated?: boolean;
  usageCount?: number;
}

export interface FrameworkItem {
  id: string;
  name: string;
  description: string;
  category: string;
  structure: string; // e.g. "Context -> Role -> Objective -> Format"
  content: string;
  tags: string[];
  exampleInputs?: Record<string, string>;
}

export interface ChainStep {
  id: string;
  title: string;
  description?: string;
  prompt: string;
  outputKey: string;
}

export interface PromptChain {
  id: string;
  name: string;
  description: string;
  steps: ChainStep[];
  createdAt: string;
  updatedAt: string;
}

export interface HistoryEntry {
  id: string;
  promptId: string;
  title: string;
  content: string;
  note?: string;
  timestamp: string;
}

export interface FavoriteItem {
  id: string;
  itemType: 'prompt' | 'component' | 'framework' | 'board';
  itemId: string;
  createdAt: string;
}

export interface AppSettings {
  theme: 'dark' | 'light' | 'system';
  fontSize: 'sm' | 'base' | 'lg';
  autoCopyOnGenerate: boolean;
  confirmDeletions: boolean;
  defaultModelAdapter: string;
  hasCompletedSeed: boolean;
}

export interface UserSkill {
  id: string;
  name: string; // e.g. "ApiSecurityAuditSkill"
  displayName: string; // e.g. "API Security Audit"
  categoryId: string; // matches CATEGORIES id or 'my_skills'
  description: string;
  tags: string[];
  iconName?: string;
  transformationDirectives: string; // The user-defined directives / markdown protocol
  targetSection?: 'role' | 'protocol' | 'constraints' | 'output_format' | 'context';
  isUserCreated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryMeta {
  id: string;
  name: string;
  shortDesc: string;
  iconName: string;
  color: string;
  itemCount?: number;
}
