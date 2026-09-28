import React, { useEffect, useState } from 'react';
import { initializeDatabase } from './db/seed';
import { useUIStore } from './store/useUIStore';
import { useThemeStore } from './store/useThemeStore';

import { Header } from './components/common/Header';
import { MobileTabBar } from './components/common/MobileTabBar';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { ToastContainer } from './components/common/ToastContainer';

import { PromptLibraryView } from './components/library/PromptLibraryView';
import { BoardsView } from './components/board/BoardsView';
import { ComponentCatalogView } from './components/components-catalog/ComponentCatalogView';
import { ToolsHubView } from './components/tools/ToolsHubView';
import { LibraryOrganizerView } from './components/organizer/LibraryOrganizerView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';

import { FullScreenEditor } from './components/editor/FullScreenEditor';

// Tool Modals
import { PromptGeneratorModal } from './components/tools/PromptGeneratorModal';
import { PromptOptimizerModal } from './components/tools/PromptOptimizerModal';
import { PromptSimplifierModal } from './components/tools/PromptSimplifierModal';
import { PromptTranslatorModal } from './components/tools/PromptTranslatorModal';
import { ModelAdapterModal } from './components/tools/ModelAdapterModal';
import { PromptSplicerModal } from './components/tools/PromptSplicerModal';
import { PromptChainView } from './components/tools/PromptChainView';
import { AIBuildModal } from './components/tools/AIBuildModal';

export default function App() {
  const { activeTab } = useUIStore();
  const { theme } = useThemeStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Apply theme
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    // Seed database on first launch
    initializeDatabase()
      .catch((err) => console.error('Database init error:', err))
      .finally(() => setIsReady(true));
  }, [theme]);

  if (!isReady) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="text-xs font-medium text-slate-400">Loading Prompt Library Pro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 pt-4 pb-24 md:pb-12">
        {activeTab === 'library' && <PromptLibraryView />}
        {activeTab === 'boards' && <BoardsView />}
        {activeTab === 'components' && <ComponentCatalogView />}
        {activeTab === 'tools' && <ToolsHubView />}
        {activeTab === 'organizer' && <LibraryOrganizerView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Mobile Portrait Bottom Navigation Bar */}
      <MobileTabBar />

      {/* Full-Screen Prompt Editor */}
      <FullScreenEditor />

      {/* Engineering Tool Modals */}
      <PromptGeneratorModal />
      <PromptOptimizerModal />
      <PromptSimplifierModal />
      <PromptTranslatorModal />
      <ModelAdapterModal />
      <PromptSplicerModal />
      <PromptChainView />
      <AIBuildModal />

      {/* Floating Offline Notification */}
      <OfflineIndicator />

      {/* Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
}
