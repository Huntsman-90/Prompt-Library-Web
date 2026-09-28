import React, { useState, useEffect } from 'react';
import type { PromptItem } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import { X, Layers, Copy, Check, Plus, ArrowRight, Shuffle } from 'lucide-react';

export const PromptSplicerModal: React.FC = () => {
  const { activeTool, closeTool, openEditor, addToast } = useUIStore();
  const [prompts, setPrompts] = useState<PromptItem[]>([]);

  const [promptAId, setPromptAId] = useState('');
  const [promptBId, setPromptBId] = useState('');

  // Selected sections
  const [roleSource, setRoleSource] = useState<'a' | 'b' | 'none'>('a');
  const [contextSource, setContextSource] = useState<'a' | 'b' | 'none'>('b');
  const [taskSource, setTaskSource] = useState<'a' | 'b' | 'none'>('a');
  const [constraintsSource, setConstraintsSource] = useState<'a' | 'b' | 'none'>('b');
  const [outputSource, setOutputSource] = useState<'a' | 'b' | 'none'>('a');

  const [splicedPrompt, setSplicedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    db.prompts.toArray().then((items) => {
      setPrompts(items);
      if (items.length >= 2) {
        setPromptAId(items[0].id);
        setPromptBId(items[1].id);
      } else if (items.length === 1) {
        setPromptAId(items[0].id);
        setPromptBId(items[0].id);
      }
    });
  }, [activeTool]);

  if (activeTool !== 'splicer') return null;

  const promptA = prompts.find((p) => p.id === promptAId);
  const promptB = prompts.find((p) => p.id === promptBId);

  // Simple heuristic parser for sections
  const parseSection = (p?: PromptItem) => {
    if (!p) return { role: '', context: '', task: '', constraints: '', output: '' };
    const content = p.content;
    const lines = content.split('\n');
    return {
      role: `You are an elite practitioner specialized in [[${p.category || 'domain'}]]. Maintain high standard execution.`,
      context: `### Operating Context\nProject: ${p.title}\nBackground: ${p.description || 'Enterprise grade workflow'}.`,
      task: `### Primary Directive\n${lines.slice(0, Math.min(lines.length, 6)).join('\n')}`,
      constraints: `### Quality & Behavioral Constraints\n- Ground all responses strictly in facts.\n- Avoid unnecessary preamble and filler words.\n- Adhere to the established schema.`,
      output: `### Output Schema\nDeliver response with Markdown headings, structured lists, and an executive summary.`,
    };
  };

  const handleSplice = () => {
    if (!promptA || !promptB) {
      addToast({ type: 'error', title: 'Please select two prompts to splice' });
      return;
    }

    const parsedA = parseSection(promptA);
    const parsedB = parseSection(promptB);

    const blocks: string[] = [];

    if (roleSource === 'a') blocks.push(parsedA.role);
    else if (roleSource === 'b') blocks.push(parsedB.role);

    if (contextSource === 'a') blocks.push(parsedA.context);
    else if (contextSource === 'b') blocks.push(parsedB.context);

    if (taskSource === 'a') blocks.push(parsedA.task);
    else if (taskSource === 'b') blocks.push(parsedB.task);

    if (constraintsSource === 'a') blocks.push(parsedA.constraints);
    else if (constraintsSource === 'b') blocks.push(parsedB.constraints);

    if (outputSource === 'a') blocks.push(parsedA.output);
    else if (outputSource === 'b') blocks.push(parsedB.output);

    const merged = blocks.join('\n\n');
    setSplicedPrompt(merged);
    addToast({ type: 'success', title: 'Prompts successfully spliced!' });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(splicedPrompt);
      setCopied(true);
      addToast({ type: 'success', title: 'Copied spliced prompt!' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy' });
    }
  };

  const handleOpenInEditor = () => {
    closeTool();
    openEditor({
      id: 'prompt-' + Math.random().toString(36).substring(2, 9),
      title: `Hybrid: ${promptA?.title.slice(0, 15)} + ${promptB?.title.slice(0, 15)}`,
      description: 'Spliced from two prompts',
      content: splicedPrompt,
      category: 'hybrid',
      tags: ['spliced', 'hybrid'],
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
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-600 text-white">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Prompt Splicer</h3>
              <p className="text-xs text-slate-400">Combine modular sections from multiple prompts</p>
            </div>
          </div>
          <button onClick={closeTool} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Select Source Prompts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Parent Prompt A
              </label>
              <select
                value={promptAId}
                onChange={(e) => setPromptAId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none"
              >
                {prompts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Parent Prompt B
              </label>
              <select
                value={promptBId}
                onChange={(e) => setPromptBId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none"
              >
                {prompts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section Selection Matrix */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3 space-y-2.5 text-xs">
            <p className="font-semibold text-slate-200 mb-1">Select Block Origins:</p>

            {[
              { label: 'Role & Persona', val: roleSource, set: setRoleSource },
              { label: 'Operating Context', val: contextSource, set: setContextSource },
              { label: 'Core Task & Objective', val: taskSource, set: setTaskSource },
              { label: 'Guardrails & Constraints', val: constraintsSource, set: setConstraintsSource },
              { label: 'Output Schema Format', val: outputSource, set: setOutputSource },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-slate-800/60 pb-2"
              >
                <span className="text-slate-300 font-medium">{row.label}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => row.set('a')}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                      row.val === 'a'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Prompt A
                  </button>
                  <button
                    type="button"
                    onClick={() => row.set('b')}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                      row.val === 'b'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Prompt B
                  </button>
                  <button
                    type="button"
                    onClick={() => row.set('none')}
                    className={`rounded-lg px-2 py-1 text-[11px] transition ${
                      row.val === 'none'
                        ? 'bg-slate-700 text-white'
                        : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Skip
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSplice}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-amber-500 hover:to-orange-500 transition active:scale-[0.99]"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Splice & Fuse Prompts</span>
          </button>

          {splicedPrompt && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Spliced Master Output:</span>
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
                value={splicedPrompt}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:outline-none leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
