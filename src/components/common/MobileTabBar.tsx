import React from 'react';
import { useUIStore, type MainTab } from '../../store/useUIStore';
import {
  BookOpen,
  LayoutGrid,
  Boxes,
  Wand2,
  Settings,
} from 'lucide-react';

export const MobileTabBar: React.FC = () => {
  const { activeTab, setActiveTab } = useUIStore();

  const tabs: { id: MainTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'boards', label: 'Boards', icon: LayoutGrid },
    { id: 'components', label: 'Catalog', icon: Boxes },
    { id: 'tools', label: 'Tools', icon: Wand2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl pb-safe">
      <div className="flex items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all duration-200 select-none cursor-pointer ${
                isActive
                  ? 'text-indigo-400 font-semibold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-xl transition ${
                  isActive ? 'bg-indigo-600/20 text-indigo-400' : ''
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
