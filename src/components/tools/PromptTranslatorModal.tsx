import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { translatePrompt } from '../../utils/promptEngine';
import { X, Globe2, Copy, Check, Plus } from 'lucide-react';

export const PromptTranslatorModal: React.FC = () => {
  const { activeTool, closeTool, openEditor, editingPrompt, addToast } = useUIStore();

  const [inputPrompt, setInputPrompt] = useState(editingPrompt?.content || '');
  const [targetLang, setTargetLang] = useState('Spanish');
  const [translatedOutput, setTranslatedOutput] = useState('');
  const [copied, setCopied] = useState(false);

  if (activeTool !== 'translator') return null;

  const languages = [
    'Spanish',
    'French',
    'German',
    'Portuguese',
    'Italian',
    'Japanese',
    'Chinese',
    'Korean',
    'Arabic',
    'Hindi',
    'Russian',
  ];

  const handleTranslate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) {
      addToast({ type: 'error', title: 'Please provide a prompt to translate' });
      return;
    }
    const result = translatePrompt(inputPrompt, targetLang);
    setTranslatedOutput(result);
    addToast({ type: 'success', title: `Translated to ${targetLang}!` });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedOutput);
      setCopied(true);
      addToast({ type: 'success', title: 'Copied translated prompt!' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy' });
    }
  };

  const handleOpenInEditor = () => {
    closeTool();
    openEditor({
      id: 'prompt-' + Math.random().toString(36).substring(2, 9),
      title: `Prompt (${targetLang})`,
      description: `Translated to ${targetLang}`,
      content: translatedOutput,
      category: 'translated',
      tags: ['translation', targetLang.toLowerCase()],
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
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-600 text-white">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Prompt Translator</h3>
              <p className="text-xs text-slate-400">11 Languages with 100% placeholder preservation</p>
            </div>
          </div>
          <button onClick={closeTool} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <form onSubmit={handleTranslate} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Source Prompt (with [[variables]])
              </label>
              <textarea
                rows={4}
                required
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Enter prompt text with [[variable]] or {{variable}} tags..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Language
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {languages.map((lang) => (
                  <button
                    type="button"
                    key={lang}
                    onClick={() => setTargetLang(lang)}
                    className={`rounded-xl px-3 py-2 text-xs font-medium border transition ${
                      targetLang === lang
                        ? 'bg-teal-600 border-teal-500 text-white shadow-sm'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-teal-500 hover:to-emerald-500 transition active:scale-[0.99]"
            >
              Translate Prompt
            </button>
          </form>

          {translatedOutput && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Translated Output ({targetLang}):
                </span>
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
                value={translatedOutput}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 focus:outline-none leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
