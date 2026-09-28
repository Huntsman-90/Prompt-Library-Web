import type { PromptItem, PromptBoard, FolderItem } from '../types';

export const DEFAULT_FOLDERS: FolderItem[] = [
  {
    id: 'folder-engineering',
    name: 'Engineering & Systems',
    color: '#6366f1',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'folder-strategy',
    name: 'Strategy & Growth',
    color: '#10b981',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'folder-product',
    name: 'Product & UX',
    color: '#06b6d4',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'folder-writing',
    name: 'Executive & Writing',
    color: '#ec4899',
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_PROMPTS: PromptItem[] = [];

export const DEFAULT_BOARDS: PromptBoard[] = [
  {
    id: 'board-tech-lead',
    title: 'Tech Lead Toolkit',
    description: 'High-leverage prompts for architecture, code review, and postmortems.',
    color: '#6366f1',
    promptIds: [],
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'board-gtm-suite',
    title: 'GTM & Conversion Suite',
    description: 'Commercial playbooks, outreach sequences, and value propositions.',
    color: '#10b981',
    promptIds: [],
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'board-deep-thinking',
    title: 'Deep Thinking & Pedagogy',
    description: 'Frameworks for first-principles reasoning and rapid conceptual mastery.',
    color: '#ec4899',
    promptIds: [],
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
