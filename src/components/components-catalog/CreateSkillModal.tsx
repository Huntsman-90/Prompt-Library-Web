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
  Check,
  Code,
  Tag,
  FileText,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface CreateSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSkill?: UserSkill | null;
  defaultCategoryId?: string;
  onSkillSaved?: (skill: UserSkill) => void;
}

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
  const [categoryId, setCategoryId] = useState(defaultCategoryId);
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [targetSection, setTargetSection] = useState<'protocol' | 'role' | 'constraints' | 'output_format' | 'context'>('protocol');
  const [transformationDirectives, setTransformationDirectives] = useState('');

  // Live Test State
  const [testTask, setTestTask] = useState('Audit PostgreSQL schema for slow queries and missing indexes');
  const [testResult, setTestResult] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (initialSkill) {
      setName(initialSkill.name || '');
      setDisplayName(initialSkill.displayName || '');
      setCategoryId(initialSkill.categoryId || defaultCategoryId);
      setDescription(initialSkill.description || '');
      setTagsInput(initialSkill.tags ? initialSkill.tags.join(', ') : '');
      setTargetSection(initialSkill.targetSection || 'protocol');
      setTransformationDirectives(initialSkill.transformationDirectives || '');
    } else {
      setName('');
      setDisplayName('');
      setCategoryId(defaultCategoryId);
      setDescription('');
      setTagsInput('');
      setTargetSection('protocol');
      setTransformationDirectives(
        `- **Rule 1**: Enforce rigorous domain verification for {{task}}.\n- **Rule 2**: Identify latent failure modes and provide hardened alternatives.\n- **Rule 3**: Deliver actionable, production-ready specifications.`
      );
    }
    setTestResult('');
  }, [initialSkill, defaultCategoryId, isOpen]);

  if (!isOpen) return null;

  const handleTestRun = () => {
    if (!transformationDirectives.trim()) {
      addToast({ type: 'error', title: 'Please provide transformation directives' });
      return;
    }

    setIsTesting(true);
    try {
      const mockSkill: UserSkill = {
        id: initialSkill?.id || 'temp-test',
        name: name || 'TestSkill',
        displayName: displayName || 'Test Skill',
        categoryId,
        description,
        tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
        transformationDirectives,
        targetSection,
        isUserCreated: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const transformFn = createUserSkillTransform(mockSkill);
      const transformed = transformFn(testTask);
      setTestResult(transformed);
      addToast({ type: 'success', title: 'Transformation tested successfully!' });
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
      addToast({ type: 'error', title: 'Transformation directives are required' });
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    try {
      const saved = await saveUserSkill({
        id: initialSkill?.id,
        name: name.trim() || displayName.replace(/\s+/g, '') + 'Skill',
        displayName: displayName.trim(),
        categoryId: categoryId || 'my_skills',
        description: description.trim() || 'Custom user-created skill.',
        tags: tags.length > 0 ? tags : ['custom'],
        transformationDirectives: transformationDirectives.trim(),
        targetSection,
        iconName: 'Zap',
      });

      addToast({
        type: 'success',
        title: initialSkill ? 'Skill Updated!' : 'Skill Created!',
        description: `${saved.displayName} is now active in Catalog & Tools`,
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
        description: `${initialSkill.displayName} was removed.`,
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
                {initialSkill ? 'Edit Custom Skill' : 'Create Custom Skill'}
                <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-wider">
                  User Ability
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Design custom prompt transformation rules and deploy them across all tools
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

        {/* Content Form */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          {/* Grid: Display Name & Identifier */}
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
                    setName(e.target.value.replace(/\s+/g, '') + 'Skill');
                  }
                }}
                placeholder="e.g. API Security Auditor"
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-indigo-400" />
                Identifier Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. ApiSecurityAuditorSkill"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Grid: Category & Target Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Target Section Type
              </label>
              <select
                value={targetSection}
                onChange={(e) => setTargetSection(e.target.value as any)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              >
                <option value="protocol">Execution Protocol / Step (Methodology)</option>
                <option value="role">Role & Authority Definition</option>
                <option value="constraints">Guardrails & Negative Invariants</option>
                <option value="output_format">Output Format & Deliverable Spec</option>
                <option value="context">Task Context & Scope Boundaries</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Short Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Injects comprehensive API threat modeling and OWASP validation rules."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Tags */}
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

          {/* Transformation Directives */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-slate-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Transformation Directives / Rules *
              </label>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-slate-500" />
                Use <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300 font-mono">{"{{task}}"}</code> for dynamic task injection
              </span>
            </div>
            <textarea
              rows={5}
              value={transformationDirectives}
              onChange={(e) => setTransformationDirectives(e.target.value)}
              placeholder="- **Protocol 1**: Conduct rigorous validation for {{task}}.\n- **Protocol 2**: Eliminate unhandled error states.\n- **Protocol 3**: Output exhaustive verification checklist."
              required
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-100 placeholder-slate-600 focus:border-amber-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Live Interactive Test Runner */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                Interactive Test Sandbox
              </span>
              <button
                type="button"
                onClick={handleTestRun}
                disabled={isTesting}
                className="flex items-center gap-1 rounded-xl bg-emerald-600/90 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500 transition shadow"
              >
                <Play className="w-3 h-3 fill-current" />
                Run Test
              </button>
            </div>

            <input
              type="text"
              value={testTask}
              onChange={(e) => setTestTask(e.target.value)}
              placeholder="Enter sample prompt or task to test transformation..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />

            {testResult && (
              <div className="mt-2 rounded-xl border border-slate-800 bg-slate-900/90 p-3 font-mono text-[11px] text-slate-300 whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
                {testResult}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            {initialSkill ? (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-950/40 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-900/60 transition"
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
                className="rounded-xl border border-slate-800 bg-slate-800/80 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:from-amber-400 hover:to-rose-500 transition active:scale-95"
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
