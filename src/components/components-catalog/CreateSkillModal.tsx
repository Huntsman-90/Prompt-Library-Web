import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../../data/categories';
import { saveUserSkill, deleteUserSkill, createUserSkillTransform } from '../../skills/customSkillsManager';
import type { UserSkill } from '../../types';
import { useUIStore } from '../../store/useUIStore';
import {
  X,
  Sparkles,
  Zap,
  Play,
  Trash2,
  Save,
  Code,
  Tag,
  FileText,
  Layers,
  HelpCircle,
  Plus,
  Sliders,
  AlignLeft,
  ArrowDownToLine,
  ArrowUpToLine,
  LayoutTemplate,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Wand2,
  Braces,
} from 'lucide-react';

interface CreateSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSkill?: UserSkill | null;
  defaultCategoryId?: string;
  onSkillSaved?: (skill: UserSkill) => void;
}

const PRESET_TEST_TASKS = [
  'Audit PostgreSQL schema for slow queries and missing indexes',
  'Implement zero-downtime Redis caching for checkout sessions',
  'Design high-converting landing page copy for B2B SaaS',
  'Investigate production API latency spike and error cascade',
];

const STARTER_TEMPLATES = [
  {
    name: 'Directive Rules',
    content: `- **Strict Verification**: Thoroughly inspect {{task}} against edge cases, boundary violations, and performance bottlenecks.
- **Architectural Invariants**: Ensure deterministic validation, robust error handling, and zero state drift.
- **Actionable Deliverables**: Output production-ready specifications with complete implementation code.`,
  },
  {
    name: 'Structured Section',
    content: `### Security & Threat Analysis
1. Identify potential attack surfaces and injection risks in {{task}}.
2. Detail mitigation strategies adhering to OWASP standards.
3. Validate all cryptographic implementations and input sanitization routines.`,
  },
  {
    name: 'Role & Execution Protocol',
    content: `You are a Principal Staff Engineer specialized in {{task}}.
Analyze the problem methodically:
1. First Principles Decomposition: Break down core constraints.
2. Architecture Blueprint: Provide high-fidelity design.
3. Production Code: Implement modular, idiomatic, fully typed solutions.`,
  },
  {
    name: 'Full Prompt Wrapper',
    content: `{{prompt}}

### High-Rigor Quality Gate:
- Enforce strict typing and idiomatic standards.
- Benchmark complexity (Time & Space).
- Provide automated regression test suites.`,
  },
];

export const CreateSkillModal: React.FC<CreateSkillModalProps> = ({
  isOpen,
  onClose,
  initialSkill,
  defaultCategoryId = 'my_skills',
  onSkillSaved,
}) => {
  const { addToast } = useUIStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Core & Simple Fields (mirrors Prompt Creator freedom)
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [categorySelection, setCategorySelection] = useState(defaultCategoryId);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [transformationDirectives, setTransformationDirectives] = useState('');

  // Optional / Advanced Fields
  const [name, setName] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [transformationMode, setTransformationMode] = useState<'freeform' | 'section' | 'template' | 'prepend' | 'append'>('freeform');
  const [customSectionTitle, setCustomSectionTitle] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Live Test State
  const [testTask, setTestTask] = useState(PRESET_TEST_TASKS[0]);
  const [testResult, setTestResult] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [copiedTestResult, setCopiedTestResult] = useState(false);

  useEffect(() => {
    if (initialSkill) {
      setName(initialSkill.name || '');
      setDisplayName(initialSkill.displayName || '');
      
      const isKnownCategory = CATEGORIES.some((c) => c.id === initialSkill.categoryId);
      if (isKnownCategory) {
        setCategorySelection(initialSkill.categoryId);
        setCustomCategoryInput('');
      } else {
        setCategorySelection('custom_new');
        setCustomCategoryInput(initialSkill.customCategoryName || initialSkill.categoryId);
      }

      setDescription(initialSkill.description || '');
      setTagsInput(initialSkill.tags ? initialSkill.tags.join(', ') : '');
      setTransformationMode(initialSkill.transformationMode || 'freeform');
      setCustomSectionTitle(initialSkill.customSectionTitle || '');
      setTransformationDirectives(initialSkill.transformationDirectives || '');
      setShowAdvanced(!!(initialSkill.transformationMode && initialSkill.transformationMode !== 'freeform') || !!initialSkill.customSectionTitle);
    } else {
      setName('');
      setDisplayName('');
      setCategorySelection(defaultCategoryId);
      setCustomCategoryInput('');
      setDescription('');
      setTagsInput('');
      setTransformationMode('freeform');
      setCustomSectionTitle('');
      setShowAdvanced(false);
      setTransformationDirectives(
        `- **Verification Standard**: Rigorously analyze {{task}} against edge cases and system failure modes.\n- **Contract Invariant**: Enforce strict validation rules and mathematical determinism.\n- **Actionable Output**: Deliver production-ready deliverables with clear implementation steps.`
      );
    }
    setTestResult('');
  }, [initialSkill, defaultCategoryId, isOpen]);

  if (!isOpen) return null;

  const handleInsertToken = (token: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);
      const newText = before + token + after;
      setTransformationDirectives(newText);
      
      // Reset cursor position after token insertion
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + token.length, start + token.length);
      }, 10);
    } else {
      setTransformationDirectives((prev) => (prev ? `${prev} ${token}` : token));
    }
  };

  const handleApplyStarterTemplate = (content: string) => {
    setTransformationDirectives(content);
    addToast({ type: 'info', title: 'Starter template applied' });
  };

  const handleTestRun = (overrideTask?: string) => {
    const taskToRun = overrideTask !== undefined ? overrideTask : testTask;
    if (!transformationDirectives.trim()) {
      addToast({ type: 'error', title: 'Please provide skill content/rules to test' });
      return;
    }

    setIsTesting(true);
    try {
      const targetCatId = categorySelection === 'custom_new' ? (customCategoryInput.trim() || 'my_skills') : categorySelection;

      const mockSkill: UserSkill = {
        id: initialSkill?.id || 'temp-test',
        name: name || (displayName.replace(/[^a-zA-Z0-9]/g, '') + 'Skill') || 'CustomSkill',
        displayName: displayName || customSectionTitle || 'Custom Skill',
        categoryId: targetCatId,
        customCategoryName: categorySelection === 'custom_new' ? customCategoryInput.trim() : undefined,
        description: description || 'Custom prompt skill',
        tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
        transformationDirectives,
        transformationMode,
        customSectionTitle: customSectionTitle || displayName,
        isUserCreated: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const transformFn = createUserSkillTransform(mockSkill);
      const transformed = transformFn(taskToRun);
      setTestResult(transformed);
      addToast({ type: 'success', title: 'Transformation preview generated!' });
    } catch (err: any) {
      addToast({ type: 'error', title: 'Transformation test failed', description: err.message });
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopyTestResult = async () => {
    if (!testResult) return;
    try {
      await navigator.clipboard.writeText(testResult);
      setCopiedTestResult(true);
      addToast({ type: 'success', title: 'Preview copied to clipboard!' });
      setTimeout(() => setCopiedTestResult(false), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy result' });
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!displayName.trim()) {
      addToast({ type: 'error', title: 'Display Name is required' });
      return;
    }

    if (!transformationDirectives.trim()) {
      addToast({ type: 'error', title: 'Skill transformation rules are required' });
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    const targetCatId = categorySelection === 'custom_new' 
      ? (customCategoryInput.trim().toLowerCase().replace(/\s+/g, '_') || 'my_skills')
      : categorySelection;

    try {
      const computedIdentifier = name.trim() || displayName.replace(/[^a-zA-Z0-9]/g, '') + 'Skill';

      const saved = await saveUserSkill({
        id: initialSkill?.id,
        name: computedIdentifier,
        displayName: displayName.trim(),
        categoryId: targetCatId,
        customCategoryName: categorySelection === 'custom_new' ? customCategoryInput.trim() : undefined,
        description: description.trim() || 'Custom user-created prompt engineering skill.',
        tags: tags.length > 0 ? tags : ['custom'],
        transformationDirectives: transformationDirectives.trim(),
        transformationMode,
        customSectionTitle: customSectionTitle.trim() || displayName.trim(),
        iconName: 'Zap',
      });

      addToast({
        type: 'success',
        title: initialSkill ? 'Skill Updated!' : 'Skill Saved to Catalog!',
        description: `${saved.displayName} is ready to use in Catalog & all AI tools`,
      });

      if (onSkillSaved) onSkillSaved(saved);
      onClose();
    } catch (err: any) {
      addToast({ type: 'error', title: 'Failed to save skill', description: err.message });
    }
  };

  const handleDelete = async () => {
    if (!initialSkill) return;
    if (!confirm(`Are you sure you want to delete "${initialSkill.displayName}"?`)) return;

    try {
      await deleteUserSkill(initialSkill.id);
      addToast({
        type: 'success',
        title: 'Skill Deleted',
        description: `${initialSkill.displayName} was removed from catalog.`,
      });
      onClose();
    } catch (err: any) {
      addToast({ type: 'error', title: 'Failed to delete skill', description: err.message });
    }
  };

  // Keyboard shortcut: Cmd/Ctrl + S to save, Cmd/Ctrl + Enter to test
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleTestRun();
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in"
    >
      <div className="flex flex-col w-full max-w-4xl max-h-[94vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-4 sm:px-6 py-3.5 bg-slate-900/95">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {initialSkill ? 'Edit Custom Skill' : 'Custom Skill Constructor'}
                </h2>
                <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Freeform Studio
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Design custom prompt skills, transformation rules, or reusable templates with complete creative freedom.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          {/* Main Top Row: Name, Category, Description */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            {/* Display Name */}
            <div className="sm:col-span-6">
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                Display Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  if (!name || name.endsWith('Skill')) {
                    setName(e.target.value.replace(/[^a-zA-Z0-9]/g, '') + 'Skill');
                  }
                  if (!customSectionTitle) {
                    setCustomSectionTitle(e.target.value);
                  }
                }}
                placeholder="e.g. OWASP Security Audit, Fast Summarizer..."
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 focus:outline-none transition"
              />
            </div>

            {/* Category Selector */}
            <div className="sm:col-span-6">
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Category
              </label>
              <div className="flex gap-2">
                <select
                  value={categorySelection}
                  onChange={(e) => setCategorySelection(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none transition"
                >
                  <option value="my_skills">★ My Skills (User Custom Section)</option>
                  <optgroup label="System Categories">
                    {CATEGORIES.filter((c) => c.id !== 'my_skills').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                  <option value="custom_new">+ Create New Category...</option>
                </select>

                {categorySelection === 'custom_new' && (
                  <input
                    type="text"
                    value={customCategoryInput}
                    onChange={(e) => setCustomCategoryInput(e.target.value)}
                    placeholder="New category name..."
                    required
                    className="w-1/2 rounded-xl border border-amber-500/50 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* Description (Full width one-liner) */}
            <div className="sm:col-span-12">
              <label className="block text-slate-300 font-semibold mb-1.5">
                Short Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Conducts exhaustive threat modeling, API authentication audits, and input sanitation."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Core Spacious Freeform Editor (Prompt Creator Style) */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="block text-slate-200 font-semibold flex items-center gap-1.5 text-xs">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Skill Transformation Rules & Prompt Body <span className="text-rose-400">*</span>
              </label>

              {/* Quick Placeholder Insertion Toolbar */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Braces className="w-3 h-3 text-amber-400" />
                  Insert Token:
                </span>
                <button
                  type="button"
                  onClick={() => handleInsertToken('{{task}}')}
                  className="rounded-lg bg-amber-950/70 border border-amber-500/40 hover:bg-amber-900/90 px-2 py-0.5 text-[11px] text-amber-300 font-mono transition cursor-pointer"
                  title="Dynamic task extracted from user prompt"
                >
                  {"{{task}}"}
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertToken('{{prompt}}')}
                  className="rounded-lg bg-indigo-950/70 border border-indigo-500/40 hover:bg-indigo-900/90 px-2 py-0.5 text-[11px] text-indigo-300 font-mono transition cursor-pointer"
                  title="Full incoming prompt text"
                >
                  {"{{prompt}}"}
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertToken('{{input}}')}
                  className="rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 px-2 py-0.5 text-[11px] text-emerald-300 font-mono transition cursor-pointer"
                  title="Raw input content"
                >
                  {"{{input}}"}
                </button>
              </div>
            </div>

            {/* Quick Starters Inspiration Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
              <span className="text-slate-500 shrink-0 flex items-center gap-1">
                <Wand2 className="w-3 h-3 text-slate-400" />
                Starters:
              </span>
              {STARTER_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyStarterTemplate(tmpl.content)}
                  className="shrink-0 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:text-amber-200 px-2.5 py-1 text-slate-400 transition cursor-pointer"
                >
                  {tmpl.name}
                </button>
              ))}
            </div>

            {/* Large Freeform Textarea */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                rows={7}
                value={transformationDirectives}
                onChange={(e) => setTransformationDirectives(e.target.value)}
                placeholder="Write whatever transformation logic, directives, guidelines, or prompt template you want...&#10;&#10;Examples:&#10;- Strict Verification: Rigorously analyze {{task}} against edge cases.&#10;- Ensure 100% type-safety and architectural compliance.&#10;- Deliver modular, production-ready code with complete tests."
                required
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 focus:outline-none leading-relaxed transition"
              />
              <div className="absolute right-3 bottom-3 text-[10px] text-slate-500 pointer-events-none bg-slate-950/80 px-1.5 py-0.5 rounded">
                {transformationDirectives.length} chars | {transformationDirectives.split('\n').length} lines
              </div>
            </div>
          </div>

          {/* Optional Advanced Settings (Collapsible Accordion) */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex w-full items-center justify-between p-3 text-left text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Optional Advanced Configuration (Tags, Code Identifier & Structure Mode)</span>
              </div>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdvanced && (
              <div className="p-3.5 pt-1 space-y-3.5 border-t border-slate-800/60 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Identifier */}
                  <div>
                    <label className="block text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                      <Code className="w-3 h-3 text-indigo-400" />
                      Identifier (Skill Code)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. OwaspSecurityAuditSkill"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:outline-none font-mono text-xs"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-slate-400" />
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="e.g. security, owasp, api, audit"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:outline-none text-xs"
                    />
                  </div>
                </div>

                {/* Structure Mode Override (Optional) */}
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5 flex items-center justify-between">
                    <span>Transformation Engine Mode</span>
                    <span className="text-[10px] text-slate-500">Freeform automatically adapts to any prompt style</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {[
                      { id: 'freeform', label: 'Freeform (Auto)', desc: 'Smart interpolation & merging' },
                      { id: 'section', label: 'Structured Section', desc: 'Markdown section injection' },
                      { id: 'template', label: 'Template Wrapper', desc: 'Full template wrap' },
                      { id: 'prepend', label: 'Prepend', desc: 'Injects at top' },
                      { id: 'append', label: 'Append', desc: 'Appends at bottom' },
                    ].map((modeItem) => (
                      <button
                        key={modeItem.id}
                        type="button"
                        onClick={() => setTransformationMode(modeItem.id as any)}
                        className={`flex flex-col items-start p-2 rounded-xl border text-left transition ${
                          transformationMode === modeItem.id
                            ? 'border-amber-500/80 bg-amber-950/40 text-amber-200 shadow'
                            : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="font-semibold text-[11px] mb-0.5">{modeItem.label}</span>
                        <span className="text-[9px] text-slate-500 leading-tight">{modeItem.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Section Title (When in Section mode or custom header desired) */}
                {transformationMode === 'section' && (
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      Custom Section Header Title
                    </label>
                    <input
                      type="text"
                      value={customSectionTitle}
                      onChange={(e) => setCustomSectionTitle(e.target.value)}
                      placeholder="e.g. Security Threat Model & OWASP Invariants"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:outline-none text-xs"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Interactive Live Transformation Test Sandbox */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                Live Transformation Test Sandbox
              </span>
              <button
                type="button"
                onClick={() => handleTestRun()}
                disabled={isTesting}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition shadow active:scale-95 cursor-pointer"
                title="Run transformation with current rules (Ctrl+Enter)"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Test Transformation</span>
              </button>
            </div>

            {/* Quick Test Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[10px]">
              <span className="text-slate-500 shrink-0">Sample inputs:</span>
              {PRESET_TEST_TASKS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setTestTask(preset);
                    handleTestRun(preset);
                  }}
                  className="shrink-0 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 px-2 py-0.5 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  {preset.slice(0, 32)}...
                </button>
              ))}
            </div>

            <input
              type="text"
              value={testTask}
              onChange={(e) => setTestTask(e.target.value)}
              placeholder="Type any prompt or request to test transformation..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />

            {testResult && (
              <div className="mt-2 rounded-xl border border-slate-800 bg-slate-900/95 p-3 font-mono text-[11px] text-slate-200 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed shadow-inner relative group">
                <div className="absolute right-2 top-2">
                  <button
                    type="button"
                    onClick={handleCopyTestResult}
                    className="flex items-center gap-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 px-2 py-1 text-[10px] text-slate-300 hover:text-white transition shadow"
                  >
                    {copiedTestResult ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTestResult ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                {testResult}
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            {initialSkill ? (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-950/40 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-900/60 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Skill</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-800 bg-slate-800/80 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:from-amber-400 hover:to-rose-500 transition active:scale-95 cursor-pointer"
                title="Save skill (Ctrl+S)"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{initialSkill ? 'Update Skill' : 'Save Skill to Catalog'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
