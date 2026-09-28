import React from 'react';
import { useUIStore, type ActiveToolModal } from '../../store/useUIStore';
import {
  Wand2,
  Sparkles,
  Scissors,
  Globe2,
  Cpu,
  Layers,
  Link,
  Bot,
  ArrowRight,
} from 'lucide-react';

export const ToolsHubView: React.FC = () => {
  const { openTool } = useUIStore();

  const tools: {
    id: ActiveToolModal;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    badge: string;
  }[] = [
    {
      id: 'generator',
      title: 'Prompt Generator',
      description: 'Combinatorial generation from domain, thinking techniques, tone, and models.',
      icon: Wand2,
      gradient: 'from-blue-600 to-indigo-600',
      badge: 'Synthesizer',
    },
    {
      id: 'optimizer',
      title: 'Prompt Optimizer',
      description: 'Systematic enhancement of clarity, specificity, constraints, CoT, and boundary rubrics.',
      icon: Sparkles,
      gradient: 'from-indigo-600 to-purple-600',
      badge: 'Refinement',
    },
    {
      id: 'simplifier',
      title: 'Prompt Simplifier',
      description: 'Light, Balanced, or Aggressive removal of filler words, pleasantries, and redundancy.',
      icon: Scissors,
      gradient: 'from-purple-600 to-pink-600',
      badge: 'Token Saver',
    },
    {
      id: 'translator',
      title: 'Prompt Translator',
      description: 'Translate prompts to 11+ languages while strictly preserving [[variable]] and {{syntax}} tags.',
      icon: Globe2,
      gradient: 'from-emerald-600 to-teal-600',
      badge: 'Multilingual',
    },
    {
      id: 'adapter',
      title: 'Model Adapter',
      description: 'Adapt syntax for Anthropic Claude (XML), OpenAI GPT (Developer tags), Grok, or Gemini.',
      icon: Cpu,
      gradient: 'from-cyan-600 to-sky-600',
      badge: 'Model Tuning',
    },
    {
      id: 'splicer',
      title: 'Prompt Splicer',
      description: 'Merge and graft modular components (Role, Task, Constraints, Output) from 2+ prompts.',
      icon: Layers,
      gradient: 'from-amber-600 to-orange-600',
      badge: 'Hybrid Fusion',
    },
    {
      id: 'chain',
      title: 'Prompt Chain Pipeline',
      description: 'Visual step-by-step pipeline where each step consumes {{previous_output}} with test runner.',
      icon: Link,
      gradient: 'from-fuchsia-600 to-rose-600',
      badge: 'Workflow Pipeline',
    },
    {
      id: 'aibuild',
      title: 'AI Build (Natural Spec)',
      description: 'Describe your goal in plain human words; system assembles a world-class prompt with components.',
      icon: Bot,
      gradient: 'from-violet-600 to-indigo-700',
      badge: 'Master Blueprint',
    },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Hero Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 p-4 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="rounded-md bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            Offline Rule-Based Studio
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Prompt Engineering Toolsuite
        </h2>
        <p className="mt-1 text-xs text-slate-300 max-w-xl leading-relaxed">
          100% offline algorithms, template combinatorics, syntax transformers, and visual pipelines. No cloud APIs or external keys required.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              onClick={() => openTool(tool.id)}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-200 cursor-pointer active:scale-[0.99]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr ${tool.gradient} text-white shadow-md group-hover:scale-105 transition`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition">
                  {tool.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:text-indigo-300">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
