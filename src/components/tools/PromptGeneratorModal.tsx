import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { generatePromptFromParams } from '../../utils/promptEngine';
import { applySkills, getSkillsByCategory, SKILLS_REGISTRY, type SkillDefinition } from '../../skills/skillsRegistry';
import { CATEGORIES } from '../../data/categories';
import { X, Wand2, Copy, Check, Plus, Zap, ChevronDown, ChevronUp } from 'lucide-react';

const DOMAIN_RECOMMENDED_SKILLS: Record<string, string[]> = {
  Coding: ['code-audit-smells', 'type-safety-contracts', 'regression-test-specs'],
  Business: ['unit-economics-modeling', 'gtm-roadmap-phasing', 'defensible-moats'],
  Copywriting: ['persuasive-copy-arc', 'executive-memo-style', 'clarity-and-density'],
  Product: ['user-persona-empathy', 'usability-heuristic-audit', 'microcopy-ux-writing'],
  Research: ['literature-synthesis', 'methodology-critique', 'hypothesis-falsification'],
  Executive: ['executive-summary-distiller', 'decision-tradeoff-matrix', 'executive-sponsor-persona'],
};

export const PromptGeneratorModal: React.FC = () => {
  const { activeTool, closeTool, openEditor, addToast } = useUIStore();

  const [domain, setDomain] = useState('Coding');
  const [task, setTask] = useState('');
  const [technique, setTechnique] = useState('Chain-of-Thought');
  const [tone, setTone] = useState('Matter-of-Fact');
  const [detailLevel, setDetailLevel] = useState<'minimalist' | 'balanced' | 'exhaustive'>('balanced');
  const [targetModel, setTargetModel] = useState('Universal');

  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([
    'role-calibration',
    'constraint-injection',
  ]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('coding');

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [appliedSkillNames, setAppliedSkillNames] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  if (activeTool !== 'generator') return null;

  const toggleSkill = (id: string) => {
    setSelectedSkillIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const targetTask = task.trim() || `Analyze and solve [[target_issue]] with high technical fidelity.`;
    let finalResult = '';
    let appliedSkillsList: SkillDefinition[] = [];

    if (selectedSkillIds.length > 0) {
      const { prompt: skillResult, appliedSkills } = applySkills(targetTask, selectedSkillIds, {
        domain,
        technique,
        tone,
        detailLevel,
        targetModel,
      });
      finalResult = skillResult;
      appliedSkillsList = appliedSkills;
    } else {
      finalResult = generatePromptFromParams({
        domain,
        task: targetTask,
        technique,
        tone,
        detailLevel,
        targetModel,
      });
    }

    setGeneratedPrompt(finalResult);
    setAppliedSkillNames(appliedSkillsList.map((s) => s.displayName));
    addToast({
      type: 'success',
      title: 'Prompt generated with active skills!',
      description: `${appliedSkillsList.length} skills woven into prompt architecture`,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      addToast({ type: 'success', title: 'Copied generated prompt!' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy' });
    }
  };

  const handleOpenInEditor = () => {
    closeTool();
    openEditor({
      id: 'prompt-' + Math.random().toString(36).substring(2, 9),
      title: `${domain} - ${technique} Prompt`,
      description: `Generated for ${task || domain} with ${selectedSkillIds.length} Skills`,
      content: generatedPrompt,
      category: domain.toLowerCase(),
      tags: [domain.toLowerCase(), technique.toLowerCase(), ...selectedSkillIds],
      variables: [],
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const domainSkills = DOMAIN_RECOMMENDED_SKILLS[domain] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-2xl max-h-[92vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Prompt Generator (Combinatorial + Skills)</h3>
              <p className="text-xs text-slate-400">Rule-based synthesis enriched with modular abilities</p>
            </div>
          </div>
          <button onClick={closeTool} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <form onSubmit={handleGenerate} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Domain</label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Coding">Coding & Systems Architecture</option>
                  <option value="Business">Business & GTM Strategy</option>
                  <option value="Copywriting">Copywriting & Conversion</option>
                  <option value="Product">Product & UX Design</option>
                  <option value="Research">Academic & Scientific Research</option>
                  <option value="Executive">Executive Leadership & Memos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Thinking Technique</label>
                <select
                  value={technique}
                  onChange={(e) => setTechnique(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Chain-of-Thought">Chain-of-Thought (Step-by-step)</option>
                  <option value="Six-Hats">Six Thinking Hats (De Bono)</option>
                  <option value="First-Principles">First Principles Axioms</option>
                  <option value="Tree-of-Thoughts">Tree of Thoughts (Multi-branch)</option>
                  <option value="Inversion">Inversion (Charlie Munger)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Core Task Directive
              </label>
              <textarea
                rows={2}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g. Conduct a comprehensive security audit of our auth service and propose hardened architecture..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tone & Voice</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Matter-of-Fact">Matter-of-Fact & Objective</option>
                  <option value="Radical-Candor">Radical Candor (Direct)</option>
                  <option value="Executive">Executive Brief (BLUF)</option>
                  <option value="Socratic">Socratic & Inquisitive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detail Level</label>
                <select
                  value={detailLevel}
                  onChange={(e) => setDetailLevel(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="minimalist">Minimalist & Crisp</option>
                  <option value="balanced">Balanced Standard</option>
                  <option value="exhaustive">Exhaustive & Granular</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Model</label>
                <select
                  value={targetModel}
                  onChange={(e) => setTargetModel(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Universal">Universal Markdown</option>
                  <option value="Claude">Anthropic Claude (XML)</option>
                  <option value="GPT">OpenAI GPT-4o</option>
                </select>
              </div>
            </div>

            {/* Modular Skills Selector */}
            <div className="space-y-2 pt-1 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    Weave Modular Skills ({selectedSkillIds.length} enabled)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 transition flex items-center gap-1 font-medium"
                >
                  <span>{showAllCategories ? 'Collapse category browser' : 'Browse all 25 categories'}</span>
                  {showAllCategories ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Recommended Domain Skills Pills */}
              <div className="flex flex-wrap gap-1.5">
                {['role-calibration', 'constraint-injection', ...domainSkills].map((id) => {
                  const skill = SKILLS_REGISTRY[id];
                  if (!skill) return null;
                  const isSelected = selectedSkillIds.includes(id);

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleSkill(id)}
                      className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-medium border transition ${
                        isSelected
                          ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
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
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategoryFilter(cat.id)}
                        className={`shrink-0 rounded-lg px-2 py-1 text-[11px] font-medium transition ${
                          activeCategoryFilter === cat.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 max-h-36 overflow-y-auto">
                    {getSkillsByCategory(activeCategoryFilter).map((skill) => {
                      const isSelected = selectedSkillIds.includes(skill.id);
                      return (
                        <div
                          key={skill.id}
                          onClick={() => toggleSkill(skill.id)}
                          className={`flex items-center justify-between rounded-xl p-2 border cursor-pointer transition text-xs ${
                            isSelected
                              ? 'bg-blue-950/80 border-blue-500 text-white'
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
                                ? 'bg-blue-600 border-blue-400 text-white'
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
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-blue-500 hover:to-indigo-500 transition active:scale-[0.99] flex items-center justify-center gap-1.5"
            >
              <Wand2 className="w-4 h-4" />
              <span>Generate Master Prompt with Active Skills</span>
            </button>
          </form>

          {/* Generated Result */}
          {generatedPrompt && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <span className="text-xs font-semibold text-slate-300">Generated Output:</span>
                  {appliedSkillNames.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {appliedSkillNames.map((name) => (
                        <span key={name} className="text-[10px] font-medium text-blue-300 bg-blue-950/70 border border-blue-500/30 px-1.5 py-0.2 rounded-md">
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
                value={generatedPrompt}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:outline-none leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
