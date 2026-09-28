import React, { useState, useEffect, useMemo } from 'react';
import type { PromptBoard, PromptItem } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import {
  LayoutGrid,
  Plus,
  Search,
  MoreVertical,
  Pin,
  Trash2,
  Download,
  Share2,
  X,
  Check,
  ChevronRight,
  ExternalLink,
  Edit2,
  Copy,
} from 'lucide-react';

export const BoardsView: React.FC = () => {
  const { openEditor, addToast } = useUIStore();
  const [boards, setBoards] = useState<PromptBoard[]>([]);
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  // Search inside board or all boards
  const [searchQuery, setSearchQuery] = useState('');

  // New / Edit Board Modal
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<PromptBoard | null>(null);
  const [boardTitle, setBoardTitle] = useState('');
  const [boardDesc, setBoardDesc] = useState('');
  const [boardColor, setBoardColor] = useState('#6366f1');

  // Pin Existing Prompt to current board modal
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const loadData = async () => {
    const b = await db.boards.toArray();
    const p = await db.prompts.toArray();
    setBoards(b);
    setPrompts(p);
    if (!selectedBoardId && b.length > 0) {
      setSelectedBoardId(b[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeBoard = useMemo(() => {
    return boards.find((b) => b.id === selectedBoardId) || null;
  }, [boards, selectedBoardId]);

  // Prompts belonging to active board
  const boardPrompts = useMemo(() => {
    if (!activeBoard) return [];
    const promptMap = new Map(prompts.map((p) => [p.id, p]));
    return activeBoard.promptIds
      .map((id) => promptMap.get(id))
      .filter((p): p is PromptItem => !!p)
      .filter((p) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
        );
      });
  }, [activeBoard, prompts, searchQuery]);

  const handleOpenCreateBoard = () => {
    setEditingBoard(null);
    setBoardTitle('');
    setBoardDesc('');
    setBoardColor('#6366f1');
    setIsBoardModalOpen(true);
  };

  const handleOpenEditBoard = (b: PromptBoard) => {
    setEditingBoard(b);
    setBoardTitle(b.title);
    setBoardDesc(b.description || '');
    setBoardColor(b.color || '#6366f1');
    setIsBoardModalOpen(true);
  };

  const handleSaveBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardTitle.trim()) return;

    if (editingBoard) {
      await db.boards.update(editingBoard.id, {
        title: boardTitle.trim(),
        description: boardDesc.trim(),
        color: boardColor,
        updatedAt: new Date().toISOString(),
      });
      addToast({ type: 'success', title: 'Board updated', description: boardTitle });
    } else {
      const newBoard: PromptBoard = {
        id: 'board-' + Math.random().toString(36).substring(2, 9),
        title: boardTitle.trim(),
        description: boardDesc.trim(),
        color: boardColor,
        promptIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await db.boards.add(newBoard);
      setSelectedBoardId(newBoard.id);
      addToast({ type: 'success', title: 'Board created', description: newBoard.title });
    }

    setIsBoardModalOpen(false);
    loadData();
  };

  const handleDeleteBoard = async (b: PromptBoard) => {
    const ok = window.confirm(`Delete board "${b.title}"? Prompts will not be deleted.`);
    if (!ok) return;
    await db.boards.delete(b.id);
    if (selectedBoardId === b.id) {
      setSelectedBoardId(null);
    }
    addToast({ type: 'info', title: 'Board deleted', description: b.title });
    loadData();
  };

  const handleUnpin = async (promptId: string) => {
    if (!activeBoard) return;
    const updatedIds = activeBoard.promptIds.filter((id) => id !== promptId);
    await db.boards.update(activeBoard.id, {
      promptIds: updatedIds,
      updatedAt: new Date().toISOString(),
    });
    addToast({ type: 'info', title: 'Prompt unpinned from board' });
    loadData();
  };

  const handlePinPrompt = async (promptId: string) => {
    if (!activeBoard) return;
    if (!activeBoard.promptIds.includes(promptId)) {
      const updatedIds = [...activeBoard.promptIds, promptId];
      await db.boards.update(activeBoard.id, {
        promptIds: updatedIds,
        updatedAt: new Date().toISOString(),
      });
      addToast({ type: 'success', title: 'Prompt pinned to board' });
    }
    setIsPinModalOpen(false);
    loadData();
  };

  const handleExportBoard = () => {
    if (!activeBoard) return;
    const exportData = {
      board: activeBoard,
      prompts: boardPrompts,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeBoard.title.toLowerCase().replace(/\s+/g, '-')}-board.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ type: 'success', title: 'Board exported as JSON' });
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Boards selector pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {boards.map((b) => {
          const isSelected = selectedBoardId === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBoardId(b.id)}
              className={`shrink-0 flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-semibold transition shadow-sm ${
                isSelected
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: b.color || '#6366f1' }}
              />
              <span>{b.title}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {b.promptIds.length}
              </span>
            </button>
          );
        })}

        <button
          onClick={handleOpenCreateBoard}
          className="shrink-0 flex items-center gap-1.5 rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-500 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Board</span>
        </button>
      </div>

      {activeBoard ? (
        <div className="space-y-4">
          {/* Active Board Hero Bar */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-3xl p-4 sm:p-5 border border-slate-800 text-white shadow-xl relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${activeBoard.color}22 0%, rgba(15,23,42,0.85) 100%)`,
              borderColor: `${activeBoard.color}44`,
            }}
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: activeBoard.color }}
                />
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  {activeBoard.title}
                </h2>
              </div>
              {activeBoard.description && (
                <p className="mt-1 text-xs text-slate-300 max-w-xl">
                  {activeBoard.description}
                </p>
              )}
            </div>

            {/* Board Actions */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
              <button
                onClick={() => setIsPinModalOpen(true)}
                className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition"
              >
                <Pin className="w-3.5 h-3.5" />
                <span>Pin Prompt</span>
              </button>
              <button
                onClick={handleExportBoard}
                className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 text-slate-300 hover:text-white transition"
                title="Export Board as JSON"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleOpenEditBoard(activeBoard)}
                className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 text-slate-300 hover:text-white transition"
                title="Edit Board"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteBoard(activeBoard)}
                className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 text-rose-400 hover:bg-rose-950/60 transition"
                title="Delete Board"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search inside this board */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${activeBoard.title}...`}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Pinned Prompts Grid */}
          {boardPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 p-8 text-center">
              <Pin className="w-8 h-8 text-slate-600 mb-2" />
              <p className="text-xs font-semibold text-slate-300">No prompts on this board yet</p>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
                Pin existing prompts or create a new prompt directly into this board.
              </p>
              <button
                onClick={() => setIsPinModalOpen(true)}
                className="mt-4 flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Pin Existing Prompt</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {boardPrompts.map((prompt) => (
                <div key={prompt.id} className="relative group">
                  <div
                    onClick={() => openEditor(prompt)}
                    className="flex flex-col justify-between h-full rounded-2xl border border-slate-800 bg-slate-900/70 p-4 hover:border-indigo-500/40 hover:bg-slate-900 transition cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="rounded bg-indigo-950/80 px-2 py-0.5 text-[10px] font-medium text-indigo-300 capitalize">
                          {prompt.category || 'General'}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnpin(prompt.id);
                          }}
                          className="rounded-lg p-1 text-slate-400 hover:text-rose-400 transition"
                          title="Unpin from board"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 line-clamp-2">
                        {prompt.title}
                      </h4>
                      {prompt.description && (
                        <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {prompt.description}
                        </p>
                      )}

                      <div className="mt-2.5 rounded-xl bg-slate-950 p-2.5 font-mono text-[11px] text-slate-400 line-clamp-3">
                        {prompt.content}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{prompt.variables?.length || 0} variables</span>
                      <span className="text-indigo-400 font-medium group-hover:translate-x-0.5 transition">
                        Open →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center text-xs text-slate-500">
          No boards available. Click "New Board" above to create one.
        </div>
      )}

      {/* Create / Edit Board Modal */}
      {isBoardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-semibold">
                {editingBoard ? 'Edit Board' : 'Create New Board'}
              </h3>
              <button
                onClick={() => setIsBoardModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveBoard} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Board Title
                </label>
                <input
                  type="text"
                  required
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.target.value)}
                  placeholder="e.g. Production Engineering, Sales Mastery..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={boardDesc}
                  onChange={(e) => setBoardDesc(e.target.value)}
                  placeholder="Short description of this board collection..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Board Theme Color
                </label>
                <div className="flex items-center gap-2">
                  {['#6366f1', '#10b981', '#06b6d4', '#ec4899', '#f59e0b', '#8b5cf6', '#ef4444', '#14b8a6'].map(
                    (color) => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setBoardColor(color)}
                        className={`h-7 w-7 rounded-xl transition ${
                          boardColor === color ? 'ring-2 ring-white scale-110' : 'opacity-80'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBoardModalOpen(false)}
                  className="rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition"
                >
                  {editingBoard ? 'Save Changes' : 'Create Board'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pin Prompt Modal */}
      {isPinModalOpen && activeBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md h-[75vh] flex flex-col rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-semibold">Pin Prompt to "{activeBoard.title}"</h3>
              <button
                onClick={() => setIsPinModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mt-3 space-y-2 pr-1">
              {prompts.map((p) => {
                const isPinned = activeBoard.promptIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/60 p-3 hover:bg-slate-800 transition"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-slate-100 truncate">{p.title}</p>
                      <p className="text-[10px] text-slate-400 capitalize">{p.category}</p>
                    </div>

                    {isPinned ? (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                        <Check className="w-3.5 h-3.5" /> Pinned
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePinPrompt(p.id)}
                        className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-500"
                      >
                        Pin
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
