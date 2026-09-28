import React, { useRef } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useUIStore } from '../../store/useUIStore';
import { db } from '../../db/database';
import { PWAInstallButton } from '../common/PWAInstallButton';
import {
  Settings,
  Download,
  Upload,
  Sun,
  Moon,
  Type,
  Trash2,
  Package,
  HardDrive,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    theme,
    toggleTheme,
    fontSize,
    setFontSize,
    autoCopyOnGenerate,
    setAutoCopy,
    confirmDeletions,
    setConfirmDeletions,
  } = useThemeStore();

  const { addToast } = useUIStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportFullLibrary = async () => {
    const prompts = await db.prompts.toArray();
    const boards = await db.boards.toArray();
    const folders = await db.folders.toArray();
    const chains = await db.chains.toArray();
    const userComponents = await db.userComponents.toArray();

    const backup = {
      app: 'Prompt Library Pro Web',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      data: {
        prompts,
        boards,
        folders,
        chains,
        userComponents,
      },
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-pro-library-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Full library backup exported',
      description: `${prompts.length} prompts, ${boards.length} boards`,
    });
  };

  const handleExportPromptPack = async () => {
    const prompts = await db.prompts.toArray();
    const pack = {
      name: 'Curated Prompt Pack',
      exportedAt: new Date().toISOString(),
      prompts: prompts.map((p) => ({
        title: p.title,
        description: p.description,
        content: p.content,
        category: p.category,
        tags: p.tags,
        variables: p.variables,
      })),
    };

    const blob = new Blob([JSON.stringify(pack, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `curated-prompt-pack.json`;
    a.click();
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Prompt Pack generated & downloaded',
      description: `${prompts.length} prompts included`,
    });
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      let importedPromptsCount = 0;

      if (parsed.data?.prompts && Array.isArray(parsed.data.prompts)) {
        await db.prompts.bulkPut(parsed.data.prompts);
        importedPromptsCount = parsed.data.prompts.length;
      } else if (parsed.prompts && Array.isArray(parsed.prompts)) {
        // Prompt pack format
        const items = parsed.prompts.map((p: any) => ({
          ...p,
          id: p.id || 'prompt-' + Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          usageCount: 0,
          isFavorite: false,
        }));
        await db.prompts.bulkPut(items);
        importedPromptsCount = items.length;
      }

      if (parsed.data?.boards && Array.isArray(parsed.data.boards)) {
        await db.boards.bulkPut(parsed.data.boards);
      }
      if (parsed.data?.folders && Array.isArray(parsed.data.folders)) {
        await db.folders.bulkPut(parsed.data.folders);
      }
      if (parsed.data?.chains && Array.isArray(parsed.data.chains)) {
        await db.chains.bulkPut(parsed.data.chains);
      }

      addToast({
        type: 'success',
        title: 'Import completed successfully',
        description: `Imported ${importedPromptsCount} prompts into local database`,
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Import failed',
        description: 'Invalid JSON file structure',
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleResetDatabase = async () => {
    const ok = window.confirm(
      'WARNING: This will delete all custom prompts, boards, and folders from IndexedDB and re-seed defaults. Proceed?'
    );
    if (!ok) return;

    await db.prompts.clear();
    await db.boards.clear();
    await db.folders.clear();
    await db.chains.clear();
    await db.history.clear();
    await db.settings.clear();

    addToast({
      type: 'info',
      title: 'Database wiped. Reloading application...',
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Settings & Data</h2>
            <p className="text-xs text-slate-400">
              Offline preferences, themes, data backup and restore
            </p>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 space-y-3.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Appearance & Typography
        </h3>

        {/* Theme */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-200">Color Theme</p>
            <p className="text-[11px] text-slate-400">Switch between dark and light themes</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:text-white transition"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Dark Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Light Theme</span>
              </>
            )}
          </button>
        </div>

        {/* Font size */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
          <div>
            <p className="text-xs font-semibold text-slate-200">Editor Font Size</p>
            <p className="text-[11px] text-slate-400">Adjust monospace readability in editor</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['sm', 'base', 'lg'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium uppercase transition ${
                  fontSize === sz
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Preferences */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 space-y-3.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Workflow Preferences
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-200">Delete Confirmation</p>
            <p className="text-[11px] text-slate-400">Ask before deleting prompts or boards</p>
          </div>
          <input
            type="checkbox"
            checked={confirmDeletions}
            onChange={(e) => setConfirmDeletions(e.target.checked)}
            className="rounded text-indigo-600 h-4 w-4"
          />
        </div>

        <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
          <div>
            <p className="text-xs font-semibold text-slate-200">Auto-Copy on Generate</p>
            <p className="text-[11px] text-slate-400">Copy output automatically when using tools</p>
          </div>
          <input
            type="checkbox"
            checked={autoCopyOnGenerate}
            onChange={(e) => setAutoCopy(e.target.checked)}
            className="rounded text-indigo-600 h-4 w-4"
          />
        </div>
      </div>

      {/* Import / Export Backup */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 space-y-3.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Data Backup & Portability
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={handleExportFullLibrary}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 p-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
          >
            <HardDrive className="w-4 h-4 text-indigo-400" />
            <span>Export Full Backup (JSON)</span>
          </button>

          <button
            onClick={handleExportPromptPack}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 p-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
          >
            <Package className="w-4 h-4 text-emerald-400" />
            <span>Export Prompt Pack</span>
          </button>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-indigo-500/40 bg-indigo-950/40 p-3 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/40 transition"
          >
            <Upload className="w-4 h-4" />
            <span>Import JSON / Prompt Pack</span>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-3xl border border-rose-900/40 bg-rose-950/20 p-4 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">
          Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-200">Factory Reset Database</p>
            <p className="text-[11px] text-slate-400">Wipe IndexedDB and reload defaults</p>
          </div>
          <button
            onClick={handleResetDatabase}
            className="flex items-center gap-1.5 rounded-xl border border-rose-800/80 bg-rose-950/80 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-900 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Database</span>
          </button>
        </div>
      </div>
    </div>
  );
};
