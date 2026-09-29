import React, { useState, useEffect, useMemo } from 'react';
import type { PromptBoard, PromptItem } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import { IconPicker, getIconComponent, getColorGradient } from '../common/IconPicker';
import {
  LayoutGrid,
  Plus,
  Search,
  Pin,
  Trash2,
  Download,
  X,
  Check,
  ChevronRight,
  ExternalLink,
  Edit2,
  Copy,
  FolderKanban,
  Sparkles,
  Layers,
} from 'lucide-react';

export const BoardsView: React.FC = () => {
  const { openEditor, addToast } = useUIStore();
  const [boards, setBoards] = useState<PromptBoard[]>([]);
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  
  // Board filter search on main screen
  const [boardSearchQuery, setBoardSearchQuery] = useState('');

  // Active Board Detail Modal State
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [detailSearchQuery, setDetailSearchQuery] = useState('');

  // New / Edit Board Modal
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<PromptBoard | null>(null);
  const [boardTitle, setBoardTitle] = useState('');
  const [boardDesc, setBoardDesc] = useState('');
  const [boardColor, setBoardColor] = useState('#6366f1');
  const [boardIcon, setBoardIcon] = useState('FolderKanban');

  // Pin Existing Prompt to active board modal
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const loadData = async () => {
    const b = await db.boards.toArray();
    const p = await db.prompts.toArray();
    setBoards(b);
    setPrompts(p);
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeBoard = useMemo(() => {
    if (!activeBoardId) return null;
    return boards.find((b) => b.id === activeBoardId) || null;
  }, [boards, activeBoardId]);

  // Prompts belonging to active board
  const boardPrompts = useMemo(() => {
    if (!activeBoard) return [];
    const promptMap = new Map(prompts.map((p) => [p.id, p]));
    return activeBoard.promptIds
      .map((id) => promptMap.get(id))
      .filter((p): p is PromptItem => !!p)
      .filter((p) => {
        if (!detailSearchQuery.trim()) return true;
        const q = detailSearchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
        );
      });
  }, [activeBoard, prompts, detailSearchQuery]);

  const totalPinnedCount = useMemo(() => {
    return boards.reduce((acc, b) => acc + (b.promptIds?.length || 0), 0);
  }, [boards]);

  // Filtered boards on main screen
  const filteredBoards = useMemo(() => {
    if (!boardSearchQuery.trim()) return boards;
    const q = boardSearchQuery.toLowerCase();
    return boards.filter(
      (b) => b.title.toLowerCase().includes(q) || b.description?.toLowerCase().includes(q)
    );
  }, [boards, boardSearchQuery]);

  const handleOpenCreateBoard = () => {
    setEditingBoard(null);
    setBoardTitle('');
    setBoardDesc('');
    setBoardColor('#6366f1');
    setBoardIcon('FolderKanban');
    setIsBoardModalOpen(true);
  };

  const handleOpenEditBoard = (b: PromptBoard, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingBoard(b);
    setBoardTitle(b.title);
    setBoardDesc(b.description || '');
    setBoardColor(b.color || '#6366f1');
    setBoardIcon(b.iconName || 'FolderKanban');
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
        iconName: boardIcon,
        updatedAt: new Date().toISOString(),
      });
      addToast({ type: 'success', title: 'Board updated', description: boardTitle });
    } else {
      const newBoard: PromptBoard = {
        id: 'board-' + Math.random().toString(36).substring(2, 9),
        title: boardTitle.trim(),
        description: boardDesc.trim(),
        color: boardColor,
        iconName: boardIcon,
        promptIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await db.boards.add(newBoard);
      addToast({ type: 'success', title: 'Board created', description: newBoard.title });
    }

    setIsBoardModalOpen(false);
    loadData();
  };

  const handleDeleteBoard = async (b: PromptBoard, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const ok = window.confirm(`Delete board "${b.title}"? Prompts will not be deleted.`);
    if (!ok) return;
    await db.boards.delete(b.id);
    if (activeBoardId === b.id) {
      setActiveBoardId(null);
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
    <div className="space-y-5 pb-20">
      {/* Boards Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 p-4 sm:p-6 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                <FolderKanban className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Visual Workspaces & Boards
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              {boards.length} Boards · {totalPinnedCount} Pinned Prompts
            </h2>
            <p className="mt-1 text-xs text-slate-300 max-w-xl leading-relaxed">
              Select a board workspace card below to view pinned prompts, organize pipelines, and export collections.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleOpenCreateBoard}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 transition active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Board</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar for Boards */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={boardSearchQuery}
          onChange={(e) => setBoardSearchQuery(e.target.value)}
          placeholder="Filter boards and visual workspaces..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 pl-10 pr-9 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
        />
        {boardSearchQuery && (
          <button
            onClick={() => setBoardSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Pure Boards Cards Grid (Catalog Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {filteredBoards.map((b) => {
          const IconComp = getIconComponent(b.iconName || 'FolderKanban');
          const gradient = getColorGradient(b.color);

          return (
            <div
              key={b.id}
              onClick={() => {
                setActiveBoardId(b.id);
                setDetailSearchQuery('');
              }}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3 sm:p-4 hover:border-indigo-500/60 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer select-none active:scale-[0.98]"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr ${gradient} text-white shadow-md group-hover:scale-105 transition`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="rounded-full bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                      {b.promptIds.length} {b.promptIds.length === 1 ? 'Prompt' : 'Prompts'}
                    </span>

                    {/* Edit board */}
                    <button
                      type="button"
                      onClick={(e) => handleOpenEditBoard(b, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Edit Board"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>

                    {/* Delete board */}
                    <button
                      type="button"
                      onClick={(e) => handleDeleteBoard(b, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                      title="Delete Board"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition line-clamp-1">
                  {b.title}
                </h4>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-snug">
                  {b.description || 'Custom visual board for organizing targeted prompts and workflow pipelines.'}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-indigo-400 font-medium group-hover:text-indigo-300">
                <span>Explore workspace</span>
                <span>→</span>
              </div>
            </div>
          );
        })}

        {/* Create Board Card */}
        <div
          onClick={handleOpenCreateBoard}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-4 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-slate-400 hover:text-indigo-300 transition-all duration-200 cursor-pointer min-h-[130px] group select-none active:scale-[0.98]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900 text-slate-400 group-hover:border-indigo-500/50 group-hover:text-indigo-300 group-hover:scale-105 transition mb-2">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300">Create Board</span>
          <span className="text-[10px] text-slate-500 mt-0.5">New visual workspace</span>
        </div>
      </div>

      {/* BOARD DETAIL WORKSPACE MODAL (Opens cleanly when user clicks any board card) */}
      {activeBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
          <div className="flex flex-col w-full max-w-4xl h-[90vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 p-4 bg-slate-900/90">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr ${getColorGradient(
                    activeBoard.color
                  )} text-white shadow-md`}
                >
                  {React.createElement(getIconComponent(activeBoard.iconName || 'FolderKanban'), {
                    className: 'w-5 h-5',
                  })}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    {activeBoard.title}
                    <span className="text-xs font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                      {boardPrompts.length} {boardPrompts.length === 1 ? 'Prompt' : 'Prompts'}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 line-clamp-1">{activeBoard.description}</p>
                </div>
              </div>

              {/* Board Actions */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setIsPinModalOpen(true)}
                  className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-indigo-500 transition cursor-pointer active:scale-95"
                >
                  <Pin className="w-3.5 h-3.5" />
                  <span>Pin Prompt</span>
                </button>
                <button
                  onClick={handleExportBoard}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Export Board as JSON"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleOpenEditBoard(activeBoard)}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Edit Board"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDeleteBoard(activeBoard, e)}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-rose-400 hover:bg-rose-950/60 transition cursor-pointer"
                  title="Delete Board"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveBoardId(null)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search inside active board */}
            <div className="p-3 border-b border-slate-800 bg-slate-900/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={detailSearchQuery}
                  onChange={(e) => setDetailSearchQuery(e.target.value)}
                  placeholder={`Search in ${activeBoard.title}...`}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-8 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
                {detailSearchQuery && (
                  <button
                    onClick={() => setDetailSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Board Pinned Prompts Body */}
            <div className="flex-1 overflow-y-auto p-4">
              {boardPrompts.length === 0 ? (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-950/60 border border-indigo-500/20 text-indigo-400">
                    <Pin className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">No prompts pinned to this board yet</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Pin existing prompts from your library or create new ones to build this workspace.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setIsPinModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition cursor-pointer shadow"
                    >
                      <Pin className="w-3.5 h-3.5" />
                      Pin Existing Prompt
                    </button>
                    <button
                      onClick={() => {
                        setActiveBoardId(null);
                        openEditor(null);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Create New Prompt
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {boardPrompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4 hover:border-indigo-500/40 hover:bg-slate-900/90 transition shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="rounded-lg bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-bold text-indigo-300 capitalize">
                            {prompt.category || 'General'}
                          </span>
                          <button
                            onClick={() => handleUnpin(prompt.id)}
                            className="rounded-lg p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                            title="Unpin from board"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-indigo-300 transition">
                          {prompt.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                          {prompt.content}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setActiveBoardId(null);
                            openEditor(prompt);
                          }}
                          className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
                        >
                          <span>Open in Editor</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] text-slate-500">
                          Used {prompt.usageCount || 0} times
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Board Modal with Icon Picker */}
      {isBoardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow">
                  <FolderKanban className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {editingBoard ? 'Edit Board Workspace' : 'Create New Board'}
                </h3>
              </div>
              <button
                onClick={() => setIsBoardModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBoard} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Board Title *
                </label>
                <input
                  type="text"
                  required
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.target.value)}
                  placeholder="e.g. Production SRE, GTM Q4, AI Pipeline..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={boardDesc}
                  onChange={(e) => setBoardDesc(e.target.value)}
                  placeholder="e.g. Critical prompts for incident postmortems and chaos audits"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Icon & Color Selector */}
              <div className="pt-1">
                <IconPicker
                  selectedIcon={boardIcon}
                  onSelectIcon={setBoardIcon}
                  selectedColor={boardColor}
                  onSelectColor={setBoardColor}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBoardModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-5 py-2 text-xs font-bold text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 transition active:scale-95 cursor-pointer"
                >
                  {editingBoard ? 'Save Changes' : 'Create Board'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pin Existing Prompt Modal */}
      {isPinModalOpen && activeBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl text-slate-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Pin className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">
                  Pin Prompt to "{activeBoard.title}"
                </h3>
              </div>
              <button
                onClick={() => setIsPinModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 flex-1 overflow-y-auto space-y-2 pr-1">
              {prompts.length === 0 ? (
                <p className="text-center text-xs text-slate-500 py-6">No prompts in library.</p>
              ) : (
                prompts.map((p) => {
                  const isPinned = activeBoard.promptIds.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 hover:border-slate-700 transition"
                    >
                      <div className="max-w-[75%]">
                        <h5 className="text-xs font-bold text-slate-200 line-clamp-1">{p.title}</h5>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{p.content}</p>
                      </div>
                      {isPinned ? (
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                          <Check className="w-3 h-3" />
                          Pinned
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePinPrompt(p.id)}
                          className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500 transition cursor-pointer"
                        >
                          + Pin
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
