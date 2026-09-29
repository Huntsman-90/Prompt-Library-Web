import React, { useState } from 'react';
import type { PromptItem } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import { useThemeStore } from '../../store/useThemeStore';
import {
  Star,
  Copy,
  Check,
  MoreVertical,
  GitFork,
  LayoutGrid,
  Sparkles,
  Scissors,
  Trash2,
  Calendar,
  Variable,
  Download,
} from 'lucide-react';
import { downloadPromptAsMarkdown } from '../../utils/markdownExporter';

interface PromptCardProps {
  prompt: PromptItem;
  onRefresh?: () => void;
  onAddToBoard?: (prompt: PromptItem) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, onRefresh, onAddToBoard }) => {
  const { openEditor, openTool, addToast } = useUIStore();
  const { confirmDeletions } = useThemeStore();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = !prompt.isFavorite;
    await db.prompts.update(prompt.id, {
      isFavorite: updated,
      updatedAt: new Date().toISOString(),
    });
    addToast({
      type: 'info',
      title: updated ? 'Added to favorites' : 'Removed from favorites',
      description: prompt.title,
    });
    if (onRefresh) onRefresh();
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.content);
      // Increment usage count
      await db.prompts.update(prompt.id, { usageCount: (prompt.usageCount || 0) + 1 });
      setCopied(true);
      addToast({
        type: 'success',
        title: 'Copied to clipboard',
        description: prompt.title,
      });
      setTimeout(() => setCopied(false), 2000);
      if (onRefresh) onRefresh();
    } catch {
      addToast({ type: 'error', title: 'Failed to copy to clipboard' });
    }
  };

  const handleFork = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    const forked: PromptItem = {
      ...prompt,
      id: 'prompt-' + Math.random().toString(36).substring(2, 9),
      title: `${prompt.title} (Fork)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      isFavorite: false,
    };
    await db.prompts.add(forked);
    addToast({
      type: 'success',
      title: 'Prompt forked',
      description: forked.title,
    });
    if (onRefresh) onRefresh();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    if (confirmDeletions) {
      const ok = window.confirm(`Delete prompt "${prompt.title}"?`);
      if (!ok) return;
    }
    await db.prompts.delete(prompt.id);
    addToast({
      type: 'info',
      title: 'Prompt deleted',
      description: prompt.title,
    });
    if (onRefresh) onRefresh();
  };

  const handleQuickOptimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    openEditor(prompt);
    openTool('optimizer');
  };

  const handleQuickSimplify = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    openEditor(prompt);
    openTool('simplifier');
  };

  const varCount = prompt.variables ? prompt.variables.length : 0;
  const formattedDate = new Date(prompt.updatedAt || prompt.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      onClick={() => openEditor(prompt)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 transition-all duration-200 hover:border-indigo-500/40 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-indigo-500/5 cursor-pointer"
    >
      <div>
        {/* Top meta row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center rounded-md bg-indigo-950/60 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-medium text-indigo-300 capitalize">
              {prompt.category || 'General'}
            </span>
            {varCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-violet-950/60 border border-violet-500/20 px-1.5 py-0.5 text-[10px] font-medium text-violet-300">
                <Variable className="w-2.5 h-2.5" />
                {varCount} {varCount === 1 ? 'var' : 'vars'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleFavorite}
              className={`rounded-lg p-1.5 transition ${
                prompt.isFavorite
                  ? 'text-amber-400 hover:text-amber-300'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title={prompt.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>

            {/* Overflow menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                    }}
                  />
                  <div className="absolute right-0 top-8 z-40 w-44 rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl p-1 shadow-2xl text-xs text-slate-200 animate-in fade-in zoom-in-95">
                    <button
                      onClick={handleCopy}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-800 text-left"
                    >
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Prompt</span>
                    </button>
                    <button
                      onClick={handleFork}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-800 text-left"
                    >
                      <GitFork className="w-3.5 h-3.5 text-slate-400" />
                      <span>Fork / Clone</span>
                    </button>
                    {onAddToBoard && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(false);
                          onAddToBoard(prompt);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-800 text-left"
                      >
                        <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
                        <span>Add to Board</span>
                      </button>
                    )}
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        const success = await downloadPromptAsMarkdown(prompt);
                        if (success) {
                          addToast({ type: 'success', title: 'Exported as Markdown (.md)', description: prompt.title });
                        }
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-800 text-left text-emerald-300"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Markdown (.md)</span>
                    </button>
                    <button
                      onClick={handleQuickOptimize}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-800 text-left text-indigo-300"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Optimize</span>
                    </button>
                    <button
                      onClick={handleQuickSimplify}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-800 text-left text-sky-300"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      <span>Simplify</span>
                    </button>
                    <div className="my-1 border-t border-slate-800" />
                    <button
                      onClick={handleDelete}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-rose-950/60 text-rose-400 text-left"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition line-clamp-2 leading-snug">
          {prompt.title}
        </h3>

        {/* Description */}
        {prompt.description && (
          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {prompt.description}
          </p>
        )}

        {/* Tags */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {prompt.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-400"
              >
                #{tag}
              </span>
            ))}
            {prompt.tags.length > 3 && (
              <span className="text-[10px] text-slate-500 self-center">
                +{prompt.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer info & Quick Copy button */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-slate-500" />
          <span>{formattedDate}</span>
          {prompt.usageCount ? (
            <span className="text-slate-500">· {prompt.usageCount} uses</span>
          ) : null}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-800/60 px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition active:scale-95 cursor-pointer"
          title="Quick Copy"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
