import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { simplifyPrompt } from '../../utils/promptEngine';
import { X, Scissors, Copy, Check, Plus, ArrowRight } from 'lucide-react';

export const PromptSimplifierModal: React.FC = () => {
  const { activeTool, closeTool, openEditor, editingPrompt, addToast } = useUIStore();

  const [inputPrompt, setInputPrompt] = useState(editingPrompt?.content || '');
  const [mode, setMode] = useState<'light' | 'balanced' | 'aggressive'>('balanced');
  const [simplifiedOutput, setSimplifiedOutput] = useState('');
  const [copied, setCopied] = useState(false);

  if (activeTool !== 'simplifier') return null;

  const handleSimplify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) {
      addToast({ type: 'error', title: 'Please provide a prompt to simplify' });
      return;
    }
    const result = simplifyPrompt(inputPrompt, mode);
    setSimplifiedOutput(result);
    addToast({ type: 'success', title: `Simplified with ${mode} mode!` });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(simplifiedOutput);
      setCopied(true);
      addToast({ type: 'success', title: 'Copied simplified prompt!' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy' });
    }
  };

  const handleOpenInEditor = () => {
    closeTool();
    openEditor({
      id: 'prompt-' + Math.random().toString(36).substring(2, 9),
      title: 'Simplified Prompt',
      description: `Simplified via ${mode} mode`,
      content: simplifiedOutput,
      category: 'simplified',
      tags: ['simplified', mode],
      variables: [],
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const inputCharCount = inputPrompt.length;
  const outputCharCount = simplifiedOutput.length;
  const reductionPercent =
    inputCharCount > 0 && outputCharCount > 0
      ? Math.max(0, Math.round(((inputCharCount - outputCharCount) / inputCharCount) * 100))
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-2xl max-h-[90vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-600 text-white">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Prompt Simplifier</h3>
              <p className="text-xs text-slate-400">Eliminate boilerplate and optimize token density</p>
            </div>
          </div>
          <button onClick={closeTool} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <form onSubmit={handleSimplify} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Verbose Draft Prompt
              </label>
              <textarea
                rows={4}
                required
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Paste prompt containing filler phrases, polite hedges, or redundant words..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            {/* Mode selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Simplification Level
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setMode('light')}
                  className={`rounded-xl p-2.5 text-left border transition ${
                    mode === 'light'
                      ? 'bg-pink-950/80 border-pink-500 text-white shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <p className="font-semibold">Light</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Removes please & fillers</p>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('balanced')}
                  className={`rounded-xl p-2.5 text-left border transition ${
                    mode === 'balanced'
                      ? 'bg-pink-950/80 border-pink-500 text-white shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <p className="font-semibold">Balanced</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Cleans sentence density</p>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('aggressive')}
                  className={`rounded-xl p-2.5 text-left border transition ${
                    mode === 'aggressive'
                      ? 'bg-pink-950/80 border-pink-500 text-white shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <p className="font-semibold">Aggressive</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Atomic directives only</p>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-pink-500 hover:to-rose-500 transition active:scale-[0.99]"
            >
              Simplify & Compress Prompt
            </button>
          </form>

          {simplifiedOutput && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">Cleaned Result:</span>
                  {reductionPercent > 0 && (
                    <span className="rounded-full bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      -{reductionPercent}% tokens saved
                    </span>
                  )}
                </div>

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
                rows={8}
                value={simplifiedOutput}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:outline-none leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
