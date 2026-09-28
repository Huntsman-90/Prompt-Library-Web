import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useUIStore } from '../../store/useUIStore';
import { PWAInstallButton } from './PWAInstallButton';
import {
  Sun,
  Moon,
  Sparkles,
  Layers,
  BarChart3,
  CheckCheck,
  Plus,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { activeTab, setActiveTab, openEditor } = useUIStore();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-3 sm:px-4 py-2.5 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
        {/* Brand */}
        <div
          onClick={() => setActiveTab('library')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-indigo-300 transition">
                PromptPro
              </span>
              <span className="rounded bg-indigo-950/80 border border-indigo-500/30 px-1 py-0.2 text-[9px] font-semibold text-indigo-400">
                PRO WEB
              </span>
            </div>
            <span className="text-[10px] text-slate-400 hidden xs:inline">
              100% Offline Studio
            </span>
          </div>
        </div>

        {/* Quick Nav for Desktop/Tablet */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-xl p-1 text-xs font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'library' ? 'bg-indigo-600 text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Library
          </button>
          <button
            onClick={() => setActiveTab('boards')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'boards' ? 'bg-indigo-600 text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Boards
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'components' ? 'bg-indigo-600 text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Catalog (25)
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'tools' ? 'bg-indigo-600 text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Tools
          </button>
          <button
            onClick={() => setActiveTab('organizer')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'organizer' ? 'bg-indigo-600 text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Organizer
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'analytics' ? 'bg-indigo-600 text-white font-semibold' : 'hover:text-white'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* New Prompt Button */}
          <button
            onClick={() => openEditor(null)}
            className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-500 hover:to-violet-500 active:scale-95 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Prompt</span>
          </button>

          {/* Quick Organizer link on mobile */}
          <button
            onClick={() => setActiveTab('organizer')}
            title="Library Organizer Scanner"
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white active:scale-95 transition"
          >
            <CheckCheck className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Analytics button */}
          <button
            onClick={() => setActiveTab('analytics')}
            title="Analytics"
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white active:scale-95 transition"
          >
            <BarChart3 className="w-4 h-4 text-sky-400" />
          </button>

          {/* PWA Install */}
          <PWAInstallButton />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white active:scale-95 transition cursor-pointer"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
