import React, { useState, useEffect } from 'react';
import type { PromptChain, ChainStep } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import { substituteVariables } from '../../hooks/useVariables';
import {
  X,
  Link,
  Plus,
  Trash2,
  Play,
  Save,
  Download,
  Copy,
  Check,
  ArrowDown,
  Layers,
  Sparkles,
} from 'lucide-react';

export const PromptChainView: React.FC = () => {
  const { activeTool, closeTool, addToast } = useUIStore();

  const [chains, setChains] = useState<PromptChain[]>([]);
  const [selectedChainId, setSelectedChainId] = useState<string | null>(null);

  const [chainName, setChainName] = useState('New Prompt Chain');
  const [chainDesc, setChainDesc] = useState('Sequential multi-step prompt execution pipeline');
  const [steps, setSteps] = useState<ChainStep[]>([
    {
      id: 'step-1',
      title: 'Step 1: Raw Discovery & Extraction',
      description: 'Extracts core entities, statistics, and pain points',
      prompt: `Analyze the input data:\n\n{{input}}\n\nExtract the top 3 core findings and any latent contradictions.`,
      outputKey: 'findings',
    },
    {
      id: 'step-2',
      title: 'Step 2: Strategic Synthesis & Critique',
      description: 'Critiques the findings and formulates strategic hypotheses',
      prompt: `Review the extracted findings:\n\n{{input}}\n\nPerform a SWOT analysis and identify high-leverage opportunities.`,
      outputKey: 'strategy',
    },
    {
      id: 'step-3',
      title: 'Step 3: Executive Deliverable',
      description: 'Converts the strategy into a crisp executive action memo',
      prompt: `Based on the strategic analysis:\n\n{{input}}\n\nWrite a 3-paragraph executive memo with top 3 immediate action items.`,
      outputKey: 'executive_memo',
    },
  ]);

  // Simulation runner state
  const [initialInput, setInitialInput] = useState(
    'Company X observed a 24% customer churn in Q3 among mid-market accounts. Exit surveys cite lack of integrations and slow onboarding response times.'
  );
  const [simulationOutputs, setSimulationOutputs] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    db.chains.toArray().then((items) => {
      setChains(items);
      if (items.length > 0 && !selectedChainId) {
        setSelectedChainId(items[0].id);
        setChainName(items[0].name);
        setChainDesc(items[0].description);
        setSteps(items[0].steps);
      }
    });
  }, [activeTool]);

  if (activeTool !== 'chain') return null;

  const handleAddStep = () => {
    const nextIdx = steps.length + 1;
    const newStep: ChainStep = {
      id: 'step-' + Math.random().toString(36).substring(2, 9),
      title: `Step ${nextIdx}: Analysis Phase`,
      description: 'Refines and transforms previous step output',
      prompt: `Review the previous results:\n\n{{input}}\n\nProvide next-level refinement and concrete recommendations.`,
      outputKey: `output_${nextIdx}`,
    };
    setSteps([...steps, newStep]);
  };

  const handleUpdateStep = (index: number, field: keyof ChainStep, val: string) => {
    const copy = [...steps];
    copy[index] = { ...copy[index], [field]: val };
    setSteps(copy);
  };

  const handleDeleteStep = (index: number) => {
    if (steps.length <= 1) {
      addToast({ type: 'error', title: 'A chain must have at least one step' });
      return;
    }
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSaveChain = async () => {
    const chainId = selectedChainId || 'chain-' + Math.random().toString(36).substring(2, 9);
    const item: PromptChain = {
      id: chainId,
      name: chainName.trim() || 'Untitled Chain',
      description: chainDesc.trim(),
      steps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await db.chains.put(item);
    setSelectedChainId(item.id);
    addToast({ type: 'success', title: 'Chain saved to library', description: item.name });
    db.chains.toArray().then(setChains);
  };

  const handleRunSimulation = async () => {
    setIsRunning(true);
    setSimulationOutputs({});

    let currentInput = initialInput;
    const outputs: Record<string, string> = {};

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      // Simulate realistic rule-based text transform for step execution
      const promptRendered = substituteVariables(step.prompt, { input: currentInput });

      // Artificial deterministic simulation transform
      await new Promise((r) => setTimeout(r, 600));

      const stepResult = `[SIMULATED OUTPUT - ${step.title}]\n\nProcessed input of ${currentInput.length} chars.\nKey Action: ${step.description}\n\nDeliverable Result:\n- Core finding validated against hypothesis.\n- Transformed into: "${step.outputKey}" output payload for step continuation.`;

      outputs[step.id] = stepResult;
      currentInput = stepResult;
      setSimulationOutputs({ ...outputs });
    }

    setIsRunning(false);
    addToast({ type: 'success', title: 'Chain simulation completed successfully!' });
  };

  const handleExportChain = () => {
    const data = {
      name: chainName,
      description: chainDesc,
      steps,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chainName.toLowerCase().replace(/\s+/g, '-')}.chain.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ type: 'success', title: 'Chain exported as JSON' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-4xl h-[92vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-3 sm:p-4 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-600 text-white">
              <Link className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Visual Prompt Chain Pipeline</h3>
              <p className="text-xs text-slate-400">Sequential multi-step workflow editor</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSaveChain}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
            <button
              onClick={handleExportChain}
              className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-white"
              title="Export Chain"
            >
              <Download className="w-4 h-4" />
            </button>
            <button onClick={closeTool} className="rounded-xl p-1.5 text-slate-400 hover:text-white ml-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chain Title & Description inputs */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-950/60 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={chainName}
            onChange={(e) => setChainName(e.target.value)}
            placeholder="Chain Name..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-white focus:outline-none"
          />
          <input
            type="text"
            value={chainDesc}
            onChange={(e) => setChainDesc(e.target.value)}
            placeholder="Chain purpose / workflow notes..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          />
        </div>

        {/* Main interactive workflow */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Steps column */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pipeline Steps ({steps.length})
              </span>
              <button
                onClick={handleAddStep}
                className="flex items-center gap-1 rounded-lg border border-dashed border-indigo-500/50 bg-indigo-950/40 px-2.5 py-1 text-xs text-indigo-300 hover:bg-indigo-950/70"
              >
                <Plus className="w-3 h-3" />
                <span>Add Step</span>
              </button>
            </div>

            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600/30 text-indigo-300 font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                        className="flex-1 bg-transparent font-semibold text-xs text-white focus:outline-none"
                      />
                    </div>

                    <button
                      onClick={() => handleDeleteStep(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Remove Step"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={step.description || ''}
                    onChange={(e) => handleUpdateStep(idx, 'description', e.target.value)}
                    placeholder="Short description of this transformation step..."
                    className="w-full bg-transparent text-[11px] text-slate-400 border-b border-slate-800/80 pb-1 focus:outline-none"
                  />

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">
                      Prompt Template (Use <code className="text-indigo-400">{'{{input}}'}</code> for previous output)
                    </label>
                    <textarea
                      rows={3}
                      value={step.prompt}
                      onChange={(e) => handleUpdateStep(idx, 'prompt', e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {simulationOutputs[step.id] && (
                    <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-2.5 font-mono text-[10px] text-indigo-200">
                      <p className="font-semibold text-indigo-300 mb-0.5">Simulated Output:</p>
                      <p className="whitespace-pre-wrap">{simulationOutputs[step.id]}</p>
                    </div>
                  )}
                </div>

                {idx < steps.length - 1 && (
                  <div className="flex justify-center -my-1 text-slate-600">
                    <ArrowDown className="w-4 h-4 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Test Runner / Simulation Sidebar */}
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/90 p-4 flex flex-col justify-between shrink-0">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pipeline Simulator</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Test the end-to-end execution flow by feeding sample raw data into Step 1.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Initial Input Payload
                </label>
                <textarea
                  rows={5}
                  value={initialInput}
                  onChange={(e) => setInitialInput(e.target.value)}
                  placeholder="Enter initial mock context data..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 font-mono text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-emerald-500 hover:to-teal-500 transition active:scale-[0.99] disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Executing Pipeline...' : 'Run Simulation'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
