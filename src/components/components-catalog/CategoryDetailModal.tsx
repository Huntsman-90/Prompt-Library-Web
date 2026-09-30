import React, { useState, useEffect } from 'react';
import type { CategoryMeta, UserSkill } from '../../types';
import { useUIStore } from '../../store/useUIStore';
import { db } from '../../db/database';
import { getSkillsByCategory, applySkill, type SkillDefinition } from '../../skills/skillsRegistry';
import { subscribeToCustomSkills, getCachedUserSkills } from '../../skills/customSkillsManager';
import { CreateSkillModal } from './CreateSkillModal';
import {
  X,
  Search,
  Copy,
  Check,
  Plus,
  Zap,
  Sparkles,
  Layers,
  Code2,
  Edit2,
  Trash2,
} from 'lucide-react';

interface CategoryDetailModalProps {
  category: CategoryMeta;
  onClose: () => void;
  onOpenCreateSkill?: () => void;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({
  category,
  onClose,
  onOpenCreateSkill,
}) => {
  const { openEditor, editingPrompt, addToast } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPreviewId, setExpandedPreviewId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<UserSkill | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToCustomSkills(() => {
      setVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

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
        title: `${skill.displayName} Applied!`,
        description: 'Transformed and enriched active prompt in editor',
      });
      onClose();
    } else {
      handleCreateNewWithSkill(skill);
    }
  };

  const handleCreateNewWithSkill = (skill: SkillDefinition) => {
    // Generate initial prompt starting directly with the skill's essence
    const transformed = skill.transform('');

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
      title: `Prompt Created with ${skill.displayName}`,
      description: 'Ready to edit and deploy',
    });
  };

  const handleCopySkillLogic = async (skill: SkillDefinition) => {
    try {
      const transformed = skill.transform('');
      await navigator.clipboard.writeText(transformed);
      setCopiedId(skill.id);
      addToast({
        type: 'success',
        title: 'Skill transformation copied',
        description: skill.displayName,
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy' });
    }
  };

  const handleEditCustomSkill = (skill: SkillDefinition) => {
    const userSkills = getCachedUserSkills();
    const found = userSkills.find((u) => u.id === skill.id);
    if (found) {
      setEditingSkill(found);
      setIsCreateModalOpen(true);
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingSkill(null);
                setIsCreateModalOpen(true);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:from-amber-400 hover:to-rose-500 transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search inside Category Skills */}
        <div className="p-3 border-b border-slate-800 bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${skills.length} skills in ${category.name} (e.g. ${skills[0]?.displayName || 'name'})...`}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Active Skills List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
          {filteredSkills.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="text-xs text-slate-400">No matching skills found in this category.</p>
              <button
                onClick={() => {
                  setEditingSkill(null);
                  setIsCreateModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Create First Custom Skill in {category.name}
              </button>
            </div>
          ) : (
            filteredSkills.map((skill, idx) => {
              const isExpanded = expandedPreviewId === skill.id;
              const samplePreview = skill.transform('');

              return (
                <div
                  key={`${skill.id}-${idx}`}
                  className={`rounded-2xl border p-3.5 sm:p-4 transition w-full max-w-full overflow-hidden ${
                    skill.isUserCreated
                      ? 'border-amber-500/40 bg-amber-950/20 hover:border-amber-400'
                      : 'border-slate-800 bg-slate-950/70 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-2 w-full min-w-0">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap mb-1.5 max-w-full">
                        <span
                          className="font-mono text-[10px] sm:text-xs font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 rounded-lg truncate max-w-[140px] sm:max-w-[220px] inline-block"
                          title={skill.name}
                        >
                          {skill.name}
                        </span>

                        {skill.isUserCreated && (
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            Custom
                          </span>
                        )}

                        {skill.subSkills && skill.subSkills.length > 0 && (
                          <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                            <Layers className="w-3 h-3" />
                            Composite ({skill.subSkills.length})
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-100 line-clamp-2 break-words leading-snug">
                        {skill.displayName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-3 break-words">
                        {skill.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-start">
                      {/* Apply Skill button */}
                      <button
                        onClick={() => handleApplyToActivePrompt(skill)}
                        className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:from-indigo-500 hover:to-violet-500 transition active:scale-95 cursor-pointer"
                        title={editingPrompt ? 'Transform active prompt with this skill' : 'Create new prompt powered by this skill'}
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                        <span>{editingPrompt ? 'Apply to Prompt' : 'Create with Skill'}</span>
                      </button>

                      {/* Edit button for custom skills */}
                      {skill.isUserCreated && (
                        <button
                          onClick={() => handleEditCustomSkill(skill)}
                          className="flex items-center gap-1 rounded-xl border border-amber-500/40 bg-amber-950/40 p-1.5 text-amber-300 hover:bg-amber-900/60 transition"
                          title="Edit Custom Skill"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}

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
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap bg-slate-900/60 p-2 rounded-xl border border-slate-800/80 max-w-full overflow-hidden">
                      <span className="text-slate-500 font-medium shrink-0">Orchestrates:</span>
                      {skill.subSkills.slice(0, 4).map((sub) => (
                        <span
                          key={sub}
                          className="font-mono text-[10px] text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-500/20 truncate max-w-[120px] inline-block"
                          title={sub}
                        >
                          {sub}
                        </span>
                      ))}
                      {skill.subSkills.length > 4 && (
                        <span className="text-[10px] text-slate-500 font-medium shrink-0">
                          +{skill.subSkills.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Preview toggle & Tags */}
                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-slate-800/60 min-w-0 max-w-full">
                    <button
                      onClick={() => setExpandedPreviewId(isExpanded ? null : skill.id)}
                      className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 transition font-medium shrink-0"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{isExpanded ? 'Hide transformation preview' : 'View transformation preview'}</span>
                    </button>

                    <div className="flex flex-wrap gap-1 min-w-0 max-w-full">
                      {skill.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-slate-800/80 px-1.5 py-0.5 text-[9px] text-slate-400 truncate max-w-[90px] inline-block"
                          title={t}
                        >
                          #{t}
                        </span>
                      ))}
                      {skill.tags.length > 3 && (
                        <span className="rounded-md bg-slate-800/50 px-1 py-0.5 text-[9px] font-medium text-slate-500">
                          +{skill.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expandable Transformation Blueprint Preview */}
                  {isExpanded && (
                    <div className="mt-2.5 rounded-xl border border-slate-800 bg-slate-900/90 p-3 font-mono text-[11px] text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed max-w-full break-all">
                      {samplePreview}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create / Edit Skill Modal */}
      <CreateSkillModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingSkill(null);
        }}
        initialSkill={editingSkill}
        defaultCategoryId={category.id}
      />
    </div>
  );
};
