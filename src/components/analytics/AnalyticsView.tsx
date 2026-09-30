import React, { useState, useEffect, useMemo } from 'react';
import type { PromptItem, PromptBoard, PromptChain } from '../../types';
import { db } from '../../db/database';
import { CATEGORIES } from '../../data/categories';
import { getAllSkills } from '../../skills/skillsRegistry';
import {
  BarChart3,
  Layers,
  LayoutGrid,
  Zap,
  Boxes,
  Link,
  Tag,
  Star,
  Clock,
  TrendingUp,
  Flame,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [boards, setBoards] = useState<PromptBoard[]>([]);
  const [chains, setChains] = useState<PromptChain[]>([]);
  const totalSkillsCount = getAllSkills().length;

  useEffect(() => {
    db.prompts.toArray().then(setPrompts);
    db.boards.toArray().then(setBoards);
    db.chains.toArray().then(setChains);
  }, []);

  // Tag frequency
  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    prompts.forEach((p) => {
      p.tags?.forEach((t) => {
        counts.set(t, (counts.get(t) || 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [prompts]);

  // Category frequency
  const topCategories = useMemo(() => {
    const counts = new Map<string, number>();
    prompts.forEach((p) => {
      const cat = p.category || 'general';
      counts.set(cat, (counts.get(cat) || 0) + 1);
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [prompts]);

  // Favorites count
  const favoritesCount = useMemo(() => {
    return prompts.filter((p) => p.isFavorite).length;
  }, [prompts]);

  // Most used prompts
  const mostUsedPrompts = useMemo(() => {
    return [...prompts]
      .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
      .slice(0, 5);
  }, [prompts]);

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Library Analytics</h2>
            <p className="text-xs text-slate-400">
              Local metrics on prompt inventory, usage velocity, and component utilization
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 sm:p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Prompts</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">{prompts.length}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {favoritesCount} marked favorite
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 sm:p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Visual Boards</span>
            <LayoutGrid className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">{boards.length}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Active collections</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 sm:p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Modular Skills</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">{totalSkillsCount}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">25 Categories Active</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 sm:p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Prompt Chains</span>
            <Link className="w-4 h-4 text-fuchsia-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">{chains.length}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Multi-step workflows</span>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Top Tags */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Most Used Tags
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {topTags.length === 0 ? (
              <p className="text-xs text-slate-500">No tags used yet.</p>
            ) : (
              topTags.map(([tag, count], idx) => (
                <div
                  key={`${tag}-${idx}`}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300"
                >
                  <span className="font-medium">#{tag}</span>
                  <span className="rounded-full bg-indigo-950/80 px-1.5 py-0.2 text-[10px] font-bold text-indigo-400">
                    {count}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Categories */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Top Categories
            </h3>
          </div>
          <div className="space-y-2">
            {topCategories.length === 0 ? (
              <p className="text-xs text-slate-500">No categorized prompts yet.</p>
            ) : (
              topCategories.map(([cat, count], idx) => {
                const pct = prompts.length > 0 ? Math.round((count / prompts.length) * 100) : 0;
                return (
                  <div key={`${cat}-${idx}`} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300 capitalize">
                      <span>{cat}</span>
                      <span className="text-slate-500">{count} prompts ({pct}%)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Most Used Prompts List */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Most Frequently Copied Prompts
          </h3>
        </div>
        <div className="space-y-2">
          {mostUsedPrompts.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200"
            >
              <div className="min-w-0 pr-3">
                <p className="font-semibold text-slate-100 truncate">{p.title}</p>
                <p className="text-[10px] text-slate-500 capitalize">{p.category}</p>
              </div>
              <span className="shrink-0 rounded-full bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                {p.usageCount || 0} copies
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
