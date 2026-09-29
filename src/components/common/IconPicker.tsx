import React from 'react';
import {
  Folder,
  Layers,
  Briefcase,
  Code,
  Sparkles,
  Brain,
  Bookmark,
  FileText,
  Terminal,
  Database,
  Zap,
  Bot,
  PenTool,
  Shield,
  Rocket,
  Lightbulb,
  Compass,
  Package,
  Archive,
  Search,
  Globe,
  Star,
  Tag,
  Flame,
  Boxes,
  Layout,
  MessageSquare,
  Cpu,
  Workflow,
  GitBranch,
  Target,
  Wrench,
  ShieldCheck,
  Award,
  BookOpen,
  FolderKanban,
  Check,
} from 'lucide-react';

export interface IconOption {
  name: string;
  label: string;
  component: React.ComponentType<{ className?: string }>;
}

export const AVAILABLE_ICONS: IconOption[] = [
  { name: 'Folder', label: 'Folder', component: Folder },
  { name: 'FolderKanban', label: 'Kanban', component: FolderKanban },
  { name: 'Layers', label: 'Layers', component: Layers },
  { name: 'Briefcase', label: 'Briefcase', component: Briefcase },
  { name: 'Code', label: 'Code', component: Code },
  { name: 'Terminal', label: 'Terminal', component: Terminal },
  { name: 'Database', label: 'Database', component: Database },
  { name: 'Brain', label: 'Brain', component: Brain },
  { name: 'Sparkles', label: 'Sparkles', component: Sparkles },
  { name: 'Zap', label: 'Zap', component: Zap },
  { name: 'Bot', label: 'Bot', component: Bot },
  { name: 'Rocket', label: 'Rocket', component: Rocket },
  { name: 'Shield', label: 'Shield', component: Shield },
  { name: 'ShieldCheck', label: 'Security', component: ShieldCheck },
  { name: 'PenTool', label: 'Writing', component: PenTool },
  { name: 'FileText', label: 'Document', component: FileText },
  { name: 'Bookmark', label: 'Bookmark', component: Bookmark },
  { name: 'Star', label: 'Star', component: Star },
  { name: 'Lightbulb', label: 'Idea', component: Lightbulb },
  { name: 'Compass', label: 'Compass', component: Compass },
  { name: 'Package', label: 'Package', component: Package },
  { name: 'Archive', label: 'Archive', component: Archive },
  { name: 'Search', label: 'Search', component: Search },
  { name: 'Globe', label: 'Globe', component: Globe },
  { name: 'Flame', label: 'Hot', component: Flame },
  { name: 'Tag', label: 'Tag', component: Tag },
  { name: 'Boxes', label: 'Boxes', component: Boxes },
  { name: 'Layout', label: 'Layout', component: Layout },
  { name: 'MessageSquare', label: 'Chat', component: MessageSquare },
  { name: 'Workflow', label: 'Workflow', component: Workflow },
  { name: 'GitBranch', label: 'Branch', component: GitBranch },
  { name: 'Target', label: 'Target', component: Target },
  { name: 'Cpu', label: 'CPU', component: Cpu },
  { name: 'Wrench', label: 'Tools', component: Wrench },
  { name: 'Award', label: 'Award', component: Award },
  { name: 'BookOpen', label: 'Book', component: BookOpen },
];

export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = AVAILABLE_ICONS.reduce(
  (acc, curr) => {
    acc[curr.name] = curr.component;
    return acc;
  },
  {} as Record<string, React.ComponentType<{ className?: string }>>
);

export interface ColorPreset {
  id: string;
  name: string;
  color: string; // hex
  gradient: string; // tailwind gradient
}

export const COLOR_PRESETS: ColorPreset[] = [
  { id: 'indigo', name: 'Indigo', color: '#6366f1', gradient: 'from-blue-600 to-indigo-600' },
  { id: 'violet', name: 'Violet', color: '#8b5cf6', gradient: 'from-indigo-600 to-violet-600' },
  { id: 'purple', name: 'Purple', color: '#a855f7', gradient: 'from-violet-600 to-purple-600' },
  { id: 'pink', name: 'Pink', color: '#ec4899', gradient: 'from-purple-600 to-pink-600' },
  { id: 'rose', name: 'Rose', color: '#f43f5e', gradient: 'from-pink-600 to-rose-600' },
  { id: 'amber', name: 'Amber', color: '#f59e0b', gradient: 'from-amber-500 to-orange-600' },
  { id: 'orange', name: 'Orange', color: '#ea580c', gradient: 'from-orange-600 to-red-600' },
  { id: 'emerald', name: 'Emerald', color: '#10b981', gradient: 'from-emerald-600 to-teal-600' },
  { id: 'teal', name: 'Teal', color: '#14b8a6', gradient: 'from-teal-600 to-cyan-600' },
  { id: 'cyan', name: 'Cyan', color: '#06b6d4', gradient: 'from-cyan-600 to-sky-600' },
  { id: 'blue', name: 'Blue', color: '#3b82f6', gradient: 'from-sky-600 to-blue-600' },
  { id: 'slate', name: 'Slate', color: '#64748b', gradient: 'from-zinc-700 to-slate-800' },
];

export function getIconComponent(iconName?: string): React.ComponentType<{ className?: string }> {
  if (!iconName) return Folder;
  return ICON_MAP[iconName] || Folder;
}

export function getColorGradient(colorHexOrPreset?: string): string {
  if (!colorHexOrPreset) return 'from-blue-600 to-indigo-600';
  const preset = COLOR_PRESETS.find(
    (p) => p.id === colorHexOrPreset || p.color.toLowerCase() === colorHexOrPreset.toLowerCase()
  );
  if (preset) return preset.gradient;
  if (colorHexOrPreset.startsWith('from-')) return colorHexOrPreset;
  return 'from-blue-600 to-indigo-600';
}

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
  selectedColor: string;
  onSelectColor: (colorHex: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  onSelectIcon,
  selectedColor,
  onSelectColor,
}) => {
  const SelectedIconComp = getIconComponent(selectedIcon);
  const gradient = getColorGradient(selectedColor);

  return (
    <div className="space-y-3">
      {/* Live Preview */}
      <div className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-800 bg-slate-950/80">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr ${gradient} text-white shadow-md`}
        >
          <SelectedIconComp className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <p className="font-semibold text-slate-200">Selected Icon & Color</p>
          <p className="text-[11px] text-slate-400">
            Icon: <span className="font-mono text-indigo-300">{selectedIcon || 'Folder'}</span> · Color:{' '}
            <span className="font-mono text-indigo-300">{selectedColor}</span>
          </p>
        </div>
      </div>

      {/* Color Palette Presets */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">Color Theme</label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {COLOR_PRESETS.map((p) => {
            const isSelected = selectedColor.toLowerCase() === p.color.toLowerCase();
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectColor(p.color)}
                className={`flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr ${p.gradient} transition shrink-0 cursor-pointer ${
                  isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110 shadow' : 'opacity-80 hover:opacity-100'
                }`}
                title={p.name}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Icon Grid */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">Choose Icon</label>
        <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 max-h-36 overflow-y-auto p-1 rounded-xl border border-slate-800 bg-slate-950/50">
          {AVAILABLE_ICONS.map((ico) => {
            const IconComp = ico.component;
            const isSelected = selectedIcon === ico.name;
            return (
              <button
                key={ico.name}
                type="button"
                onClick={() => onSelectIcon(ico.name)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/80 text-white shadow'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
                title={ico.label}
              >
                <IconComp className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
