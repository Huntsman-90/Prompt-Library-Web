import React, { useState, useEffect, useMemo } from 'react';
import type { PromptItem, FolderItem, PromptBoard } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import { PromptCard } from './PromptCard';
import { IconPicker, getIconComponent, getColorGradient } from '../common/IconPicker';
import {
  Search,
  FolderPlus,
  Star,
  Folder as FolderIcon,
  SortAsc,
  Plus,
  Sparkles,
  X,
  Layers,
  Trash2,
  Edit2,
  Check,
  ChevronRight,
  Filter,
  ArrowLeft,
  Download,
  Upload,
} from 'lucide-react';
import {
  exportPromptsToZip,
  importPromptsFromZip,
  markdownToPrompt,
} from '../../utils/markdownExporter';

export const PromptLibraryView: React.FC = () => {
  const { openEditor, openTool, addToast } = useUIStore();
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [boards, setBoards] = useState<PromptBoard[]>([]);
  
  // Folder filter search on main screen
  const [folderSearchQuery, setFolderSearchQuery] = useState('');

  // Active Folder Detail Modal State
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null); // 'all' | 'favorites' | folder.id | null
  const [detailSearchQuery, setDetailSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'most_used'>('newest');

  // Add to board modal state
  const [promptToAddToBoard, setPromptToAddToBoard] = useState<PromptItem | null>(null);

  // Folder Dialog State (Create / Edit)
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<FolderItem | null>(null);
  const [folderName, setFolderName] = useState('');
  const [folderDesc, setFolderDesc] = useState('');
  const [folderColor, setFolderColor] = useState('#6366f1');
  const [folderIcon, setFolderIcon] = useState('Folder');

  // Delete folder confirmation
  const [folderToDelete, setFolderToDelete] = useState<FolderItem | null>(null);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeFolderId) {
        setActiveFolderId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFolderId]);

  const handleOpenCreateFolder = () => {
    setEditingFolder(null);
    setFolderName('');
    setFolderDesc('');
    setFolderColor('#6366f1');
    setFolderIcon('Folder');
    setIsFolderModalOpen(true);
  };

  const handleOpenEditFolder = (folder: FolderItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingFolder(folder);
    setFolderName(folder.name);
    setFolderDesc(folder.description || '');
    setFolderColor(folder.color || '#6366f1');
    setFolderIcon(folder.iconName || 'Folder');
    setIsFolderModalOpen(true);
  };

  const handleSaveFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    if (editingFolder) {
      await db.folders.update(editingFolder.id, {
        name: folderName.trim(),
        description: folderDesc.trim(),
        color: folderColor,
        iconName: folderIcon,
      });
      addToast({ type: 'success', title: 'Folder updated', description: folderName });
    } else {
      const newFolder: FolderItem = {
        id: 'folder-' + Math.random().toString(36).substring(2, 9),
        name: folderName.trim(),
        description: folderDesc.trim(),
        color: folderColor,
        iconName: folderIcon,
        createdAt: new Date().toISOString(),
      };
      await db.folders.add(newFolder);
      addToast({ type: 'success', title: 'Folder created', description: newFolder.name });
    }

    setIsFolderModalOpen(false);
    loadData();
  };

  const handleDeleteFolder = async (folder: FolderItem) => {
    const promptsInFolder = await db.prompts.where('folderId').equals(folder.id).toArray();
    for (const p of promptsInFolder) {
      await db.prompts.update(p.id, { folderId: undefined });
    }

    await db.folders.delete(folder.id);

    if (activeFolderId === folder.id) {
      setActiveFolderId(null);
    }

    addToast({
      type: 'info',
      title: 'Folder deleted',
      description: `Folder "${folder.name}" was deleted. Prompts remain in All.`,
    });

    setFolderToDelete(null);
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

  const handleExportAllToZip = async () => {
    if (prompts.length === 0) {
      addToast({ type: 'error', title: 'No prompts in library to export' });
      return;
    }
    await exportPromptsToZip(prompts, folders, 'prompt-repository-markdown.zip');
    addToast({
      type: 'success',
      title: 'Repository exported',
      description: `Exported ${prompts.length} prompts as Markdown ZIP archive.`,
    });
  };

  const handleExportActiveFolderToZip = async () => {
    if (!activeFolderObj) return;
    if (activeFolderPrompts.length === 0) {
      addToast({ type: 'error', title: 'No prompts in this folder to export' });
      return;
    }
    const safeName = activeFolderObj.name.toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
    await exportPromptsToZip(activeFolderPrompts, folders, `${safeName}-markdown.zip`);
    addToast({
      type: 'success',
      title: 'Folder exported',
      description: `Exported "${activeFolderObj.name}" as Markdown ZIP archive.`,
    });
  };

  const handleImportMarkdownFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let importedCount = 0;
    const existingFolders = await db.folders.toArray();
    const folderMap = new Map(existingFolders.map((f) => [f.name.toLowerCase(), f.id]));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.name.endsWith('.zip')) {
        const { prompts: parsedItems } = await importPromptsFromZip(file);
        for (const item of parsedItems) {
          let folderId: string | undefined = undefined;
          if (item.folderName) {
            const folderKey = item.folderName.toLowerCase();
            if (folderMap.has(folderKey)) {
              folderId = folderMap.get(folderKey);
            } else {
              const newFolder: FolderItem = {
                id: 'folder-' + Math.random().toString(36).substring(2, 9),
                name: item.folderName,
                createdAt: new Date().toISOString(),
              };
              await db.folders.add(newFolder);
              folderMap.set(folderKey, newFolder.id);
              folderId = newFolder.id;
            }
          }

          const fullPrompt: PromptItem = {
            id: 'prompt-' + Math.random().toString(36).substring(2, 9),
            title: item.prompt.title || 'Imported Prompt',
            description: item.prompt.description || '',
            content: item.prompt.content || '',
            category: item.prompt.category || 'general',
            folderId,
            tags: item.prompt.tags || [],
            variables: item.prompt.variables || [],
            isFavorite: item.prompt.isFavorite || false,
            usageCount: item.prompt.usageCount || 0,
            targetModel: item.prompt.targetModel,
            createdAt: item.prompt.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await db.prompts.add(fullPrompt);
          importedCount++;
        }
      } else if (file.name.endsWith('.md') || file.name.endsWith('.markdown')) {
        const text = await file.text();
        const { prompt: p, folderName } = markdownToPrompt(text);

        let folderId: string | undefined = undefined;
        if (folderName) {
          const folderKey = folderName.toLowerCase();
          if (folderMap.has(folderKey)) {
            folderId = folderMap.get(folderKey);
          } else {
            const newFolder: FolderItem = {
              id: 'folder-' + Math.random().toString(36).substring(2, 9),
              name: folderName,
              createdAt: new Date().toISOString(),
            };
            await db.folders.add(newFolder);
            folderMap.set(folderKey, newFolder.id);
            folderId = newFolder.id;
          }
        }

        const fullPrompt: PromptItem = {
          id: 'prompt-' + Math.random().toString(36).substring(2, 9),
          title: p.title || 'Imported Prompt',
          description: p.description || '',
          content: p.content || '',
          category: p.category || 'general',
          folderId,
          tags: p.tags || [],
          variables: p.variables || [],
          isFavorite: p.isFavorite || false,
          usageCount: p.usageCount || 0,
          targetModel: p.targetModel,
          createdAt: p.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await db.prompts.add(fullPrompt);
        importedCount++;
      }
    }

    addToast({
      type: 'success',
      title: 'Import completed',
      description: `Successfully imported ${importedCount} prompt(s) from Markdown/ZIP.`,
    });

    loadData();
    e.target.value = '';
  };

  // Filtered folders on main screen
  const filteredFolders = useMemo(() => {
    if (!folderSearchQuery.trim()) return folders;
    const q = folderSearchQuery.toLowerCase();
    return folders.filter(
      (f) => f.name.toLowerCase().includes(q) || f.description?.toLowerCase().includes(q)
    );
  }, [folders, folderSearchQuery]);

  // Active folder metadata
  const activeFolderObj = useMemo(() => {
    if (!activeFolderId) return null;
    if (activeFolderId === 'all') {
      return {
        id: 'all',
        name: 'All Prompts',
        description: 'Complete library repository across all categories and workflows.',
        color: '#3b82f6',
        iconName: 'Layers',
      };
    }
    if (activeFolderId === 'favorites') {
      return {
        id: 'favorites',
        name: 'Starred Favorites',
        description: 'High-priority starred prompts and critical daily drivers.',
        color: '#f59e0b',
        iconName: 'Star',
      };
    }
    return folders.find((f) => f.id === activeFolderId) || null;
  }, [activeFolderId, folders]);

  // Prompts belonging to active folder
  const activeFolderPrompts = useMemo(() => {
    if (!activeFolderId) return [];
    
    return prompts
      .filter((p) => {
        // Folder check
        if (activeFolderId === 'all') {
          // keep all
        } else if (activeFolderId === 'favorites') {
          if (!p.isFavorite) return false;
        } else {
          if (p.folderId !== activeFolderId) return false;
        }

        // Search query inside detail view
        if (detailSearchQuery.trim()) {
          const q = detailSearchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          const matchContent = p.content.toLowerCase().includes(q);
          const matchTag = p.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchContent && !matchTag) return false;
        }

        // Category filter
        if (selectedCategory && p.category !== selectedCategory) return false;

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
  }, [prompts, activeFolderId, detailSearchQuery, selectedCategory, sortBy]);

  // Unique categories in active folder
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    prompts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [prompts]);

  const favoritesCount = prompts.filter((p) => p.isFavorite).length;

  return (
    <div className="space-y-5 pb-20">
      {/* Library Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 p-4 sm:p-6 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                <FolderIcon className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Prompt Repository
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              {prompts.length} Prompts in {folders.length + 2} Collections
            </h2>
            <p className="mt-1 text-xs text-slate-300 max-w-xl leading-relaxed">
              Select a collection card below to view, edit, and create prompts inside that folder.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleExportAllToZip}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-slate-800 transition active:scale-95 cursor-pointer"
              title="Export Repository as Markdown ZIP"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export (.zip)</span>
            </button>

            <label
              className="flex items-center gap-1.5 rounded-2xl border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-xs font-semibold text-indigo-300 hover:bg-slate-800 transition active:scale-95 cursor-pointer"
              title="Import .md files or ZIP archive"
            >
              <Upload className="w-4 h-4" />
              <span>Import .md / ZIP</span>
              <input
                type="file"
                multiple
                accept=".md,.markdown,.zip"
                onChange={handleImportMarkdownFiles}
                className="hidden"
              />
            </label>

            <button
              onClick={handleOpenCreateFolder}
              className="flex items-center gap-1.5 rounded-2xl border border-indigo-500/30 bg-indigo-950/60 px-3.5 py-2.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/60 hover:text-white transition active:scale-95 cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" />
              <span>New Folder</span>
            </button>
            <button
              onClick={() => openEditor(null)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 transition active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Prompt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Screen Search Bar for Folders */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={folderSearchQuery}
          onChange={(e) => setFolderSearchQuery(e.target.value)}
          placeholder="Filter folders and collections..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 pl-10 pr-9 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
        />
        {folderSearchQuery && (
          <button
            onClick={() => setFolderSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Pure Folders Cards Grid (Catalog Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* All Prompts Card */}
        <div
          onClick={() => {
            setActiveFolderId('all');
            setDetailSearchQuery('');
            setSelectedCategory(null);
          }}
          className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3 sm:p-4 hover:border-indigo-500/60 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer select-none active:scale-[0.98]"
        >
          <div>
            <div className="flex items-center justify-between gap-1 mb-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md group-hover:scale-105 transition">
                <Layers className="w-4 h-4" />
              </div>
              <span className="rounded-full bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                {prompts.length} {prompts.length === 1 ? 'Prompt' : 'Prompts'}
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition line-clamp-1">
              All Prompts
            </h4>
            <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-snug">
              Complete library repository across all categories and workflows.
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-indigo-400 font-medium group-hover:text-indigo-300">
            <span>Explore folder</span>
            <span>→</span>
          </div>
        </div>

        {/* Favorites Card */}
        <div
          onClick={() => {
            setActiveFolderId('favorites');
            setDetailSearchQuery('');
            setSelectedCategory(null);
          }}
          className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3 sm:p-4 hover:border-amber-500/60 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer select-none active:scale-[0.98]"
        >
          <div>
            <div className="flex items-center justify-between gap-1 mb-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md group-hover:scale-105 transition">
                <Star className="w-4 h-4 fill-white" />
              </div>
              <span className="rounded-full bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                {favoritesCount} {favoritesCount === 1 ? 'Prompt' : 'Prompts'}
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-amber-200 group-hover:text-amber-100 transition line-clamp-1">
              Starred Favorites
            </h4>
            <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-snug">
              High-priority starred prompts and critical daily drivers.
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-amber-400 font-medium group-hover:text-amber-300">
            <span>Explore favorites</span>
            <span>→</span>
          </div>
        </div>

        {/* User Folder Cards */}
        {filteredFolders.map((folder) => {
          const IconComp = getIconComponent(folder.iconName);
          const gradient = getColorGradient(folder.color);
          const promptCount = prompts.filter((p) => p.folderId === folder.id).length;

          return (
            <div
              key={folder.id}
              onClick={() => {
                setActiveFolderId(folder.id);
                setDetailSearchQuery('');
                setSelectedCategory(null);
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
                      {promptCount} {promptCount === 1 ? 'Prompt' : 'Prompts'}
                    </span>

                    {/* Edit folder */}
                    <button
                      type="button"
                      onClick={(e) => handleOpenEditFolder(folder, e)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                      title="Edit Folder"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete folder */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFolderToDelete(folder);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
                      title="Delete Folder"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition line-clamp-1">
                  {folder.name}
                </h4>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-snug">
                  {folder.description || 'Custom prompt collection organized for targeted workflows.'}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-indigo-400 font-medium group-hover:text-indigo-300">
                <span>Explore folder</span>
                <span>→</span>
              </div>
            </div>
          );
        })}

        {/* Create Folder Card */}
        <div
          onClick={handleOpenCreateFolder}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-4 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-slate-400 hover:text-indigo-300 transition-all duration-200 cursor-pointer min-h-[130px] group select-none active:scale-[0.98]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900 text-slate-400 group-hover:border-indigo-500/50 group-hover:text-indigo-300 group-hover:scale-105 transition mb-2">
            <FolderPlus className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-300">Create Folder</span>
          <span className="text-[10px] text-slate-500 mt-0.5">Add custom collection</span>
        </div>
      </div>

      {/* FOLDER DETAIL MODAL (Opens cleanly when user clicks any folder card) */}
      {activeFolderObj && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveFolderId(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in"
        >
          <div className="flex flex-col w-full max-w-4xl h-[92vh] sm:h-[90vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 p-3 sm:p-4 bg-slate-900/95 sticky top-0 z-20">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => setActiveFolderId(null)}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-bold text-slate-200 border border-slate-700 transition cursor-pointer shrink-0 active:scale-95"
                  title="Back to Library"
                >
                  <ArrowLeft className="w-4 h-4 text-indigo-400" />
                  <span>Back to Library</span>
                </button>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr ${getColorGradient(
                    activeFolderObj.color
                  )} text-white shadow-md shrink-0`}
                >
                  {React.createElement(getIconComponent(activeFolderObj.iconName), {
                    className: 'w-4.5 h-4.5',
                  })}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5 truncate">
                    <span className="truncate">{activeFolderObj.name}</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 rounded-full shrink-0">
                      {activeFolderPrompts.length}
                    </span>
                  </h2>
                  <p className="text-[11px] text-slate-400 truncate">{activeFolderObj.description}</p>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const presetFolderId = activeFolderId !== 'all' && activeFolderId !== 'favorites' ? activeFolderId : null;
                      setActiveFolderId(null);
                      openEditor({
                        id: 'prompt-' + Math.random().toString(36).substring(2, 9),
                        title: '',
                        description: '',
                        content: '',
                        folderId: presetFolderId,
                        category: 'general',
                        tags: [],
                        variables: [],
                        isFavorite: false,
                        usageCount: 0,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                      });
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:from-indigo-500 hover:to-purple-500 transition active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="text-[11px] sm:text-xs">Create Prompt</span>
                  </button>

                  <button
                    onClick={handleExportActiveFolderToZip}
                    className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-emerald-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
                    title="Export Folder as Markdown ZIP"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export (.zip)</span>
                  </button>

                  {activeFolderId !== 'all' && activeFolderId !== 'favorites' && (
                    <>
                      <button
                        onClick={() => {
                          const targetFolder = folders.find((f) => f.id === activeFolderId);
                          if (targetFolder) handleOpenEditFolder(targetFolder);
                        }}
                        className="rounded-xl border border-slate-700 bg-slate-800 p-1.5 sm:p-2 text-slate-300 hover:text-white transition cursor-pointer"
                        title="Edit Folder"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const targetFolder = folders.find((f) => f.id === activeFolderId);
                          if (targetFolder) setFolderToDelete(targetFolder);
                        }}
                        className="rounded-xl border border-slate-700 bg-slate-800 p-1.5 sm:p-2 text-rose-400 hover:bg-rose-950/60 transition cursor-pointer"
                        title="Delete Folder"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setActiveFolderId(null)}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition cursor-pointer shrink-0"
                  title="Close & Return to Library"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Controls Bar inside Folder Detail */}
            <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={detailSearchQuery}
                  onChange={(e) => setDetailSearchQuery(e.target.value)}
                  placeholder={`Search in ${activeFolderObj.name}...`}
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

              <div className="flex items-center gap-2">
                {/* Category Dropdown */}
                {availableCategories.length > 0 && (
                  <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={selectedCategory || ''}
                      onChange={(e) => setSelectedCategory(e.target.value || null)}
                      className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer capitalize"
                    >
                      <option value="" className="bg-slate-900 text-slate-200">All Categories</option>
                      {availableCategories.map((cat) => (
                        <option key={cat} value={cat} className="bg-slate-900 text-slate-200 capitalize">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Sort dropdown */}
                <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
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

            {/* Folder Prompts Body */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeFolderPrompts.length === 0 ? (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-950/60 border border-indigo-500/20 text-indigo-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">No prompts in this collection yet</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Create a custom prompt directly inside <strong className="text-indigo-300">{activeFolderObj.name}</strong> or use AI Build.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        const presetFolderId = activeFolderId !== 'all' && activeFolderId !== 'favorites' ? activeFolderId : null;
                        setActiveFolderId(null);
                        openEditor({
                          id: 'prompt-' + Math.random().toString(36).substring(2, 9),
                          title: '',
                          description: '',
                          content: '',
                          folderId: presetFolderId,
                          category: 'general',
                          tags: [],
                          variables: [],
                          isFavorite: false,
                          usageCount: 0,
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                        });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition cursor-pointer shadow"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Create Prompt in {activeFolderObj.name}
                    </button>
                    <button
                      onClick={() => {
                        setActiveFolderId(null);
                        openTool('aibuild');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      AI Build
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeFolderPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      onRefresh={loadData}
                      onAddToBoard={(p) => setPromptToAddToBoard(p)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-800 p-3 bg-slate-900/90 flex items-center justify-between shrink-0">
              <button
                onClick={() => setActiveFolderId(null)}
                className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-xl px-3.5 py-2 transition cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-indigo-400" />
                <span>Return to Library Collections</span>
              </button>
              <span className="text-[11px] text-slate-400 font-medium">
                {activeFolderPrompts.length} {activeFolderPrompts.length === 1 ? 'prompt' : 'prompts'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Folder Creation / Editing Modal with Icon Picker */}
      {isFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow">
                  <FolderPlus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {editingFolder ? 'Edit Folder' : 'Create New Folder'}
                </h3>
              </div>
              <button
                onClick={() => setIsFolderModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFolder} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Folder Name *
                </label>
                <input
                  type="text"
                  required
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="e.g. Sales Sequences, Security Audits..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={folderDesc}
                  onChange={(e) => setFolderDesc(e.target.value)}
                  placeholder="e.g. Prompts for customer onboarding and retention"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Icon & Color Selector */}
              <div className="pt-1">
                <IconPicker
                  selectedIcon={folderIcon}
                  onSelectIcon={setFolderIcon}
                  selectedColor={folderColor}
                  onSelectColor={setFolderColor}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFolderModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-xs font-bold text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 transition active:scale-95 cursor-pointer"
                >
                  {editingFolder ? 'Save Changes' : 'Create Folder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Folder Confirmation Dialog */}
      {folderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl text-slate-100">
            <h3 className="text-sm font-bold text-white">Delete Folder "{folderToDelete.name}"?</h3>
            <p className="mt-2 text-xs text-slate-400">
              The folder will be deleted, but all prompts inside it will remain in your library.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setFolderToDelete(null)}
                className="rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteFolder(folderToDelete)}
                className="rounded-xl bg-rose-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-rose-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add To Board Modal */}
      {promptToAddToBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
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
                    className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-800/60 p-3 text-left hover:border-indigo-500/50 hover:bg-slate-800 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: b.color || '#6366f1' }}
                      />
                      <span className="text-xs font-semibold text-slate-200">{b.title}</span>
                    </div>
                    {isPinned ? (
                      <span className="text-[10px] text-emerald-400 font-medium">Already on board</span>
                    ) : (
                      <span className="text-[10px] text-indigo-400 font-medium">+ Pin</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
