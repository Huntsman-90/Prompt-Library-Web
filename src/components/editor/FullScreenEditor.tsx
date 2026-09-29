import React, { useState, useEffect, useMemo } from 'react';
import type { PromptItem, HistoryEntry, FolderItem } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import { useThemeStore } from '../../store/useThemeStore';
import { extractVariables, substituteVariables } from '../../hooks/useVariables';
import {
  optimizePrompt,
  simplifyPrompt,
  translatePrompt,
  adaptPromptForModel,
} from '../../utils/promptEngine';
import { applySkill, detectSkillsInPrompt } from '../../skills/skillsRegistry';
import { ComponentInserterModal } from './ComponentInserterModal';
import {
  X,
  Save,
  Copy,
  Check,
  GitFork,
  Sparkles,
  Scissors,
  Globe2,
  Cpu,
  History,
  Boxes,
  Zap,
  Eye,
  Sliders,
  Variable as VariableIcon,
  Tag,
  Folder as FolderIcon,
  RotateCcw,
  Download,
} from 'lucide-react';
import { downloadPromptAsMarkdown } from '../../utils/markdownExporter';

export const FullScreenEditor: React.FC = () => {
  const { isEditorOpen, editingPrompt, closeEditor, addToast, setIsComponentPickerOpen } = useUIStore();
  const { fontSize } = useThemeStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [folderId, setFolderId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [targetModel, setTargetModel] = useState('Universal');

  // Variables state
  const [varValues, setVarValues] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'editor' | 'variables' | 'preview' | 'history'>('editor');

  // History entries
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [copied, setCopied] = useState(false);

  // Quick Action menu states
  const [showTranslateMenu, setShowTranslateMenu] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [showSimplifyMenu, setShowSimplifyMenu] = useState(false);

  useEffect(() => {
    if (editingPrompt) {
      setTitle(editingPrompt.title);
      setDescription(editingPrompt.description || '');
      setContent(editingPrompt.content);
      setCategory(editingPrompt.category || 'general');
      setFolderId(editingPrompt.folderId || null);
      setTags(editingPrompt.tags || []);
      setTargetModel(editingPrompt.targetModel || 'Universal');

      // Load history
      db.history
        .where('promptId')
        .equals(editingPrompt.id)
        .reverse()
        .sortBy('timestamp')
        .then(setHistoryEntries);
    } else {
      setTitle('Untitled Prompt');
      setDescription('');
      setContent('');
      setCategory('general');
      setFolderId(null);
      setTags([]);
      setTargetModel('Universal');
      setHistoryEntries([]);
    }

    db.folders.toArray().then(setFolders);
  }, [editingPrompt]);

  // Extract variables automatically from content
  const detectedVariables = useMemo(() => {
    return extractVariables(content);
  }, [content]);

  // Sync variable values map
  useEffect(() => {
    setVarValues((prev) => {
      const next = { ...prev };
      detectedVariables.forEach((v) => {
        if (next[v] === undefined) {
          next[v] = '';
        }
      });
      return next;
    });
  }, [detectedVariables]);

  // Live preview text
  const previewText = useMemo(() => {
    return substituteVariables(content, varValues);
  }, [content, varValues]);

  if (!isEditorOpen) return null;

  const handleSave = async (saveAsNew = false) => {
    if (!title.trim()) {
      addToast({ type: 'error', title: 'Please provide a prompt title' });
      return;
    }

    const now = new Date().toISOString();
    const promptId =
      saveAsNew || !editingPrompt
        ? 'prompt-' + Math.random().toString(36).substring(2, 9)
        : editingPrompt.id;

    const item: PromptItem = {
      id: promptId,
      title: title.trim(),
      description: description.trim(),
      content: content,
      category: category.toLowerCase().trim() || 'general',
      folderId: folderId || null,
      tags: tags,
      variables: detectedVariables,
      isFavorite: editingPrompt && !saveAsNew ? editingPrompt.isFavorite : false,
      usageCount: editingPrompt && !saveAsNew ? editingPrompt.usageCount : 0,
      targetModel: targetModel,
      createdAt: editingPrompt && !saveAsNew ? editingPrompt.createdAt : now,
      updatedAt: now,
    };

    await db.prompts.put(item);

    // Save history revision
    await db.history.add({
      id: 'hist-' + Math.random().toString(36).substring(2, 9),
      promptId: promptId,
      title: item.title,
      content: item.content,
      timestamp: now,
      note: saveAsNew ? 'Saved as new prompt' : 'Snapshot saved',
    });

    addToast({
      type: 'success',
      title: saveAsNew ? 'Saved as new prompt' : 'Prompt saved',
      description: item.title,
    });

    if (saveAsNew) {
      closeEditor();
    }
  };

  const handleCopy = async (withVariables = false) => {
    const textToCopy = withVariables ? previewText : content;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      addToast({
        type: 'success',
        title: withVariables ? 'Copied with filled variables!' : 'Copied prompt template!',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy to clipboard' });
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/^#/, '');
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
      }
      setTagInput('');
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter((x) => x !== t));
  };

  // Quick tools directly inside editor
  const handleOptimize = () => {
    const optimized = optimizePrompt(content, {
      clarity: true,
      specificity: true,
      structure: true,
      constraints: true,
      examples: true,
      chainOfThought: true,
      riskAudit: true,
      aggressiveness: 'high',
    });
    setContent(optimized);
    addToast({ type: 'success', title: 'Prompt optimized with engineering rubric!' });
  };

  const handleSimplify = (mode: 'light' | 'balanced' | 'aggressive') => {
    setShowSimplifyMenu(false);
    const simplified = simplifyPrompt(content, mode);
    setContent(simplified);
    addToast({ type: 'success', title: `Prompt simplified (${mode} mode)!` });
  };

  const handleTranslate = (lang: string) => {
    setShowTranslateMenu(false);
    const translated = translatePrompt(content, lang);
    setContent(translated);
    addToast({ type: 'success', title: `Translated to ${lang} (variables preserved)!` });
  };

  const handleAdapt = (model: 'claude' | 'openai' | 'gemini' | 'grok' | 'llama') => {
    setShowModelMenu(false);
    const adapted = adaptPromptForModel(content, model);
    setContent(adapted);
    setTargetModel(model.toUpperCase());
    addToast({ type: 'success', title: `Adapted for ${model.toUpperCase()}!` });
  };

  const restoreRevision = (entry: HistoryEntry) => {
    setContent(entry.content);
    setTitle(entry.title);
    addToast({ type: 'info', title: 'Revision restored', description: new Date(entry.timestamp).toLocaleString() });
    setActiveTab('editor');
  };

  const fontSizeClass =
    fontSize === 'sm' ? 'text-xs' : fontSize === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 overflow-hidden animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-3 sm:px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Prompt Title..."
            className="w-full max-w-sm rounded-xl border border-transparent bg-transparent px-2.5 py-1 text-sm font-bold text-white placeholder-slate-500 focus:border-indigo-500 focus:bg-slate-800/80 focus:outline-none transition"
          />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={async () => {
              const currentFolder = folders.find((f) => f.id === folderId);
              const tempPrompt: PromptItem = {
                id: editingPrompt?.id || 'prompt-' + Math.random().toString(36).substring(2, 9),
                title: title.trim() || 'Untitled Prompt',
                description: description.trim(),
                content,
                category,
                folderId,
                tags,
                variables: extractVariables(content),
                isFavorite: editingPrompt?.isFavorite || false,
                usageCount: editingPrompt?.usageCount || 0,
                targetModel,
                createdAt: editingPrompt?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              const success = await downloadPromptAsMarkdown(tempPrompt, currentFolder?.name);
              if (success) {
                addToast({ type: 'success', title: 'Exported as Markdown (.md)', description: tempPrompt.title });
              }
            }}
            className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-emerald-300 hover:bg-slate-700 active:scale-95 transition cursor-pointer"
            title="Export Prompt as Markdown (.md)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export .md</span>
          </button>

          <button
            onClick={() => handleCopy(false)}
            className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 active:scale-95 transition"
            title="Copy Template"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Copy</span>
          </button>

          <button
            onClick={() => handleSave(false)}
            className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 active:scale-95 transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>

          {editingPrompt && (
            <button
              onClick={() => handleSave(true)}
              className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
              title="Save as new clone"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Fork</span>
            </button>
          )}

          <button
            onClick={closeEditor}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editor Tool & Action Ribbon */}
      <div className="flex items-center justify-between gap-1 border-b border-slate-800/80 bg-slate-900/60 px-3 py-1.5 text-xs overflow-x-auto no-scrollbar">
        {/* Quick Engineering Tools */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Apply Modular Skill from Catalog */}
          <button
            onClick={() => setIsComponentPickerOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/30 px-2.5 py-1 text-indigo-300 hover:bg-indigo-900/80 transition"
            title="Browse and apply modular prompt skills"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>+ Apply Skill</span>
          </button>

          {/* Quick Optimize */}
          <button
            onClick={handleOptimize}
            className="flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-800/60 px-2 py-1 text-slate-200 hover:bg-slate-700 transition"
            title="Auto-optimize prompt with reasoning, constraints, and rubric"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Optimize</span>
          </button>

          {/* Quick Simplify Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSimplifyMenu(!showSimplifyMenu)}
              className="flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-800/60 px-2 py-1 text-slate-200 hover:bg-slate-700 transition"
            >
              <Scissors className="w-3.5 h-3.5 text-sky-400" />
              <span>Simplify</span>
            </button>

            {showSimplifyMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSimplifyMenu(false)} />
                <div className="absolute left-0 top-8 z-50 w-40 rounded-xl border border-slate-700 bg-slate-900 p-1 shadow-2xl text-xs">
                  <button
                    onClick={() => handleSimplify('light')}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 hover:bg-slate-800 text-left text-slate-200"
                  >
                    <span>Light (Clean fluff)</span>
                  </button>
                  <button
                    onClick={() => handleSimplify('balanced')}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 hover:bg-slate-800 text-left text-slate-200"
                  >
                    <span>Balanced (Crisp)</span>
                  </button>
                  <button
                    onClick={() => handleSimplify('aggressive')}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 hover:bg-slate-800 text-left text-slate-200 font-semibold"
                  >
                    <span>Aggressive (Directives)</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Quick Translate Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTranslateMenu(!showTranslateMenu)}
              className="flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-800/60 px-2 py-1 text-slate-200 hover:bg-slate-700 transition"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Translate</span>
            </button>

            {showTranslateMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowTranslateMenu(false)} />
                <div className="absolute left-0 top-8 z-50 w-44 rounded-xl border border-slate-700 bg-slate-900 p-1 shadow-2xl text-xs max-h-56 overflow-y-auto">
                  {['Spanish', 'French', 'German', 'Russian', 'Chinese', 'Japanese', 'Portuguese', 'Italian', 'Korean', 'Arabic', 'Hindi'].map(
                    (lang) => (
                      <button
                        key={lang}
                        onClick={() => handleTranslate(lang)}
                        className="flex w-full items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-left text-slate-200"
                      >
                        {lang}
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>

          {/* Model Adapter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowModelMenu(!showModelMenu)}
              className="flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-800/60 px-2 py-1 text-slate-200 hover:bg-slate-700 transition"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Adapt Model</span>
            </button>

            {showModelMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowModelMenu(false)} />
                <div className="absolute left-0 top-8 z-50 w-48 rounded-xl border border-slate-700 bg-slate-900 p-1 shadow-2xl text-xs">
                  <button
                    onClick={() => handleAdapt('claude')}
                    className="flex w-full items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-left text-slate-200"
                  >
                    Claude 3.7 (XML Tags)
                  </button>
                  <button
                    onClick={() => handleAdapt('openai')}
                    className="flex w-full items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-left text-slate-200"
                  >
                    OpenAI GPT-4o (System Prompt)
                  </button>
                  <button
                    onClick={() => handleAdapt('gemini')}
                    className="flex w-full items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-left text-slate-200"
                  >
                    Google Gemini (Grounding)
                  </button>
                  <button
                    onClick={() => handleAdapt('grok')}
                    className="flex w-full items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-left text-slate-200"
                  >
                    xAI Grok (Unfiltered Wit)
                  </button>
                  <button
                    onClick={() => handleAdapt('llama')}
                    className="flex w-full items-center px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-left text-slate-200"
                  >
                    Meta Llama 3 (Headers)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* View Switcher: Editor / Variables / Live Preview / History */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('editor')}
            className={`rounded-lg px-2.5 py-1 font-medium transition ${
              activeTab === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Prompt
          </button>
          <button
            onClick={() => setActiveTab('variables')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium transition ${
              activeTab === 'variables' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <VariableIcon className="w-3 h-3" />
            <span>Vars ({detectedVariables.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium transition ${
              activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`rounded-lg px-2 py-1 transition ${
              activeTab === 'history' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Revision History"
          >
            <History className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left / Main Section */}
        <div className="flex-1 flex flex-col min-w-0 h-full p-3 sm:p-4 overflow-y-auto">
          {activeTab === 'editor' && (
            <div className="flex-1 flex flex-col gap-3 h-full">
              {/* Short description */}
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description or purpose of this prompt..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 placeholder-slate-500 focus:border-indigo-500 focus:outline-none shrink-0"
              />

              {/* Main Textarea */}
              <div className="relative flex-1 flex flex-col min-h-[320px]">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter prompt content here... Use [[variable_name]] or {{variable_name}} for dynamic inputs."
                  className={`w-full flex-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 font-mono ${fontSizeClass} text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition resize-none leading-relaxed`}
                />
              </div>

              {/* Metadata tags, folder, and category bar */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/60 text-xs shrink-0">
                {/* Category select */}
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
                  <span className="text-slate-500 text-[10px]">Category:</span>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. coding, business"
                    className="w-20 bg-transparent text-slate-200 text-xs focus:outline-none"
                  />
                </div>

                {/* Folder select */}
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
                  <FolderIcon className="w-3 h-3 text-slate-500" />
                  <select
                    value={folderId || ''}
                    onChange={(e) => setFolderId(e.target.value || null)}
                    className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-slate-200">No Folder</option>
                    {folders.map((f) => (
                      <option key={f.id} value={f.id} className="bg-slate-900 text-slate-200">
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags input */}
                <div className="flex items-center gap-1 flex-1 min-w-[160px] bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
                  <Tag className="w-3 h-3 text-slate-500" />
                  <div className="flex items-center gap-1 flex-wrap">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-0.5 rounded-md bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-300"
                      >
                        #{t}
                        <button
                          onClick={() => removeTag(t)}
                          className="hover:text-rose-400 p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tag (Enter)..."
                    className="flex-1 min-w-[80px] bg-transparent text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'variables' && (
            <div className="space-y-4 max-w-xl mx-auto w-full">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200">
                  Dynamic Variables ({detectedVariables.length})
                </h3>
                <span className="text-[11px] text-slate-400">
                  Detected automatically from <code className="text-indigo-400">[[var]]</code> or{' '}
                  <code className="text-violet-400">{'{{var}}'}</code>
                </span>
              </div>

              {detectedVariables.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-800 p-6 text-center text-xs text-slate-400">
                  No variables detected in prompt. Add placeholders like{' '}
                  <span className="text-indigo-400 font-mono">[[user_name]]</span> or{' '}
                  <span className="text-violet-400 font-mono">{'{{target_audience}}'}</span>.
                </div>
              ) : (
                <div className="space-y-3">
                  {detectedVariables.map((v) => (
                    <div
                      key={v}
                      className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono font-semibold text-indigo-400">[[{v}]]</span>
                        <span className="text-[10px] text-slate-500">Live Replace</span>
                      </div>
                      <input
                        type="text"
                        value={varValues[v] || ''}
                        onChange={(e) =>
                          setVarValues({ ...varValues, [v]: e.target.value })
                        }
                        placeholder={`Enter value for ${v}...`}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  ))}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleCopy(true)}
                      className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Substituted Prompt</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="flex-1 flex flex-col gap-3 max-w-3xl mx-auto w-full h-full">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200">Live Rendered Preview</h3>
                <button
                  onClick={() => handleCopy(true)}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Final Output</span>
                </button>
              </div>

              <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 font-mono text-xs text-slate-100 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                {previewText || <span className="text-slate-500 italic">No content to preview...</span>}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="max-w-xl mx-auto w-full space-y-3">
              <div className="pb-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200">Version History</h3>
                <p className="text-xs text-slate-400">Automatic snapshots saved on each edit</p>
              </div>

              {historyEntries.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">No previous revisions yet.</p>
              ) : (
                <div className="space-y-2">
                  {historyEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-slate-200">{entry.title}</p>
                        <p className="text-[11px] text-slate-400">
                          {new Date(entry.timestamp).toLocaleString()} {entry.note ? `· ${entry.note}` : ''}
                        </p>
                      </div>

                      <button
                        onClick={() => restoreRevision(entry)}
                        className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:text-white transition"
                      >
                        <RotateCcw className="w-3 h-3 text-indigo-400" />
                        <span>Restore</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modular Skill Inserter Modal */}
      <ComponentInserterModal
        currentContent={content}
        onApplySkill={(skillId) => {
          const { prompt: transformed } = applySkill(content, skillId);
          setContent(transformed);
        }}
        onInsert={(snip) => setContent((prev) => prev + snip)}
      />
    </div>
  );
};
