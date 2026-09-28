import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { adaptPromptForModel } from '../../utils/promptEngine';
import { X, Cpu, Copy, Check, Plus } from 'lucide-react';

export const ModelAdapterModal: React.FC = () => {
  const { activeTool, closeTool, openEditor, editingPrompt, addToast } = useUIStore();

  const [inputPrompt, setInputPrompt] = useState(editingPrompt?.content || '');
  const [targetModel, setTargetModel] = useState<'claude' | 'openai' | 'gemini' | 'grok' | 'llama'>('claude');
  const [adaptedOutput, setAdaptedOutput] = useState('');
  const [copied, setCopied] = useState(false);

  if (activeTool !== 'adapter') return null;

  const models: { id: 'claude' | 'openai' | 'gemini' | 'grok' | 'llama'; name: string; tag: string }[] = [
    { id: 'claude', name: 'Anthropic Claude', tag: 'XML & Thinking Tags' },
    { id: 'openai', name: 'OpenAI GPT-4o', tag: 'System & Developer Header' },
    { id: 'gemini', name: 'Google Gemini', tag: 'Grounding & Strict Schema' },
    { id: 'grok', name: 'xAI Grok', tag: 'Direct & Truth-Seeking' },
    { id: 'llama', name: 'Meta Llama 3', tag: 'Chat Special Tokens' },
  ];

  const handleAdapt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) {
      addToast({ type: 'error', title: 'Please provide a prompt to adapt' });
      return;
    }
    const result = adaptPromptForModel(inputPrompt, targetModel);
    setAdaptedOutput(result);
    addToast({ type: 'success', title: `Adapted for ${targetModel.toUpperCase()}!` });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(adaptedOutput);
      setCopied(true);
      addToast({ type: 'success', title: 'Copied adapted prompt!' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy' });
    }
  };

  const handleOpenInEditor = () => {
    closeTool();
    openEditor({
      id: 'prompt-' + Math.random().toString(36).substring(2, 9),
      title: `Prompt (${targetModel.toUpperCase()})`,
      description: `Adapted for ${targetModel}`,
      content: adaptedOutput,
      category: 'adapted',
      tags: ['adapted', targetModel],
      variables: [],
      isFavorite: false,
      usageCount: 0,
      targetModel: targetModel.toUpperCase(),
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
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-600 text-white">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Model Adapter</h3>
              <p className="text-xs text-slate-400">Reformat prompt architecture to match model syntax conventions</p>
            </div>
          </div>
          <button onClick={closeTool} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <form onSubmit={handleAdapt} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Source Prompt
              </label>
              <textarea
                rows={4}
                required
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Paste the prompt you want to adapt..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Model Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {models.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setTargetModel(m.id)}
                    className={`flex items-center justify-between rounded-xl p-3 border text-left transition ${
                      targetModel === m.id
                        ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-sm'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.tag}</p>
                    </div>
                    {targetModel === m.id && (
                      <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-cyan-500 hover:to-blue-500 transition active:scale-[0.99]"
            >
              Adapt for Selected Model
            </button>
          </form>

          {adaptedOutput && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Adapted Architecture:</span>
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
                rows={9}
                value={adaptedOutput}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:outline-none leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
