import React, { useState, useEffect, useMemo } from 'react';
import type { PromptItem, FolderItem, PromptBoard } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import { PromptCard } from './PromptCard';
import {
  Search,
  SlidersHorizontal,
  FolderPlus,
  Star,
  Folder as FolderIcon,
  SortAsc,
  Plus,
  Sparkles,
  X,
  Check,
  Tag,
} from 'lucide-react';

export const PromptLibraryView: React.FC = () => {
  const { openEditor, openTool, addToast } = useUIStore();
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [boards, setBoards] = useState<PromptBoard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'most_used'>('newest');

  // Add to board modal state
  const [promptToAddToBoard, setPromptToAddToBoard] = useState<PromptItem | null>(null);

  // New folder dialog
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#6366f1');

  const loadData = async () => {
    const p = await db.prompts.toArray();
    const f = await db.folders.toArray();
    const b = await db.boards.toArray();
    setPrompts(p);
    setFolders(f);
    setBoards(b);
  };

  useEffect(() => {
    loadData();
  }, []);

  const createFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    const folder: FolderItem = {
      id: 'folder-' + Math.random().toString(36).substring(2, 9),
      name: newFolderName.trim(),
      color: newFolderColor,
      createdAt: new Date().toISOString(),
    };
    await db.folders.add(folder);
    setNewFolderName('');
    setIsFolderModalOpen(false);
    addToast({ type: 'success', title: 'Folder created', description: folder.name });
    loadData();
  };

  const handleAddPromptToBoard = async (boardId: string) => {
    if (!promptToAddToBoard) return;
    const board = await db.boards.get(boardId);
    if (!board) return;
    if (!board.promptIds.includes(promptToAddToBoard.id)) {
      board.promptIds.push(promptToAddToBoard.id);
      board.updatedAt = new Date().toISOString();
      await db.boards.put(board);
      addToast({
        type: 'success',
        title: 'Pinned to board',
        description: `Added "${promptToAddToBoard.title}" to ${board.title}`,
      });
    } else {
      addToast({
        type: 'info',
        title: 'Already on board',
        description: `"${promptToAddToBoard.title}" is already on this board.`,
      });
    }
    setPromptToAddToBoard(null);
  };

  // Filter & Sort
  const filteredPrompts = useMemo(() => {
    return prompts
      .filter((p) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          const matchContent = p.content.toLowerCase().includes(q);
          const matchTag = p.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchContent && !matchTag) return false;
        }

        // Favorites
        if (showOnlyFavorites && !p.isFavorite) return false;

        // Folder
        if (selectedFolder && p.folderId !== selectedFolder) return false;

        // Category
        if (selectedCategory && p.category !== selectedCategory) return false;

        // Tag
        if (selectedTag && !p.tags?.includes(selectedTag)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === 'name') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'most_used') {
          return (b.usageCount || 0) - (a.usageCount || 0);
        }
        return 0;
      });
  }, [prompts, searchQuery, showOnlyFavorites, selectedFolder, selectedCategory, selectedTag, sortBy]);

  // Unique categories in existing prompts
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    prompts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [prompts]);

  return (
    <div className="space-y-4 pb-20">
      {/* Top search & controls */}
      <div className="flex flex-col gap-2.5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts, variables [[var]], tags..."
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 pl-10 pr-9 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => {
              setShowOnlyFavorites(false);
              setSelectedFolder(null);
              setSelectedCategory(null);
              setSelectedTag(null);
            }}
            className={`shrink-0 rounded-xl px-3 py-1.5 font-medium transition cursor-pointer ${
              !showOnlyFavorites && !selectedFolder && !selectedCategory && !selectedTag
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            All ({prompts.length})
          </button>

          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-medium transition cursor-pointer ${
              showOnlyFavorites
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-current' : ''}`} />
            <span>Favorites</span>
          </button>

          {/* Folder Pills */}
          {folders.map((folder) => {
            const isSelected = selectedFolder === folder.id;
            return (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(isSelected ? null : folder.id)}
                className={`shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: folder.color || '#6366f1' }}
                />
                <span>{folder.name}</span>
              </button>
            );
          })}

          <button
            onClick={() => setIsFolderModalOpen(true)}
            className="shrink-0 flex items-center gap-1 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-2.5 py-1.5 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition"
            title="Create Folder"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>Folder</span>
          </button>
        </div>

        {/* Sort & Category bar */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`rounded-lg px-2 py-1 text-[11px] capitalize transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <SortAsc className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-slate-900 text-slate-200">Newest</option>
              <option value="oldest" className="bg-slate-900 text-slate-200">Oldest</option>
              <option value="name" className="bg-slate-900 text-slate-200">Name (A-Z)</option>
              <option value="most_used" className="bg-slate-900 text-slate-200">Most Used</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prompts Grid */}
      {filteredPrompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-950/60 border border-indigo-500/20 text-indigo-400 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-200">No prompts found</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-xs">
            {searchQuery
              ? 'Try modifying your search or clearing active filters.'
              : 'Start your collection by creating a new prompt or using AI Build.'}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => openEditor(null)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Prompt</span>
            </button>
            <button
              onClick={() => openTool('aibuild')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Build</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onRefresh={loadData}
              onAddToBoard={(p) => setPromptToAddToBoard(p)}
            />
          ))}
        </div>
      )}

      {/* Folder Creation Modal */}
      {isFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-semibold">Create New Folder</h3>
              <button
                onClick={() => setIsFolderModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={createFolder} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Folder Name
                </label>
                <input
                  type="text"
                  required
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="e.g. Sales Sequences, Prompt Engineering..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Folder Color
                </label>
                <div className="flex items-center gap-2">
                  {['#6366f1', '#10b981', '#06b6d4', '#ec4899', '#f59e0b', '#8b5cf6', '#ef4444'].map(
                    (color) => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setNewFolderColor(color)}
                        className={`h-7 w-7 rounded-xl transition ${
                          newFolderColor === color
                            ? 'ring-2 ring-white scale-110'
                            : 'opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFolderModalOpen(false)}
                  className="rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add To Board Modal */}
      {promptToAddToBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-semibold">Add to Board</h3>
              <button
                onClick={() => setPromptToAddToBoard(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Select a board to pin <strong className="text-slate-200">"{promptToAddToBoard.title}"</strong>:
            </p>
            <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
              {boards.map((b) => {
                const isPinned = b.promptIds.includes(promptToAddToBoard.id);
                return (
                  <button
                    key={b.id}
                    onClick={() => handleAddPromptToBoard(b.id)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-800/60 p-3 text-left hover:border-indigo-500/50 hover:bg-slate-800 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: b.color || '#6366f1' }}
                      />
                      <div>
                        <p className="text-xs font-semibold text-slate-100">{b.title}</p>
                        <p className="text-[10px] text-slate-400">{b.promptIds.length} prompts</p>
                      </div>
                    </div>
                    {isPinned ? (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                        <Check className="w-3.5 h-3.5" /> Pinned
                      </span>
                    ) : (
                      <span className="text-xs text-indigo-400 font-medium">Pin</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setPromptToAddToBoard(null)}
                className="rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
