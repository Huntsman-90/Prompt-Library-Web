import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../../data/categories';
import { saveUserSkill, deleteUserSkill } from '../../skills/customSkillsManager';
import { createUserSkillTransform } from '../../skills/customSkillsManager';
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

export const CreateSkillModal: React.FC<CreateSkillModalProps> = ({
  isOpen,
  onClose,
  initialSkill,
  defaultCategoryId = 'my_skills',
  onSkillSaved,
}) => {
  const { addToast } = useUIStore();

  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [categorySelection, setCategorySelection] = useState(defaultCategoryId);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  
  // Transformation Architecture
  const [transformationMode, setTransformationMode] = useState<'section' | 'template' | 'prepend' | 'append' | 'freeform'>('section');
  const [customSectionTitle, setCustomSectionTitle] = useState('');
  const [transformationDirectives, setTransformationDirectives] = useState('');

  // Live Test State
  const [testTask, setTestTask] = useState('Audit PostgreSQL schema for slow queries and missing indexes');
  const [testResult, setTestResult] = useState('');
  const [isTesting, setIsTesting] = useState(false);

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
      setTransformationMode(initialSkill.transformationMode || 'section');
      setCustomSectionTitle(initialSkill.customSectionTitle || initialSkill.displayName || '');
      setTransformationDirectives(initialSkill.transformationDirectives || '');
    } else {
      setName('');
      setDisplayName('');
      setCategorySelection(defaultCategoryId);
      setCustomCategoryInput('');
      setDescription('');
      setTagsInput('');
      setTransformationMode('section');
      setCustomSectionTitle('');
      setTransformationDirectives(
        `- **Verification Standard**: Rigorously analyze {{task}} against edge cases and system failure modes.\n- **Contract Invariant**: Enforce strict validation rules and mathematical determinism.\n- **Actionable Output**: Deliver production-ready deliverables with clear implementation steps.`
      );
    }
    setTestResult('');
  }, [initialSkill, defaultCategoryId, isOpen]);

  if (!isOpen) return null;

  const handleInsertToken = (token: string) => {
    setTransformationDirectives((prev) => `${prev} ${token}`);
  };

  const handleTestRun = (overrideTask?: string) => {
    const taskToRun = overrideTask !== undefined ? overrideTask : testTask;
    if (!transformationDirectives.trim()) {
      addToast({ type: 'error', title: 'Please provide transformation rules/content' });
      return;
    }

    setIsTesting(true);
    try {
      const targetCatId = categorySelection === 'custom_new' ? (customCategoryInput.trim() || 'my_skills') : categorySelection;

      const mockSkill: UserSkill = {
        id: initialSkill?.id || 'temp-test',
        name: name || 'CustomSkill',
        displayName: displayName || customSectionTitle || 'Custom Skill',
        categoryId: targetCatId,
        customCategoryName: categorySelection === 'custom_new' ? customCategoryInput.trim() : undefined,
        description,
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      addToast({ type: 'error', title: 'Display Name is required' });
      return;
    }

    if (!transformationDirectives.trim()) {
      addToast({ type: 'error', title: 'Transformation directives/rules are required' });
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
      const saved = await saveUserSkill({
        id: initialSkill?.id,
        name: name.trim() || displayName.replace(/[^a-zA-Z0-9]/g, '') + 'Skill',
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
        title: initialSkill ? 'Skill Updated!' : 'Skill Created!',
        description: `${saved.displayName} is now available in Catalog & all AI tools`,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-3xl max-h-[92vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                {initialSkill ? 'Edit Custom Skill' : 'Custom Skill Constructor'}
                <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-wider">
                  Unconstrained
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Design custom prompt transformation logic, custom sections, or full prompt templates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          {/* Row 1: Display Name & Identifier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                Display Name *
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
                placeholder="e.g. OWASP Security Audit"
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-indigo-400" />
                Identifier (Skill Code)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. OwaspSecurityAuditSkill"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Row 2: Category Selector with Custom Category Support */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Category Destination
              </label>
              <select
                value={categorySelection}
                onChange={(e) => setCategorySelection(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              >
                <option value="my_skills">★ My Skills (User Custom Section)</option>
                <optgroup label="System Categories">
                  {CATEGORIES.filter((c) => c.id !== 'my_skills').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
                <option value="custom_new">+ Create New Custom Category...</option>
              </select>
            </div>

            {categorySelection === 'custom_new' ? (
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  New Category Name *
                </label>
                <input
                  type="text"
                  value={customCategoryInput}
                  onChange={(e) => setCustomCategoryInput(e.target.value)}
                  placeholder="e.g. DevSecOps, Healthcare, Finance..."
                  required
                  className="w-full rounded-xl border border-amber-500/50 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. security, owasp, api, audit"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Row 3: Transformation Mode Selector */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Transformation Logic & Structure Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setTransformationMode('section')}
                className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition ${
                  transformationMode === 'section'
                    ? 'border-amber-500 bg-amber-950/40 text-amber-200 shadow'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs mb-0.5">
                  <AlignLeft className="w-3.5 h-3.5 text-amber-400" />
                  Structured Section
                </div>
                <span className="text-[10px] text-slate-400 leading-tight">
                  Adds custom Markdown section with any header
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTransformationMode('template')}
                className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition ${
                  transformationMode === 'template'
                    ? 'border-amber-500 bg-amber-950/40 text-amber-200 shadow'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs mb-0.5">
                  <LayoutTemplate className="w-3.5 h-3.5 text-indigo-400" />
                  Full Template
                </div>
                <span className="text-[10px] text-slate-400 leading-tight">
                  Wraps entire prompt with custom schema
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTransformationMode('prepend')}
                className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition ${
                  transformationMode === 'prepend'
                    ? 'border-amber-500 bg-amber-950/40 text-amber-200 shadow'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs mb-0.5">
                  <ArrowUpToLine className="w-3.5 h-3.5 text-emerald-400" />
                  Prepend Block
                </div>
                <span className="text-[10px] text-slate-400 leading-tight">
                  Injects text block at top of prompt
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTransformationMode('append')}
                className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition ${
                  transformationMode === 'append'
                    ? 'border-amber-500 bg-amber-950/40 text-amber-200 shadow'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs mb-0.5">
                  <ArrowDownToLine className="w-3.5 h-3.5 text-pink-400" />
                  Append Block
                </div>
                <span className="text-[10px] text-slate-400 leading-tight">
                  Appends constraints or format at bottom
                </span>
              </button>
            </div>
          </div>

          {/* Arbitrary Custom Section Title (When in Section Mode) */}
          {transformationMode === 'section' && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Custom Section Header (Freeform Title)
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  You can specify any header title
                </span>
              </label>
              <input
                type="text"
                value={customSectionTitle}
                onChange={(e) => setCustomSectionTitle(e.target.value)}
                placeholder="e.g. Security Threat Model & OWASP Invariants"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Short Skill Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Conducts exhaustive threat modeling, API authentication audits, and input sanitation."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Transformation Directives / Template Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-slate-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Skill Transformation Rules & Directives *
              </label>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400 mr-1">Insert placeholder:</span>
                <button
                  type="button"
                  onClick={() => handleInsertToken('{{task}}')}
                  className="rounded bg-slate-800 hover:bg-slate-700 px-1.5 py-0.5 text-[10px] text-amber-300 font-mono"
                  title="Dynamic task extracted from user prompt"
                >
                  {"{{task}}"}
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertToken('{{prompt}}')}
                  className="rounded bg-slate-800 hover:bg-slate-700 px-1.5 py-0.5 text-[10px] text-indigo-300 font-mono"
                  title="Full prompt text"
                >
                  {"{{prompt}}"}
                </button>
              </div>
            </div>
            <textarea
              rows={5}
              value={transformationDirectives}
              onChange={(e) => setTransformationDirectives(e.target.value)}
              placeholder="- **Rule 1**: Validate all inputs against schemas.\n- **Rule 2**: Identify vulnerabilities in {{task}}.\n- **Rule 3**: Deliver concrete fixes."
              required
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Live Interactive Sandbox with Presets */}
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
                className="flex items-center gap-1 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 px-3 py-1 text-xs font-semibold text-white transition shadow active:scale-95 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                Test Transformation
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
                  className="shrink-0 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 px-2 py-0.5 text-slate-300 hover:text-white transition"
                >
                  {preset.slice(0, 28)}...
                </button>
              ))}
            </div>

            <input
              type="text"
              value={testTask}
              onChange={(e) => setTestTask(e.target.value)}
              placeholder="Type any prompt or request to test..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />

            {testResult && (
              <div className="mt-2 rounded-xl border border-slate-800 bg-slate-900/95 p-3 font-mono text-[11px] text-slate-200 whitespace-pre-wrap max-h-44 overflow-y-auto leading-relaxed shadow-inner">
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
                Delete Skill
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
              >
                <Save className="w-3.5 h-3.5" />
                {initialSkill ? 'Update Skill' : 'Save Skill to Catalog'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
