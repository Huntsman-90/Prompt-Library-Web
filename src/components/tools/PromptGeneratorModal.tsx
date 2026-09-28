import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { generatePromptFromParams } from '../../utils/promptEngine';
import { X, Wand2, Copy, Check, Plus } from 'lucide-react';

export const PromptGeneratorModal: React.FC = () => {
  const { activeTool, closeTool, openEditor, addToast } = useUIStore();

  const [domain, setDomain] = useState('Coding');
  const [task, setTask] = useState('');
  const [technique, setTechnique] = useState('Chain-of-Thought');
  const [tone, setTone] = useState('Matter-of-Fact');
  const [detailLevel, setDetailLevel] = useState<'minimalist' | 'balanced' | 'exhaustive'>('balanced');
  const [targetModel, setTargetModel] = useState('Universal');

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  if (activeTool !== 'generator') return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = generatePromptFromParams({
      domain,
      task: task.trim() || `Analyze and solve [[target_issue]] with high technical fidelity.`,
      technique,
      tone,
      detailLevel,
      targetModel,
    });
    setGeneratedPrompt(result);
    addToast({ type: 'success', title: 'Prompt generated successfully!' });
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
      description: `Generated for ${task || domain}`,
      content: generatedPrompt,
      category: domain.toLowerCase(),
      tags: [domain.toLowerCase(), technique.toLowerCase()],
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
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Prompt Generator</h3>
              <p className="text-xs text-slate-400">Rule-based combinatorial prompt synthesis</p>
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

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-blue-500 hover:to-indigo-500 transition active:scale-[0.99]"
            >
              Generate Master Prompt
            </button>
          </form>

          {/* Generated Result */}
          {generatedPrompt && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Generated Output:</span>
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
