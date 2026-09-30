import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../../data/categories';
import { useUIStore } from '../../store/useUIStore';
import { getSkillsByCategory, applySkill, type SkillDefinition } from '../../skills/skillsRegistry';
import { subscribeToCustomSkills } from '../../skills/customSkillsManager';
import { X, Search, Zap, Layers, Sparkles } from 'lucide-react';

interface ComponentInserterModalProps {
  onInsert?: (contentToInsert: string) => void;
  onApplySkill?: (skillId: string) => void;
  currentContent?: string;
}

export const ComponentInserterModal: React.FC<ComponentInserterModalProps> = ({
  onInsert,
  onApplySkill,
  currentContent,
}) => {
  const { isComponentPickerOpen, setIsComponentPickerOpen, addToast } = useUIStore();
  const [selectedCatId, setSelectedCatId] = useState<string>('core');
  const [searchQuery, setSearchQuery] = useState('');
  const [, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToCustomSkills(() => {
      setVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  if (!isComponentPickerOpen) return null;

  const skills = getSkillsByCategory(selectedCatId);

  const filteredSkills = skills.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.displayName.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleSelectSkill = (skill: SkillDefinition) => {
    if (onApplySkill) {
      onApplySkill(skill.id);
    } else if (onInsert && currentContent !== undefined) {
      const { prompt: transformed } = applySkill(currentContent, skill.id);
      onInsert(transformed);
    } else if (onInsert) {
      const sample = skill.transform('Execute task with production rigor.');
      onInsert(`\n\n${sample}\n`);
    }

    setIsComponentPickerOpen(false);
    addToast({
      type: 'success',
      title: `${skill.displayName} Applied!`,
      description: 'Active prompt enriched with modular ability',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-2xl h-[85vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Apply Modular Skill</h3>
              <p className="text-xs text-slate-400">Transform active prompt with specialized abilities</p>
            </div>
          </div>
          <button
            onClick={() => setIsComponentPickerOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-800 bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search active skills across categories..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Pills wrapper */}
        <div className="flex flex-wrap items-center gap-1.5 p-2.5 border-b border-slate-800/80 bg-slate-950 text-xs max-w-full overflow-hidden max-h-32 overflow-y-auto">
          {CATEGORIES.map((cat, idx) => {
            const count = getSkillsByCategory(cat.id).length;
            const isSelected = selectedCatId === cat.id;
            const isMySkills = cat.id === 'my_skills';

            return (
              <button
                key={`${cat.id}-${idx}`}
                onClick={() => setSelectedCatId(cat.id)}
                className={`rounded-xl px-2.5 py-1 font-medium transition flex items-center gap-1 text-[11px] ${
                  isSelected
                    ? isMySkills
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-indigo-600 text-white shadow-sm'
                    : isMySkills
                    ? 'bg-amber-950/40 text-amber-300 hover:text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <span className="truncate max-w-[110px]">{cat.name}</span>
                <span className="text-[9px] opacity-70 bg-black/30 px-1 py-0.2 rounded-full shrink-0">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 max-w-full overflow-x-hidden">
          {filteredSkills.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-10">No skills found in this category.</p>
          ) : (
            filteredSkills.map((skill, idx) => (
              <div
                key={`${skill.id}-${idx}`}
                onClick={() => handleSelectSkill(skill)}
                className={`group flex flex-col justify-between rounded-xl border p-3 transition cursor-pointer min-w-0 w-full max-w-full overflow-hidden ${
                  skill.isUserCreated
                    ? 'border-amber-500/40 bg-amber-950/20 hover:border-amber-400'
                    : 'border-slate-800 bg-slate-950/70 hover:border-indigo-500/50 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap min-w-0 max-w-full">
                      <span
                        className="font-mono text-[10px] font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 px-1.5 py-0.5 rounded truncate max-w-[130px] inline-block"
                        title={skill.name}
                      >
                        {skill.name}
                      </span>
                      {skill.isUserCreated && (
                        <span className="text-[9px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                          Custom
                        </span>
                      )}
                      {skill.subSkills && skill.subSkills.length > 0 && (
                        <span className="text-[9px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                          <Layers className="w-2.5 h-2.5" />
                          Composite
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-semibold text-slate-100 group-hover:text-indigo-300 line-clamp-2 break-words leading-snug">
                      {skill.displayName}
                    </h4>
                  </div>

                  <button className="flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow hover:bg-indigo-500 shrink-0">
                    <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>Apply Skill</span>
                  </button>
                </div>

                <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 break-words">{skill.description}</p>

                <div className="mt-2 flex flex-wrap gap-1 min-w-0 max-w-full">
                  {skill.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] text-slate-400 truncate max-w-[85px] inline-block"
                      title={t}
                    >
                      #{t}
                    </span>
                  ))}
                  {skill.tags.length > 3 && (
                    <span className="rounded bg-slate-800/50 px-1 py-0.5 text-[9px] font-medium text-slate-500">
                      +{skill.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
