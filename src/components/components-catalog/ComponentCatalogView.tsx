import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../../data/categories';
import type { CategoryMeta, UserSkill } from '../../types';
import { getSkillsByCategory, getAllSkills } from '../../skills/skillsRegistry';
import { subscribeToCustomSkills, getCachedUserSkills } from '../../skills/customSkillsManager';
import { CategoryDetailModal } from './CategoryDetailModal';
import { CreateSkillModal } from './CreateSkillModal';
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
  Plus,
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
  const [isCreateSkillModalOpen, setIsCreateSkillModalOpen] = useState(false);
  const [customSkillsCount, setCustomSkillsCount] = useState(getCachedUserSkills().length);
  const [totalSkillsCount, setTotalSkillsCount] = useState(getAllSkills().length);

  useEffect(() => {
    const unsubscribe = subscribeToCustomSkills(() => {
      setCustomSkillsCount(getCachedUserSkills().length);
      setTotalSkillsCount(getAllSkills().length);
    });
    return unsubscribe;
  }, []);

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
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                <Zap className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Modular Prompt Skills System
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              25 Categories · {totalSkillsCount}+ Active Modular Skills
              {customSkillsCount > 0 && (
                <span className="text-xs font-normal text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {customSkillsCount} Custom
                </span>
              )}
            </h2>
            <p className="mt-1 text-xs text-slate-300 max-w-xl leading-relaxed">
              Active abilities that dynamically transform and enrich prompts: reasoning architectures, domain authority, guardrails, agentic protocols, and custom user skills.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCreateSkillModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:from-amber-400 hover:to-rose-500 transition active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Skill</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Categories */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Filter categories (e.g. Reasoning, Coding, Guardrails, Frameworks, My Skills)..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Grid: 2 columns on mobile, 3-4 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {filteredCategories.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Boxes;
          const skillsInCat = getSkillsByCategory(cat.id);
          const count = skillsInCat.length;
          const isMySkills = cat.id === 'my_skills';

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`group relative flex flex-col justify-between rounded-2xl border p-3 sm:p-4 transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${
                isMySkills
                  ? 'border-amber-500/40 bg-amber-950/20 hover:border-amber-400 hover:bg-amber-950/40'
                  : 'border-slate-800/80 bg-slate-900/60 hover:border-indigo-500/50 hover:bg-slate-900/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr ${cat.color} text-white shadow-md group-hover:scale-105 transition`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      isMySkills
                        ? 'bg-amber-950/80 border border-amber-500/30 text-amber-300'
                        : 'bg-indigo-950/80 border border-indigo-500/30 text-indigo-300'
                    }`}
                  >
                    {count} {count === 1 ? 'Skill' : 'Skills'}
                  </span>
                </div>

                <h3
                  className={`text-xs sm:text-sm font-bold transition line-clamp-1 ${
                    isMySkills ? 'text-amber-200 group-hover:text-amber-100' : 'text-slate-100 group-hover:text-indigo-300'
                  }`}
                >
                  {cat.name}
                </h3>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-snug">
                  {cat.shortDesc}
                </p>
              </div>

              <div
                className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] font-medium ${
                  isMySkills
                    ? 'border-amber-900/40 text-amber-400 group-hover:text-amber-300'
                    : 'border-slate-800/50 text-indigo-400 group-hover:text-indigo-300'
                }`}
              >
                <span>{isMySkills ? 'Manage abilities' : 'Explore skills'}</span>
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
          onOpenCreateSkill={() => setIsCreateSkillModalOpen(true)}
        />
      )}

      {/* Create Skill Modal */}
      <CreateSkillModal
        isOpen={isCreateSkillModalOpen}
        onClose={() => setIsCreateSkillModalOpen(false)}
        defaultCategoryId="my_skills"
      />
    </div>
  );
};
