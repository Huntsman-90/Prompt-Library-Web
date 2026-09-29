import React, { useState } from 'react';
import { CATEGORIES } from '../../data/categories';
import type { CategoryMeta } from '../../types';
import { getSkillsByCategory } from '../../skills/skillsRegistry';
import { CategoryDetailModal } from './CategoryDetailModal';
import {
  Layers,
  Brain,
  GitBranch,
  FileText,
  PenTool,
  Search,
  Sparkles,
  ShieldAlert,
  Bot,
  MessageSquare,
  Layout,
  Palette,
  Lightbulb,
  Code,
  Briefcase,
  Database,
  UserCheck,
  GraduationCap,
  Activity,
  Scale,
  BookOpen,
  Share2,
  Terminal,
  Grid,
  Compass,
  Boxes,
  Zap,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Brain,
  GitBranch,
  FileText,
  PenTool,
  Search,
  Sparkles,
  ShieldAlert,
  Bot,
  MessageSquare,
  Layout,
  Palette,
  Lightbulb,
  Code,
  Briefcase,
  Database,
  UserCheck,
  GraduationCap,
  Activity,
  Scale,
  BookOpen,
  Share2,
  Terminal,
  Grid,
  Compass,
};

export const ComponentCatalogView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryMeta | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredCategories = CATEGORIES.filter((c) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.shortDesc.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Catalog Intro Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 p-4 sm:p-6 shadow-xl">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <Zap className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Modular Prompt Skills System
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            25 Categories · 80+ Active Modular Skills
          </h2>
          <p className="mt-1 text-xs text-slate-300 max-w-xl leading-relaxed">
            Active abilities that dynamically transform and enrich prompts: reasoning architectures, domain authority, guardrails, agentic protocols, and composite suites.
          </p>
        </div>
      </div>

      {/* Search Categories */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Filter categories (e.g. Reasoning, Coding, Guardrails, Frameworks)..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Grid: 2 columns on mobile, 3-4 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {filteredCategories.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Boxes;
          const skillsInCat = getSkillsByCategory(cat.id);
          const count = skillsInCat.length;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3 sm:p-4 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer select-none active:scale-[0.98]"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr ${cat.color} text-white shadow-md shadow-indigo-950/50 group-hover:scale-105 transition`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="rounded-full bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                    {count} {count === 1 ? 'Skill' : 'Skills'}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition line-clamp-1">
                  {cat.name}
                </h3>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-snug">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-indigo-400 font-medium group-hover:text-indigo-300">
                <span>Explore skills</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <CategoryDetailModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
};
