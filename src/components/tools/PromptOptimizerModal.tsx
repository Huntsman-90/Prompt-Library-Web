import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { optimizePrompt } from '../../utils/promptEngine';
import { X, Sparkles, Copy, Check, Plus } from 'lucide-react';

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

  const [optimizedOutput, setOptimizedOutput] = useState('');
  const [copied, setCopied] = useState(false);

  if (activeTool !== 'optimizer') return null;

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) {
      addToast({ type: 'error', title: 'Please paste a prompt to optimize' });
      return;
    }
    const result = optimizePrompt(inputPrompt, {
      clarity,
      specificity,
      structure,
      constraints,
      examples,
      chainOfThought,
      riskAudit,
      aggressiveness,
    });
    setOptimizedOutput(result);
    addToast({ type: 'success', title: 'Prompt optimized!' });
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
      description: 'Refined with Prompt Optimizer',
      content: optimizedOutput,
      category: 'optimized',
      tags: ['optimized', aggressiveness],
      variables: [],
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-2xl max-h-[90vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Prompt Optimizer</h3>
              <p className="text-xs text-slate-400">Rule-based structural enhancement</p>
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Your Current Prompt
              </label>
              <textarea
                rows={4}
                required
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Paste the draft prompt you want to elevate..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
              />
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
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-purple-500 hover:to-indigo-500 transition active:scale-[0.99]"
            >
              Optimize Prompt
            </button>
          </form>

          {optimizedOutput && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Optimized Result:</span>
                <div className="flex items-center gap-1.5">
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
