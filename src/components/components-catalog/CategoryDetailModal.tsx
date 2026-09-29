import React, { useState } from 'react';
import type { CategoryMeta } from '../../types';
import { useUIStore } from '../../store/useUIStore';
import { db } from '../../db/database';
import { getSkillsByCategory, applySkill, type SkillDefinition } from '../../skills/skillsRegistry';
import {
  X,
  Search,
  Copy,
  Check,
  Plus,
  Zap,
  Sparkles,
  Layers,
  ArrowRight,
  Code2,
} from 'lucide-react';

interface CategoryDetailModalProps {
  category: CategoryMeta;
  onClose: () => void;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({ category, onClose }) => {
  const { openEditor, editingPrompt, addToast } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPreviewId, setExpandedPreviewId] = useState<string | null>(null);

  const skills = getSkillsByCategory(category.id);

  const filteredSkills = skills.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.displayName.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleApplyToActivePrompt = async (skill: SkillDefinition) => {
    if (editingPrompt) {
      const { prompt: transformed } = applySkill(editingPrompt.content, skill.id);
      openEditor({
        ...editingPrompt,
        content: transformed,
        updatedAt: new Date().toISOString(),
      });
      await db.prompts.update(editingPrompt.id, {
        content: transformed,
        updatedAt: new Date().toISOString(),
      });
      addToast({
        type: 'success',
        title: `${skill.name} Applied!`,
        description: 'Transformed and enriched active prompt in editor',
      });
      onClose();
    } else {
      // If no active prompt, create one powered by this skill
      handleCreateNewWithSkill(skill);
    }
  };

  const handleCreateNewWithSkill = (skill: SkillDefinition) => {
    const baseSample = `### Goal & Task Context\nExecute domain directive with high technical fidelity.\n\n### Requirements\n- Provide exhaustive analysis and production deliverables.`;
    const transformed = skill.transform(baseSample);

    onClose();
    openEditor({
      id: 'prompt-' + Math.random().toString(36).substring(2, 9),
      title: `${skill.displayName} Prompt`,
      description: skill.description,
      content: transformed,
      category: category.id,
      tags: [...skill.tags, 'skill-transformed'],
      variables: [],
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    addToast({
      type: 'success',
      title: `Prompt Created with ${skill.name}`,
      description: 'Ready to edit and deploy',
    });
  };

  const handleCopySkillLogic = async (skill: SkillDefinition) => {
    try {
      const baseSample = `### Goal & Task Context\nExecute domain directive with high technical fidelity.`;
      const transformed = skill.transform(baseSample);
      await navigator.clipboard.writeText(transformed);
      setCopiedId(skill.id);
      addToast({
        type: 'success',
        title: 'Skill transformation copied',
        description: skill.name,
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-3xl h-[90vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr ${category.color} shadow-md`}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                {category.name}
                <span className="text-xs font-normal text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-500/30">
                  {skills.length} Active Skills
                </span>
              </h2>
              <p className="text-xs text-slate-400 line-clamp-1">{category.shortDesc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search inside Category Skills */}
        <div className="p-3 border-b border-slate-800 bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${skills.length} skills in ${category.name} (e.g. ${skills[0]?.name || 'name'})...`}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Active Skills List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
          {filteredSkills.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No matching skills found in this category.
            </div>
          ) : (
            filteredSkills.map((skill) => {
              const isExpanded = expandedPreviewId === skill.id;
              const samplePreview = skill.transform('### Task Objective\nExecute directive with production standards.');

              return (
                <div
                  key={skill.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-indigo-500/40"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 rounded-lg">
                          {skill.name}
                        </span>
                        {skill.subSkills && skill.subSkills.length > 0 && (
                          <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            Composite ({skill.subSkills.length} Sub-skills)
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-slate-100">{skill.displayName}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{skill.description}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-start">
                      {/* Apply Skill button */}
                      <button
                        onClick={() => handleApplyToActivePrompt(skill)}
                        className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:from-indigo-500 hover:to-violet-500 transition active:scale-95"
                        title={editingPrompt ? 'Transform active prompt with this skill' : 'Create new prompt powered by this skill'}
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                        <span>{editingPrompt ? 'Apply to Prompt' : 'Create with Skill'}</span>
                      </button>

                      {/* Open as new */}
                      {editingPrompt && (
                        <button
                          onClick={() => handleCreateNewWithSkill(skill)}
                          className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition"
                          title="Open as separate prompt"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">New</span>
                        </button>
                      )}

                      {/* Copy logic */}
                      <button
                        onClick={() => handleCopySkillLogic(skill)}
                        className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800/80 p-1.5 text-slate-300 hover:bg-slate-700 transition"
                        title="Copy transformed output preview"
                      >
                        {copiedId === skill.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Sub-skills list for composite */}
                  {skill.subSkills && skill.subSkills.length > 0 && (
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                      <span className="text-slate-500 font-medium">Orchestrates:</span>
                      {skill.subSkills.map((sub) => (
                        <span key={sub} className="font-mono text-[10px] text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-500/20">
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Preview toggle */}
                  <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => setExpandedPreviewId(isExpanded ? null : skill.id)}
                      className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 transition font-medium"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{isExpanded ? 'Hide transformation preview' : 'View transformation preview'}</span>
                    </button>

                    <div className="flex flex-wrap gap-1">
                      {skill.tags.map((t) => (
                        <span key={t} className="rounded-md bg-slate-800/80 px-1.5 py-0.5 text-[9px] text-slate-400">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Transformation Blueprint Preview */}
                  {isExpanded && (
                    <div className="mt-2.5 rounded-xl border border-slate-800 bg-slate-900/90 p-3 font-mono text-[11px] text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                      {samplePreview}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
