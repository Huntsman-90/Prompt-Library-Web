import React, { useState, useEffect } from 'react';
import type { ComponentBlock, CategoryMeta } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import {
  X,
  Search,
  Copy,
  Check,
  Plus,
  Bookmark,
  Share2,
  FileText,
  Boxes,
} from 'lucide-react';

interface CategoryDetailModalProps {
  category: CategoryMeta;
  onClose: () => void;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({ category, onClose }) => {
  const { openEditor, addToast } = useUIStore();
  const [blocks, setBlocks] = useState<ComponentBlock[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // If it's frameworks category, we pull from frameworks table or components
    if (category.id === 'frameworks') {
      db.frameworks.toArray().then((items) => {
        const mapped: ComponentBlock[] = items.map((f) => ({
          id: f.id,
          categoryId: 'frameworks',
          name: f.name,
          description: f.description,
          content: f.content,
          tags: f.tags,
        }));
        setBlocks(mapped);
      });
    } else {
      db.components.where('categoryId').equals(category.id).toArray().then(setBlocks);
    }
  }, [category.id]);

  const filteredBlocks = blocks.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.content.toLowerCase().includes(q) ||
      b.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleCopy = async (b: ComponentBlock) => {
    try {
      await navigator.clipboard.writeText(b.content);
      setCopiedId(b.id);
      addToast({ type: 'success', title: 'Component copied to clipboard', description: b.name });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      addToast({ type: 'error', title: 'Failed to copy' });
    }
  };

  const handleUseAsPrompt = (b: ComponentBlock) => {
    onClose();
    openEditor({
      id: 'prompt-' + Math.random().toString(36).substring(2, 9),
      title: b.name,
      description: b.description,
      content: b.content,
      category: category.name.toLowerCase(),
      tags: [...b.tags, category.id],
      variables: [],
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleAddToMyComponents = async (b: ComponentBlock) => {
    await db.userComponents.put({
      ...b,
      id: 'user-' + b.id,
      isUserCreated: true,
    });
    addToast({
      type: 'success',
      title: 'Added to My Components',
      description: b.name,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-3xl h-[90vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr ${category.color} shadow-md`}>
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                {category.name}
                <span className="text-xs font-normal text-slate-400">
                  ({blocks.length} blocks)
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

        {/* Search inside Category */}
        <div className="p-3 border-b border-slate-800 bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${blocks.length} blocks in ${category.name}...`}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Blocks List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
          {filteredBlocks.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No matching components found in this category.
            </div>
          ) : (
            filteredBlocks.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-100">{b.name}</h4>
                    {b.description && (
                      <p className="text-xs text-slate-400 mt-0.5">{b.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCopy(b)}
                      className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-[11px] text-slate-200 hover:bg-slate-700 transition"
                      title="Copy full text"
                    >
                      {copiedId === b.id ? (
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

                    <button
                      onClick={() => handleUseAsPrompt(b)}
                      className="flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-indigo-500 transition"
                      title="Create new prompt with this block"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Use</span>
                    </button>
                  </div>
                </div>

                {/* Preformatted Content snippet */}
                <div className="mt-2.5 rounded-xl border border-slate-800/80 bg-slate-900/90 p-3 font-mono text-[11px] text-slate-300 whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
                  {b.content}
                </div>

                {/* Tags and extra actions */}
                <div className="mt-2.5 flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                  <div className="flex flex-wrap gap-1">
                    {b.tags.map((t) => (
                      <span key={t} className="rounded-md bg-slate-800 px-1.5 py-0.5 text-[9px] text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddToMyComponents(b)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-400 transition"
                  >
                    <Bookmark className="w-3 h-3" />
                    <span>Save to My Blocks</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
