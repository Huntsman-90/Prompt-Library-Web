import React, { useState, useMemo } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { optimizePrompt } from '../../utils/promptEngine';
import { detectSkillsInPrompt, applySkills, SKILLS_REGISTRY, getSkillsByCategory } from '../../skills/skillsRegistry';
import { CATEGORIES } from '../../data/categories';
import { X, Sparkles, Copy, Check, Plus, Zap, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

const SUGGESTED_ADDITIONAL_SKILLS = [
  'blameless-principle',
  'domain-authority',
  'json-schema-strict',
  'executive-markdown-table',
  'first-principles',
  'inversion-thinking',
];

export const PromptOptimizerModal: React.FC = () => {
  const { activeTool, closeTool, openEditor, editingPrompt, addToast } = useUIStore();

  const [inputPrompt, setInputPrompt] = useState(editingPrompt?.content || '');
  const [clarity, setClarity] = useState(true);
  const [specificity, setSpecificity] = useState(true);
  const [structure, setStructure] = useState(true);
  const [constraints, setConstraints] = useState(true);
  const [examples, setExamples] = useState(true);
  const [chainOfThought, setChainOfThought] = useState(true);
  const [riskAudit, setRiskAudit] = useState(true);
  const [aggressiveness, setAggressiveness] = useState<'low' | 'medium' | 'high'>('high');

  const [extraSkills, setExtraSkills] = useState<string[]>([]);
  const [showSkillPicker, setShowSkillPicker] = useState(false);
  const [skillCatFilter, setSkillCatFilter] = useState('guardrails');

  const [optimizedOutput, setOptimizedOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Detect skills present in the input prompt
  const detectedInputSkills = useMemo(() => {
    if (!inputPrompt.trim()) return [];
    return detectSkillsInPrompt(inputPrompt);
  }, [inputPrompt]);

  // Detect skills present in the optimized prompt
  const detectedOutputSkills = useMemo(() => {
    if (!optimizedOutput.trim()) return [];
    return detectSkillsInPrompt(optimizedOutput);
  }, [optimizedOutput]);

  if (activeTool !== 'optimizer') return null;

  const toggleExtraSkill = (id: string) => {
    setExtraSkills((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) {
      addToast({ type: 'error', title: 'Please paste a prompt to optimize' });
      return;
    }

    const skillIdsToApply = new Set<string>([
      ...detectedInputSkills.map((s) => s.id),
      ...extraSkills,
    ]);

    if (chainOfThought) skillIdsToApply.add('chain-of-thought');
    if (constraints) skillIdsToApply.add('constraint-injection');
    if (riskAudit) skillIdsToApply.add('inversion-thinking');
    if (structure) skillIdsToApply.add('clarity-and-density');

    let result = '';

    if (skillIdsToApply.size > 0) {
      const { prompt: skillAugmented } = applySkills(inputPrompt, Array.from(skillIdsToApply), {
        clarity,
        specificity,
        structure,
        constraints,
        examples,
        chainOfThought,
        riskAudit,
        aggressiveness,
      });
      result = skillAugmented;
    } else {
      result = optimizePrompt(inputPrompt, {
        clarity,
        specificity,
        structure,
        constraints,
        examples,
        chainOfThought,
        riskAudit,
        aggressiveness,
      });
    }

    setOptimizedOutput(result);
    addToast({
      type: 'success',
      title: 'Prompt optimized!',
      description: 'Restructured with architectural skills & rubric',
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimizedOutput);
      setCopied(true);
      addToast({ type: 'success', title: 'Copied optimized prompt!' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy' });
    }
  };

  const handleOpenInEditor = () => {
    closeTool();
    openEditor({
      id: 'prompt-' + Math.random().toString(36).substring(2, 9),
      title: 'Optimized Prompt',
      description: `Refined with Prompt Optimizer (${aggressiveness})`,
      content: optimizedOutput,
      category: 'optimized',
      tags: ['optimized', aggressiveness, ...extraSkills],
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
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Prompt Optimizer & Skills Auditor</h3>
              <p className="text-xs text-slate-400">Rule-based structural enhancement with skill detection</p>
            </div>
          </div>
          <button onClick={closeTool} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <form onSubmit={handleOptimize} className="space-y-3.5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Your Current Prompt
                </label>
                {detectedInputSkills.length > 0 && (
                  <span className="text-[10px] text-purple-300 font-medium">
                    {detectedInputSkills.length} skills detected in draft
                  </span>
                )}
              </div>
              <textarea
                rows={4}
                required
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Paste the draft prompt you want to elevate..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
              />

              {/* Detected Skills in Input Prompt */}
              {detectedInputSkills.length > 0 && (
                <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-medium">Detected in Draft:</span>
                  {detectedInputSkills.map((s, idx) => (
                    <span
                      key={`${s.id}-${idx}`}
                      className="rounded-md bg-purple-950/70 border border-purple-500/30 px-1.5 py-0.5 text-[9px] font-medium text-purple-300 flex items-center gap-1"
                    >
                      <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      {s.displayName}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Techniques checkboxes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Enhancement Techniques
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <label className="flex items-center gap-2 rounded-xl bg-slate-800/80 p-2 border border-slate-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clarity}
                    onChange={(e) => setClarity(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0"
                  />
                  <span>Clarity & Tone</span>
                </label>
                <label className="flex items-center gap-2 rounded-xl bg-slate-800/80 p-2 border border-slate-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={specificity}
                    onChange={(e) => setSpecificity(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0"
                  />
                  <span>Specificity</span>
                </label>
                <label className="flex items-center gap-2 rounded-xl bg-slate-800/80 p-2 border border-slate-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={structure}
                    onChange={(e) => setStructure(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0"
                  />
                  <span>Hierarchy & Headers</span>
                </label>
                <label className="flex items-center gap-2 rounded-xl bg-slate-800/80 p-2 border border-slate-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={constraints}
                    onChange={(e) => setConstraints(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0"
                  />
                  <span>Hard Guardrails</span>
                </label>
                <label className="flex items-center gap-2 rounded-xl bg-slate-800/80 p-2 border border-slate-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chainOfThought}
                    onChange={(e) => setChainOfThought(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0"
                  />
                  <span>Chain-of-Thought</span>
                </label>
                <label className="flex items-center gap-2 rounded-xl bg-slate-800/80 p-2 border border-slate-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={riskAudit}
                    onChange={(e) => setRiskAudit(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0"
                  />
                  <span>Risk Mitigation</span>
                </label>
              </div>
            </div>

            {/* Additional Modular Skills to Inject */}
            <div className="space-y-2 pt-1 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    Inject Specialized Skills ({extraSkills.length} selected)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSkillPicker(!showSkillPicker)}
                  className="text-[11px] text-purple-400 hover:text-purple-300 transition flex items-center gap-1 font-medium"
                >
                  <span>{showSkillPicker ? 'Hide skill catalog' : 'Add from catalog'}</span>
                  {showSkillPicker ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Quick toggle chips */}
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_ADDITIONAL_SKILLS.map((id, idx) => {
                  const s = SKILLS_REGISTRY[id];
                  if (!s) return null;
                  const isSelected = extraSkills.includes(id);

                  return (
                    <button
                      key={`${id}-${idx}`}
                      type="button"
                      onClick={() => toggleExtraSkill(id)}
                      className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-medium border transition ${
                        isSelected
                          ? 'bg-purple-600 border-purple-500 text-white shadow-sm'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <Zap className={`w-3 h-3 ${isSelected ? 'text-amber-300 fill-amber-300' : 'text-slate-500'}`} />
                      <span>{s.displayName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Expandable Skills Browser */}
              {showSkillPicker && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 space-y-2 mt-2">
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
                    {CATEGORIES.map((cat, idx) => (
                      <button
                        key={`${cat.id}-${idx}`}
                        type="button"
                        onClick={() => setSkillCatFilter(cat.id)}
                        className={`shrink-0 rounded-lg px-2 py-1 text-[11px] font-medium transition ${
                          skillCatFilter === cat.id
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 max-h-36 overflow-y-auto">
                    {getSkillsByCategory(skillCatFilter).map((skill, idx) => {
                      const isSelected = extraSkills.includes(skill.id);
                      return (
                        <div
                          key={`${skill.id}-${idx}`}
                          onClick={() => toggleExtraSkill(skill.id)}
                          className={`flex items-center justify-between rounded-xl p-2 border cursor-pointer transition text-xs ${
                            isSelected
                              ? 'bg-purple-950/80 border-purple-500 text-white'
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
                                ? 'bg-purple-600 border-purple-400 text-white'
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

            {/* Aggressiveness */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Refactoring Aggressiveness
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['low', 'medium', 'high'] as const).map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setAggressiveness(lvl)}
                    className={`rounded-xl py-2 font-medium capitalize border transition ${
                      aggressiveness === lvl
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-purple-500 hover:to-indigo-500 transition active:scale-[0.99] flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Optimize Prompt & Synthesize Skills</span>
            </button>
          </form>

          {/* Optimized Result Display */}
          {optimizedOutput && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-slate-300">Optimized Result:</span>
                  {detectedOutputSkills.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      <span className="text-[10px] text-emerald-400 font-medium mr-1 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Skills in Result ({detectedOutputSkills.length}):
                      </span>
                      {detectedOutputSkills.map((s, idx) => (
                        <span
                          key={`${s.id}-${idx}`}
                          className="rounded-md bg-emerald-950/70 border border-emerald-500/30 px-1.5 py-0.5 text-[9px] font-medium text-emerald-300"
                        >
                          ✓ {s.displayName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
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
                rows={10}
                value={optimizedOutput}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:outline-none leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
