import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../../data/categories';
import type { ComponentBlock } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import { X, Search, Plus, Boxes } from 'lucide-react';

interface ComponentInserterModalProps {
  onInsert: (contentToInsert: string) => void;
}

export const ComponentInserterModal: React.FC<ComponentInserterModalProps> = ({ onInsert }) => {
  const { isComponentPickerOpen, setIsComponentPickerOpen, addToast } = useUIStore();
  const [selectedCatId, setSelectedCatId] = useState<string>('core');
  const [blocks, setBlocks] = useState<ComponentBlock[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isComponentPickerOpen) return;

    if (selectedCatId === 'frameworks') {
      db.frameworks.toArray().then((items) => {
        setBlocks(
          items.map((f) => ({
            id: f.id,
            categoryId: 'frameworks',
            name: f.name,
            description: f.description,
            content: f.content,
            tags: f.tags,
          }))
        );
      });
    } else {
      db.components.where('categoryId').equals(selectedCatId).toArray().then(setBlocks);
    }
  }, [selectedCatId, isComponentPickerOpen]);

  if (!isComponentPickerOpen) return null;

  const filteredBlocks = blocks.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.content.toLowerCase().includes(q)
    );
  });

  const handleSelectBlock = (b: ComponentBlock) => {
    onInsert(`\n\n${b.content}\n`);
    setIsComponentPickerOpen(false);
    addToast({
      type: 'success',
      title: 'Component inserted into prompt',
      description: b.name,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-2xl h-[85vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Insert Component Block</h3>
          </div>
          <button
            onClick={() => setIsComponentPickerOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-800 bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Pills horizontal scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-2.5 border-b border-slate-800/80 bg-slate-950 text-xs no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`shrink-0 rounded-xl px-3 py-1.5 font-medium transition ${
                selectedCatId === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Blocks list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredBlocks.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-10">No blocks found.</p>
          ) : (
            filteredBlocks.map((b) => (
              <div
                key={b.id}
                onClick={() => handleSelectBlock(b)}
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3 hover:border-indigo-500/50 hover:bg-slate-950 transition cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-semibold text-slate-100 group-hover:text-indigo-300">
                    {b.name}
                  </h4>
                  <button className="flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-[11px] font-medium text-white shadow hover:bg-indigo-500">
                    <Plus className="w-3 h-3" />
                    <span>Insert</span>
                  </button>
                </div>
                {b.description && (
                  <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">{b.description}</p>
                )}
                <div className="mt-2 rounded-lg bg-slate-900 p-2 font-mono text-[10px] text-slate-400 line-clamp-2">
                  {b.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
