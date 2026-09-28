import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'dark' | 'light';
  fontSize: 'sm' | 'base' | 'lg';
  autoCopyOnGenerate: boolean;
  confirmDeletions: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setFontSize: (size: 'sm' | 'base' | 'lg') => void;
  setAutoCopy: (val: boolean) => void;
  setConfirmDeletions: (val: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      fontSize: 'base',
      autoCopyOnGenerate: false,
      confirmDeletions: true,
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        set({ theme: next });
        applyThemeClass(next);
      },
      setTheme: (theme) => {
        set({ theme });
        applyThemeClass(theme);
      },
      setFontSize: (fontSize) => set({ fontSize }),
      setAutoCopy: (autoCopyOnGenerate) => set({ autoCopyOnGenerate }),
      setConfirmDeletions: (confirmDeletions) => set({ confirmDeletions }),
    }),
    {
      name: 'promptpro-theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyThemeClass(state.theme);
        }
      },
    }
  )
);

function applyThemeClass(theme: 'dark' | 'light') {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }
}
