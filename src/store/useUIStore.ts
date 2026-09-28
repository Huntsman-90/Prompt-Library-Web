import { create } from 'zustand';
import type { PromptItem } from '../types';

export type MainTab = 'library' | 'boards' | 'components' | 'tools' | 'settings' | 'organizer' | 'analytics';

export type ActiveToolModal =
  | null
  | 'generator'
  | 'optimizer'
  | 'simplifier'
  | 'translator'
  | 'adapter'
  | 'splicer'
  | 'chain'
  | 'aibuild';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface UIState {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;

  // Full-Screen Editor
  isEditorOpen: boolean;
  editingPrompt: PromptItem | null;
  openEditor: (prompt?: PromptItem | null) => void;
  closeEditor: () => void;

  // Active Tool Modal
  activeTool: ActiveToolModal;
  openTool: (tool: ActiveToolModal) => void;
  closeTool: () => void;

  // Component Catalog Inspector
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;

  // Insert Component in Editor Modal
  isComponentPickerOpen: boolean;
  setIsComponentPickerOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'library',
  setActiveTab: (tab) => set({ activeTab: tab }),

  isEditorOpen: false,
  editingPrompt: null,
  openEditor: (prompt = null) => set({ isEditorOpen: true, editingPrompt: prompt }),
  closeEditor: () => set({ isEditorOpen: false, editingPrompt: null }),

  activeTool: null,
  openTool: (tool) => set({ activeTool: tool }),
  closeTool: () => set({ activeTool: null }),

  selectedCategoryId: null,
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),

  isComponentPickerOpen: false,
  setIsComponentPickerOpen: (open) => set({ isComponentPickerOpen: open }),

  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3200);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
