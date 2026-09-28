import React, { useState, useEffect, useMemo } from 'react';
import type { PromptItem } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import {
  CheckCheck,
  AlertTriangle,
  RefreshCw,
  Tag,
  Folder,
  FileText,
  Clock,
  CopyCheck,
  Check,
  SkipForward,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface AuditResult {
  prompt: PromptItem;
  issues: {
    isUntagged: boolean;
    isNoCategory: boolean;
    isNoDescription: boolean;
    isThinContent: boolean;
    isStale: boolean;
    isDuplicate: boolean;
  };
}

export const LibraryOrganizerView: React.FC = () => {
  const { addToast, openEditor } = useUIStore();
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [issuesList, setIssuesList] = useState<AuditResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Quick edits on the current item
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');

  const scanLibrary = async () => {
    setIsScanning(true);
    const all = await db.prompts.toArray();
    setPrompts(all);

    const now = Date.now();
    const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;

    // Track duplicates by lowercase normalized title
    const titleCounts = new Map<string, number>();
    all.forEach((p) => {
      const norm = p.title.trim().toLowerCase();
      titleCounts.set(norm, (titleCounts.get(norm) || 0) + 1);
    });

    const results: AuditResult[] = [];

    for (const p of all) {
      const wordCount = p.content.trim().split(/\s+/).length;
      const ageMs = now - new Date(p.updatedAt || p.createdAt).getTime();

      const isUntagged = !p.tags || p.tags.length === 0;
      const isNoCategory = !p.category || p.category.toLowerCase() === 'general';
      const isNoDescription = !p.description || p.description.trim().length === 0;
      const isThinContent = wordCount < 25;
      const isStale = ageMs > ninetyDaysMs;
      const isDuplicate = (titleCounts.get(p.title.trim().toLowerCase()) || 0) > 1;

      if (
        isUntagged ||
        isNoCategory ||
        isNoDescription ||
        isThinContent ||
        isStale ||
        isDuplicate
      ) {
        results.push({
          prompt: p,
          issues: {
            isUntagged,
            isNoCategory,
            isNoDescription,
            isThinContent,
            isStale,
            isDuplicate,
          },
        });
      }
    }

    setIssuesList(results);
    setCurrentIndex(0);
    setIsScanning(false);
  };

  useEffect(() => {
    scanLibrary();
  }, []);

  const currentItem = issuesList[currentIndex] || null;

  useEffect(() => {
    if (currentItem) {
      setCurrentTags(currentItem.prompt.tags || []);
      setCurrentCategory(currentItem.prompt.category || 'general');
      setCurrentDescription(currentItem.prompt.description || '');
    }
  }, [currentIndex, currentItem]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = tagInput.trim().replace(/^#/, '');
      if (val && !currentTags.includes(val)) {
        setCurrentTags([...currentTags, val]);
      }
      setTagInput('');
    }
  };

  const handleApplyFix = async () => {
    if (!currentItem) return;

    await db.prompts.update(currentItem.prompt.id, {
      tags: currentTags,
      category: currentCategory.trim() || 'general',
      description: currentDescription.trim(),
      updatedAt: new Date().toISOString(),
    });

    addToast({
      type: 'success',
      title: 'Prompt updated & resolved',
      description: currentItem.prompt.title,
    });

    nextItem();
  };

  const handleDeleteCurrent = async () => {
    if (!currentItem) return;
    await db.prompts.delete(currentItem.prompt.id);
    addToast({
      type: 'info',
      title: 'Prompt deleted',
      description: currentItem.prompt.title,
    });
    nextItem();
  };

  const nextItem = () => {
    if (currentIndex < issuesList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Re-scan
      scanLibrary();
    }
  };

  const totalIssuesCount = issuesList.length;
  const progressPercent =
    totalIssuesCount > 0
      ? Math.round(((currentIndex) / totalIssuesCount) * 100)
      : 100;

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
            <CheckCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Library Organizer</h2>
            <p className="text-xs text-slate-400">
              Audit hygiene: untagged, missing categories, thin content, stale or duplicates
            </p>
          </div>
        </div>

        <button
          onClick={scanLibrary}
          disabled={isScanning}
          className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>Rescan</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Review Progress</span>
          <span className="font-semibold text-indigo-400">
            {issuesList.length > 0 ? `${currentIndex + 1} of ${issuesList.length}` : 'All Clean!'}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive Review Box */}
      {!currentItem ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-emerald-500/30 bg-emerald-950/10 p-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-900/50 text-emerald-400 mb-2">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">Your Library is In Top Shape!</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            Zero untagged, stale, or uncategorized prompts detected. Everything is neatly organized.
          </p>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-5 space-y-4 shadow-xl">
          {/* Issue Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-300 mr-1">Detected Flaws:</span>
            {currentItem.issues.isUntagged && (
              <span className="rounded-md bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                Untagged
              </span>
            )}
            {currentItem.issues.isNoCategory && (
              <span className="rounded-md bg-purple-950/80 border border-purple-500/30 px-2 py-0.5 text-[10px] font-semibold text-purple-300">
                No Category
              </span>
            )}
            {currentItem.issues.isNoDescription && (
              <span className="rounded-md bg-blue-950/80 border border-blue-500/30 px-2 py-0.5 text-[10px] font-semibold text-blue-300">
                No Description
              </span>
            )}
            {currentItem.issues.isThinContent && (
              <span className="rounded-md bg-rose-950/80 border border-rose-500/30 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                Thin Content
              </span>
            )}
            {currentItem.issues.isStale && (
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                Stale (&gt;90d)
              </span>
            )}
            {currentItem.issues.isDuplicate && (
              <span className="rounded-md bg-red-950/80 border border-red-500/30 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                Duplicate Title
              </span>
            )}
          </div>

          {/* Prompt Preview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <h3 className="text-sm font-bold text-slate-100">{currentItem.prompt.title}</h3>
            <p className="font-mono text-xs text-slate-300 line-clamp-4 leading-relaxed whitespace-pre-wrap">
              {currentItem.prompt.content}
            </p>
          </div>

          {/* Quick Fix Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Add or Edit Description
              </label>
              <input
                type="text"
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
                placeholder="Crisp 1-sentence description..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  value={currentCategory}
                  onChange={(e) => setCurrentCategory(e.target.value)}
                  placeholder="e.g. coding, business, ux"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Enter)</label>
                <div className="flex items-center gap-1 flex-wrap mb-1">
                  {currentTags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300 flex items-center gap-1"
                    >
                      #{t}
                      <button
                        onClick={() => setCurrentTags(currentTags.filter((x) => x !== t))}
                        className="text-slate-400 hover:text-rose-400"
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
                  placeholder="Type tag & press Enter..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              onClick={handleDeleteCurrent}
              className="flex items-center gap-1 rounded-xl border border-rose-900/60 bg-rose-950/40 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-900/60 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={nextItem}
                className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Skip</span>
              </button>
              <button
                onClick={handleApplyFix}
                className="flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Next</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
