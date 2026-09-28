import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { buildPromptFromDescription } from '../../utils/promptEngine';
import { X, Bot, Sparkles, Copy, Check, Plus } from 'lucide-react';

export const AIBuildModal: React.FC = () => {
  const { activeTool, closeTool, openEditor, addToast } = useUIStore();

  const [description, setDescription] = useState('');
  const [complexity, setComplexity] = useState<'basic' | 'intermediate' | 'expert'>('expert');
  const [builtPrompt, setBuiltPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  if (activeTool !== 'aibuild') return null;

  const handleBuild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      addToast({ type: 'error', title: 'Please provide a description' });
      return;
    }
    const result = buildPromptFromDescription(description, complexity);
    setBuiltPrompt(result);
    addToast({ type: 'success', title: 'Master prompt assembled!' });
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
      description: `Built via AI Build (${complexity})`,
      content: builtPrompt,
      category: 'aibuild',
      tags: ['aibuild', complexity],
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
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Build (Natural Spec)</h3>
              <p className="text-xs text-slate-400">Describe what you need in plain words</p>
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
                rows={4}
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

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-violet-500 hover:to-indigo-500 transition active:scale-[0.99]"
            >
              Assemble Prompt
            </button>
          </form>

          {builtPrompt && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Assembled Master Prompt:</span>
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
                value={builtPrompt}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:outline-none leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
