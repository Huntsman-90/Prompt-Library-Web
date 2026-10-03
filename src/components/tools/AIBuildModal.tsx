import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { buildPromptFromDescription } from '../../utils/promptEngine';
import { getSkillsByCategory, SKILLS_REGISTRY, type SkillDefinition } from '../../skills/skillsRegistry';
import { applySkillsWithPreflight, type SkillPreflightDiagnostic } from '../../skills/skillPreflight';
import { SkillPreflightNotice } from './SkillPreflightNotice';
import { CATEGORIES } from '../../data/categories';
import { X, Bot, Sparkles, Copy, Check, Plus, Zap, ChevronDown, ChevronUp } from 'lucide-react';

const RECOMMENDED_SKILLS = [
  'role-calibration',
  'chain-of-thought',
  'constraint-injection',
  'blameless-principle',
  'domain-authority',
  'json-schema-strict',
  'executive-markdown-table',
  'self-critique',
];

export const AIBuildModal: React.FC = () => {
  const { activeTool, closeTool, openEditor, addToast } = useUIStore();

  const [description, setDescription] = useState('');
  const [complexity, setComplexity] = useState<'basic' | 'intermediate' | 'expert'>('expert');
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([
    'role-calibration',
    'constraint-injection',
  ]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('reasoning');

  const [builtPrompt, setBuiltPrompt] = useState('');
  const [appliedSkillNames, setAppliedSkillNames] = useState<string[]>([]);
  const [skillDiagnostics, setSkillDiagnostics] = useState<SkillPreflightDiagnostic[]>([]);
  const [copied, setCopied] = useState(false);

  if (activeTool !== 'aibuild') return null;

  const toggleSkill = (id: string) => {
    setSelectedSkillIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBuild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      addToast({ type: 'error', title: 'Please provide a description' });
      return;
    }
    const basePrompt = buildPromptFromDescription(description, complexity);
    const {
      prompt: finalResult,
      appliedSkills: appliedSkillsList,
      diagnostics,
    } = applySkillsWithPreflight(basePrompt, selectedSkillIds, { complexity, task: description }, description);

    setBuiltPrompt(finalResult);
    setAppliedSkillNames(appliedSkillsList.map((s) => s.displayName));
    setSkillDiagnostics(diagnostics);
    addToast({
      type: 'success',
      title: 'Master prompt assembled with active skills!',
      description: `${appliedSkillsList.length} Skills applied; ${diagnostics.length} preflight adjustment(s).`,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(builtPrompt);
      setCopied(true);
      addToast({ type: 'success', title: 'Copied built prompt!' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy' });
    }
  };

  const handleOpenInEditor = () => {
    closeTool();
    openEditor({
      id: 'prompt-' + Math.random().toString(36).substring(2, 9),
      title: description.slice(0, 32) + (description.length > 32 ? '...' : ''),
      description: `Built via AI Build (${complexity}) + ${selectedSkillIds.length} Skills`,
      content: builtPrompt,
      category: 'aibuild',
      tags: ['aibuild', complexity, ...selectedSkillIds],
      variables: [],
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-2xl max-h-[92vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Build (Natural Spec + Skills)</h3>
              <p className="text-xs text-slate-400">Describe what you need and attach modular abilities</p>
            </div>
          </div>
          <button onClick={closeTool} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <form onSubmit={handleBuild} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Describe the prompt you need
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. I need a prompt that reviews my React pull requests, checks performance and accessibility, and returns a markdown table with severity rankings..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Sophistication Level
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setComplexity('basic')}
                  className={`rounded-xl p-2.5 text-left border transition ${
                    complexity === 'basic'
                      ? 'bg-violet-950/80 border-violet-500 text-white shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <p className="font-semibold">Basic</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Quick direct directive</p>
                </button>

                <button
                  type="button"
                  onClick={() => setComplexity('intermediate')}
                  className={`rounded-xl p-2.5 text-left border transition ${
                    complexity === 'intermediate'
                      ? 'bg-violet-950/80 border-violet-500 text-white shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <p className="font-semibold">Intermediate</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Step-by-step & constraints</p>
                </button>

                <button
                  type="button"
                  onClick={() => setComplexity('expert')}
                  className={`rounded-xl p-2.5 text-left border transition ${
                    complexity === 'expert'
                      ? 'bg-violet-950/80 border-violet-500 text-white shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <p className="font-semibold">Prompt Engineer</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">XML, persona, rubric</p>
                </button>
              </div>
            </div>

            {/* Modular Skills Selector */}
            <div className="space-y-2 pt-1 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    Active Modular Skills ({selectedSkillIds.length} enabled)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1 font-medium"
                >
                  <span>{showAllCategories ? 'Collapse category browser' : 'Browse all 25 categories'}</span>
                  {showAllCategories ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Recommended Quick Skills Pills */}
              <div className="flex flex-wrap gap-1.5">
                {RECOMMENDED_SKILLS.map((id, idx) => {
                  const skill = SKILLS_REGISTRY[id];
                  if (!skill) return null;
                  const isSelected = selectedSkillIds.includes(id);

                  return (
                    <button
                      key={`${id}-${idx}`}
                      type="button"
                      onClick={() => toggleSkill(id)}
                      className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-medium border transition ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <Zap className={`w-3 h-3 ${isSelected ? 'text-amber-300 fill-amber-300' : 'text-slate-500'}`} />
                      <span>{skill.displayName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Expandable Category Skills Browser */}
              {showAllCategories && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 space-y-2 mt-2">
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
                    {CATEGORIES.map((cat, idx) => (
                      <button
                        key={`${cat.id}-${idx}`}
                        type="button"
                        onClick={() => setActiveCategoryFilter(cat.id)}
                        className={`shrink-0 rounded-lg px-2 py-1 text-[11px] font-medium transition ${
                          activeCategoryFilter === cat.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 max-h-36 overflow-y-auto">
                    {getSkillsByCategory(activeCategoryFilter).map((skill, idx) => {
                      const isSelected = selectedSkillIds.includes(skill.id);
                      return (
                        <div
                          key={`${skill.id}-${idx}`}
                          onClick={() => toggleSkill(skill.id)}
                          className={`flex items-center justify-between rounded-xl p-2 border cursor-pointer transition text-xs ${
                            isSelected
                              ? 'bg-indigo-950/80 border-indigo-500 text-white'
                              : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="min-w-0 pr-1">
                            <p className="font-semibold truncate">{skill.displayName}</p>
                            <p className="text-[10px] text-slate-400 truncate">{skill.name}</p>
                          </div>
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border text-[10px] ${
                              isSelected
                                ? 'bg-indigo-600 border-indigo-400 text-white'
                                : 'border-slate-700 text-transparent'
                            }`}
                          >
                            ✓
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-violet-500 hover:to-indigo-500 transition active:scale-[0.99] flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Assemble Prompt with Active Skills</span>
            </button>
          </form>

          {builtPrompt && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <span className="text-xs font-semibold text-slate-300">Assembled Master Prompt:</span>
                  {appliedSkillNames.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {appliedSkillNames.map((name, idx) => (
                        <span key={`${name}-${idx}`} className="text-[10px] font-medium text-indigo-300 bg-indigo-950/70 border border-indigo-500/30 px-1.5 py-0.2 rounded-md">
                          ⚡ {name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={handleOpenInEditor}
                    className="flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-indigo-500"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Open in Editor</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                rows={9}
                value={builtPrompt}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:outline-none leading-relaxed"
              />
              <SkillPreflightNotice diagnostics={skillDiagnostics} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
