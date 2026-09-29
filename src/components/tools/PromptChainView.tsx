import React, { useState, useEffect, useMemo } from 'react';
import type { PromptChain, ChainStep } from '../../types';
import { db } from '../../db/database';
import { useUIStore } from '../../store/useUIStore';
import { substituteVariables } from '../../hooks/useVariables';
import { SKILLS_REGISTRY, SkillDefinition } from '../../skills/skillsRegistry';
import {
  downloadChainAsMarkdown,
  markdownToChain,
} from '../../utils/markdownExporter';
import {
  X,
  Link as LinkIcon,
  Plus,
  Trash2,
  Play,
  Save,
  Download,
  Upload,
  Copy,
  Check,
  ChevronUp,
  ChevronDown,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Wand2,
  Code2,
  ListFilter,
  FileText,
  SlidersHorizontal,
  FolderOpen,
  RotateCcw,
  Eye,
  Settings2,
} from 'lucide-react';

// Extract all {{var}} or [[var]] placeholders from a prompt string
function extractVariables(text: string): string[] {
  const matches = text.match(/\{\{([a-zA-Z0-9_]+)\}\}|\[\[([a-zA-Z0-9_]+)\]\]/g) || [];
  const vars = new Set<string>();
  matches.forEach((m) => {
    const cleaned = m.replace(/^\{\{|\}\}$|^\[\[|\]\]$/g, '').trim();
    if (cleaned) vars.add(cleaned);
  });
  return Array.from(vars);
}

// Built-in starter chain presets
const STARTER_PRESETS: PromptChain[] = [
  {
    id: 'preset-swot-memo',
    name: 'Strategic SWOT & Executive Memo',
    description: '3-step pipeline: Raw entity discovery ➔ SWOT & Hypotheses ➔ Executive Action Memo',
    steps: [
      {
        id: 'step-swot-1',
        title: 'Step 1: Entity & Fact Discovery',
        description: 'Extracts core metrics, pain points, and latent facts',
        prompt: `Analyze the provided situation:\n\n{{user_input}}\n\nExtract the top 5 core facts, quantitative metrics, and explicit pain points.`,
        outputKey: 'findings',
        appliedSkillIds: ['role-calibration', 'definition-of-done'],
      },
      {
        id: 'step-swot-2',
        title: 'Step 2: SWOT & Strategic Tradeoffs',
        description: 'Synthesizes findings into SWOT matrix and high-leverage hypotheses',
        prompt: `Review the extracted findings:\n\n{{findings}}\n\nPerform a comprehensive SWOT analysis and outline 3 high-leverage strategic opportunities.`,
        outputKey: 'strategy',
        appliedSkillIds: ['swot-to-tows', 'tradeoff-hierarchy'],
      },
      {
        id: 'step-swot-3',
        title: 'Step 3: Executive Action Memo',
        description: 'Converts strategy into a crisp executive decision deliverable',
        prompt: `Based on the strategic SWOT analysis:\n\n{{strategy}}\n\nDraft an executive action memo containing:\n1. Situation Summary\n2. Key Decision Matrix\n3. Top 3 Immediate P0 Action Items with owners.`,
        outputKey: 'executive_memo',
        appliedSkillIds: ['action-items-matrix'],
      },
    ],
    testInputs: {
      user_input: 'Company X observed a 24% customer churn in Q3 among mid-market accounts. Exit surveys cite lack of CRM integrations, manual reporting overhead, and slow SLA response times from customer support.',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'preset-5-whys',
    name: '5-Whys Incident Retrospective',
    description: 'SRE incident postmortem pipeline: Timeline reconstruction ➔ Root Cause ➔ Prevention Plan',
    steps: [
      {
        id: 'step-retro-1',
        title: 'Step 1: Timeline & Event Reconstruction',
        description: 'Reconstructs incident milestones from raw logs and observations',
        prompt: `Reconstruct a chronological incident timeline from these operational logs:\n\n{{user_input}}\n\nHighlight T0 (Detection), T1 (Triage), T2 (Mitigation), and T3 (Permanent Fix).`,
        outputKey: 'timeline',
        appliedSkillIds: ['timeline-reconstruction'],
      },
      {
        id: 'step-retro-2',
        title: 'Step 2: 5-Whys Diagnostic Chain',
        description: 'Applies 5-Whys protocol to transition from symptoms to architectural deficits',
        prompt: `Based on the reconstructed timeline:\n\n{{timeline}}\n\nExecute a rigorous 5-Whys diagnostic chain to identify the root process, testing, or architectural flaws.`,
        outputKey: 'root_causes',
        appliedSkillIds: ['root-cause-analysis', 'blameless-principle'],
      },
      {
        id: 'step-retro-3',
        title: 'Step 3: Action Items & Prevention Matrix',
        description: 'Establishes P0/P1 corrective actions and SLO guardrails',
        prompt: `Using the root cause analysis:\n\n{{root_causes}}\n\nGenerate a blameless postmortem action plan matrix with P0/P1 ticket specifications, automated test additions, and alert threshold updates.`,
        outputKey: 'action_plan',
        appliedSkillIds: ['action-items-matrix', 'blameless-retrospective-framework'],
      },
    ],
    testInputs: {
      user_input: '[14:02 UTC] Alert fired: High API Latency 504 on /v1/checkout. [14:05 UTC] SRE on-call paged. [14:12 UTC] Database CPU spiked to 100% due to missing index on active_subscriptions table after deployment v2.14. [14:25 UTC] Rolled back deployment. Latency normalized.',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'preset-code-refactor',
    name: 'Code Vulnerability & Refactoring Suite',
    description: 'Engineering pipeline: Code audit ➔ Clean Refactoring ➔ Unit Test Specs',
    steps: [
      {
        id: 'step-code-1',
        title: 'Step 1: Vulnerability & Code Smell Audit',
        description: 'Audits source code for type errors, memory leaks, and architectural anti-patterns',
        prompt: `Perform an exhaustive senior code audit on this snippet:\n\n{{user_input}}\n\nIdentify performance bottlenecks, type safety deficits, security risks, and code smells.`,
        outputKey: 'audit_report',
        appliedSkillIds: ['code-audit-smells'],
      },
      {
        id: 'step-code-2',
        title: 'Step 2: Refactored Production Code',
        description: 'Rewrites code applying clean architecture and type safety invariants',
        prompt: `Based on the code audit report:\n\n{{audit_report}}\n\nProvide the complete, refactored production implementation addressing all identified issues. Ensure strict type safety and modern idioms.`,
        outputKey: 'clean_code',
        appliedSkillIds: ['type-safety-contracts'],
      },
      {
        id: 'step-code-3',
        title: 'Step 3: Regression Unit Test Suite',
        description: 'Generates comprehensive test specs covering edge cases and regression risks',
        prompt: `For the refactored code:\n\n{{clean_code}}\n\nWrite a complete unit test suite covering happy paths, boundary conditions, and mock failure modes.`,
        outputKey: 'test_suite',
        appliedSkillIds: ['regression-test-specs'],
      },
    ],
    testInputs: {
      user_input: `async function processPayment(req, res) {\n  let user = await db.query("SELECT * FROM users WHERE id = " + req.body.id);\n  if (user) {\n    let charge = await stripe.charges.create({ amount: req.body.amount, currency: 'usd' });\n    res.send({ status: 'ok', charge });\n  }\n}`,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Quick skill picker categories
const QUICK_SKILLS = [
  { id: 'role-calibration', name: 'Role Calibration', desc: 'Sets expert persona & authority bounds' },
  { id: 'chain-of-thought', name: 'Chain-of-Thought', desc: 'Forces step-by-step logical deduction' },
  { id: 'json-schema-strict', name: 'Strict JSON Output', desc: 'Enforces pure JSON schema payload' },
  { id: 'action-items-matrix', name: 'Action Items Matrix', desc: 'Generates structured decision/task tables' },
  { id: 'root-cause-analysis', name: '5-Whys Analysis', desc: 'Drives diagnostic root cause protocol' },
  { id: 'code-audit-smells', name: 'Code Audit & Smells', desc: 'Detects architectural code flaws' },
];

export const PromptChainView: React.FC = () => {
  const { activeTool, closeTool, addToast } = useUIStore();

  // Saved Chains from Database
  const [chains, setChains] = useState<PromptChain[]>([]);
  const [activeChainId, setActiveBoardChainId] = useState<string>('preset-swot-memo');

  // Chain Metadata State
  const [chainName, setChainName] = useState(STARTER_PRESETS[0].name);
  const [chainDesc, setChainDesc] = useState(STARTER_PRESETS[0].description);
  const [steps, setSteps] = useState<ChainStep[]>(STARTER_PRESETS[0].steps);

  // Mobile Viewport Tabs ('builder' | 'inputs' | 'runner')
  const [mobileTab, setMobileTab] = useState<'builder' | 'inputs' | 'runner'>('builder');

  // Test Inputs Map (e.g. { user_input: "...", custom_topic: "..." })
  const [testInputs, setTestInputs] = useState<Record<string, string>>(
    STARTER_PRESETS[0].testInputs || { user_input: '' }
  );

  // Simulation / Execution State
  const [stepOutputs, setStepOutputs] = useState<Record<string, string>>({});
  const [stepStatuses, setStepStatuses] = useState<Record<string, 'idle' | 'running' | 'completed' | 'error'>>({});
  const [stepTimes, setStepTimes] = useState<Record<string, number>>({});
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [runningStepId, setRunningStepId] = useState<string | null>(null);

  // Skill Picker Modal for steps
  const [skillPickerStepIndex, setSkillPickerStepIndex] = useState<number | null>(null);

  // Load Saved Chains from DB
  const loadChains = async () => {
    const items = await db.chains.toArray();
    setChains(items);
  };

  useEffect(() => {
    loadChains();
  }, [activeTool]);

  // Extract all unique variables across all steps
  const allDetectedVariables = useMemo(() => {
    const varsSet = new Set<string>();
    steps.forEach((s) => {
      extractVariables(s.prompt).forEach((v) => varsSet.add(v));
    });
    return Array.from(varsSet);
  }, [steps]);

  // Output keys produced by steps
  const producedOutputKeys = useMemo(() => {
    const keys = new Set<string>();
    steps.forEach((s) => {
      if (s.outputKey.trim()) keys.add(s.outputKey.trim());
    });
    return Array.from(keys);
  }, [steps]);

  // Global input variables (variables requested in steps that are NOT outputs of previous steps)
  const globalInputVariables = useMemo(() => {
    return allDetectedVariables.filter(
      (v) => v !== 'input' && v !== 'previous_output' && !producedOutputKeys.includes(v)
    );
  }, [allDetectedVariables, producedOutputKeys]);

  if (activeTool !== 'chain') return null;

  // Handle switching chains
  const handleSelectChain = (id: string) => {
    setActiveBoardChainId(id);
    setStepOutputs({});
    setStepStatuses({});

    const preset = STARTER_PRESETS.find((p) => p.id === id);
    if (preset) {
      setChainName(preset.name);
      setChainDesc(preset.description);
      setSteps(preset.steps);
      if (preset.testInputs) setTestInputs({ ...preset.testInputs });
      addToast({ type: 'info', title: 'Loaded preset chain', description: preset.name });
      return;
    }

    const saved = chains.find((c) => c.id === id);
    if (saved) {
      setChainName(saved.name);
      setChainDesc(saved.description);
      setSteps(saved.steps);
      if (saved.testInputs) setTestInputs({ ...saved.testInputs });
      addToast({ type: 'info', title: 'Loaded chain', description: saved.name });
    }
  };

  // Create new blank chain
  const handleNewChain = () => {
    const newId = 'chain-' + Math.random().toString(36).substring(2, 9);
    setActiveBoardChainId(newId);
    setChainName('New Custom Pipeline');
    setChainDesc('Multi-step prompt execution workflow');
    setSteps([
      {
        id: 'step-1',
        title: 'Step 1: Input Analysis',
        description: 'Analyzes incoming payload',
        prompt: 'Analyze the following input:\n\n{{user_input}}\n\nProvide core summary and key insights.',
        outputKey: 'step_1_output',
      },
    ]);
    setTestInputs({ user_input: 'Enter sample data here...' });
    setStepOutputs({});
    setStepStatuses({});
    addToast({ type: 'success', title: 'Created new chain' });
  };

  // Add Step
  const handleAddStep = (insertIndex?: number) => {
    const nextNum = steps.length + 1;
    const newStep: ChainStep = {
      id: 'step-' + Math.random().toString(36).substring(2, 9),
      title: `Step ${nextNum}: Transformation Phase`,
      description: 'Processes data from previous step',
      prompt: `Review the previous results:\n\n{{previous_output}}\n\nProvide next-level refinement and actionable output.`,
      outputKey: `step_${nextNum}_output`,
    };

    if (insertIndex !== undefined && insertIndex >= 0) {
      const copy = [...steps];
      copy.splice(insertIndex + 1, 0, newStep);
      setSteps(copy);
    } else {
      setSteps([...steps, newStep]);
    }
  };

  // Move Step Up
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const copy = [...steps];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    setSteps(copy);
  };

  // Move Step Down
  const handleMoveDown = (index: number) => {
    if (index >= steps.length - 1) return;
    const copy = [...steps];
    const temp = copy[index + 1];
    copy[index + 1] = copy[index];
    copy[index] = temp;
    setSteps(copy);
  };

  // Duplicate Step
  const handleCloneStep = (index: number) => {
    const source = steps[index];
    const cloned: ChainStep = {
      ...source,
      id: 'step-' + Math.random().toString(36).substring(2, 9),
      title: `${source.title} (Copy)`,
      outputKey: `${source.outputKey}_copy`,
    };
    const copy = [...steps];
    copy.splice(index + 1, 0, cloned);
    setSteps(copy);
    addToast({ type: 'success', title: 'Step duplicated' });
  };

  // Delete Step
  const handleDeleteStep = (index: number) => {
    if (steps.length <= 1) {
      addToast({ type: 'error', title: 'A chain must contain at least one step' });
      return;
    }
    setSteps(steps.filter((_, i) => i !== index));
  };

  // Update step field
  const handleUpdateStep = (index: number, field: keyof ChainStep, val: any) => {
    const copy = [...steps];
    copy[index] = { ...copy[index], [field]: val };
    setSteps(copy);
  };

  // Apply skill to step
  const handleApplySkillToStep = (stepIndex: number, skillId: string) => {
    const step = steps[stepIndex];
    const skillDef = SKILLS_REGISTRY[skillId];
    if (!skillDef) return;

    // Apply transform or append
    const transformedPrompt = skillDef.transform ? skillDef.transform(step.prompt) : `${step.prompt}\n\n[Applied Skill: ${skillDef.displayName}]`;
    const existingSkillIds = step.appliedSkillIds || [];

    if (!existingSkillIds.includes(skillId)) {
      handleUpdateStep(stepIndex, 'prompt', transformedPrompt);
      handleUpdateStep(stepIndex, 'appliedSkillIds', [...existingSkillIds, skillId]);
      addToast({
        type: 'success',
        title: 'Skill Applied',
        description: `Applied "${skillDef.displayName}" to ${step.title}`,
      });
    }
    setSkillPickerStepIndex(null);
  };

  // Remove skill from step
  const handleRemoveSkillFromStep = (stepIndex: number, skillId: string) => {
    const step = steps[stepIndex];
    const existingSkillIds = step.appliedSkillIds || [];
    handleUpdateStep(
      stepIndex,
      'appliedSkillIds',
      existingSkillIds.filter((id) => id !== skillId)
    );
  };

  // Save Chain to IndexedDB
  const handleSaveChain = async () => {
    const item: PromptChain = {
      id: activeChainId.startsWith('preset-') ? 'chain-' + Math.random().toString(36).substring(2, 9) : activeChainId,
      name: chainName.trim() || 'Untitled Chain',
      description: chainDesc.trim(),
      steps,
      testInputs,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await db.chains.put(item);
    setActiveBoardChainId(item.id);
    addToast({ type: 'success', title: 'Saved to Chain Library', description: item.name });
    loadChains();
  };

  // Export Chain as Markdown (.chain.md)
  const handleExportChain = () => {
    const chainItem: PromptChain = {
      id: activeChainId,
      name: chainName,
      description: chainDesc,
      steps,
      testInputs,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    downloadChainAsMarkdown(chainItem);
    addToast({
      type: 'success',
      title: 'Chain exported as Markdown (.chain.md)',
      description: chainName,
    });
  };

  // Import Chain (Markdown .chain.md or JSON)
  const handleImportChain = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      if (file.name.endsWith('.json')) {
        const parsed = JSON.parse(text);
        if (parsed.steps && Array.isArray(parsed.steps)) {
          setChainName(parsed.name || 'Imported Chain');
          setChainDesc(parsed.description || '');
          setSteps(parsed.steps);
          if (parsed.testInputs) setTestInputs(parsed.testInputs);
          setActiveBoardChainId('chain-' + Math.random().toString(36).substring(2, 9));
          addToast({ type: 'success', title: 'Chain imported from JSON!' });
        } else {
          addToast({ type: 'error', title: 'Invalid JSON chain file' });
        }
      } else {
        const chain = markdownToChain(text);
        setChainName(chain.name || 'Imported Chain');
        setChainDesc(chain.description || '');
        setSteps(chain.steps);
        if (chain.testInputs) setTestInputs(chain.testInputs);
        setActiveBoardChainId(chain.id);
        addToast({ type: 'success', title: 'Chain imported from Markdown (.md)!' });
      }
    } catch {
      addToast({ type: 'error', title: 'Failed to import chain file' });
    }

    e.target.value = '';
  };

  // Execute a Single Step
  const executeSingleStep = async (stepIndex: number, currentOutputsMap: Record<string, string>) => {
    const step = steps[stepIndex];
    setRunningStepId(step.id);
    setStepStatuses((prev) => ({ ...prev, [step.id]: 'running' }));
    const startTime = Date.now();

    // Prepare variables context
    const previousStepOutput = stepIndex > 0 ? currentOutputsMap[steps[stepIndex - 1].id] || '' : testInputs.user_input || Object.values(testInputs)[0] || '';
    
    // Build context dictionary for substituteVariables
    const context: Record<string, string> = {
      input: previousStepOutput,
      previous_output: previousStepOutput,
      ...testInputs,
    };

    // Include outputs of all previous steps mapped by step outputKey and step id
    for (let i = 0; i < stepIndex; i++) {
      const prevStep = steps[i];
      const prevOutput = currentOutputsMap[prevStep.id] || '';
      if (prevStep.outputKey) context[prevStep.outputKey] = prevOutput;
      context[prevStep.id] = prevOutput;
    }

    // Substitute variables in step prompt
    const renderedPrompt = substituteVariables(step.prompt, context);

    // AI Execution simulation or generator output
    await new Promise((r) => setTimeout(r, 700));

    const elapsed = Date.now() - startTime;

    // Generate clean structured response for this step
    const simulatedResult = `[OUTPUT: ${step.title}]\n\nKey Delivered Result:\n- Processed ${renderedPrompt.length} chars of input context.\n- Action Executed: ${step.description || 'Step transformation complete'}.\n- Output Key Registered: "${step.outputKey}"\n\n=== Deliverable Payload ===\nBased on your prompt instruction:\n"${renderedPrompt.substring(0, 120)}..."\n\n1. Analysis & Synthesis completed with 100% confidence.\n2. Invariants validated across variables [${extractVariables(step.prompt).join(', ')}].\n3. Ready for downstream step consumption.`;

    const newOutputs = { ...currentOutputsMap, [step.id]: simulatedResult };
    setStepOutputs(newOutputs);
    setStepStatuses((prev) => ({ ...prev, [step.id]: 'completed' }));
    setStepTimes((prev) => ({ ...prev, [step.id]: elapsed }));
    setRunningStepId(null);

    return simulatedResult;
  };

  // Execute Full Chain sequentially
  const handleRunFullChain = async () => {
    setIsRunningAll(true);
    setMobileTab('runner'); // Auto-switch to results tab on mobile
    setStepStatuses({});
    setStepTimes({});

    const currentOutputs: Record<string, string> = {};

    for (let i = 0; i < steps.length; i++) {
      try {
        await executeSingleStep(i, currentOutputs);
      } catch {
        setStepStatuses((prev) => ({ ...prev, [steps[i].id]: 'error' }));
        addToast({ type: 'error', title: `Failed at ${steps[i].title}` });
        break;
      }
    }

    setIsRunningAll(false);
    addToast({ type: 'success', title: 'Full Chain execution finished!' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="flex flex-col w-full max-w-5xl h-[94vh] sm:h-[90vh] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 p-3 sm:p-4 bg-slate-900/95 sticky top-0 z-20">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-md shrink-0">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white truncate">
                  Prompt Chain Engine
                </h2>
                <span className="text-[10px] font-bold text-fuchsia-300 bg-fuchsia-950/80 border border-fuchsia-500/30 px-2 py-0.5 rounded-full shrink-0">
                  {steps.length} {steps.length === 1 ? 'Step' : 'Steps'}
                </span>
              </div>

              {/* Chain Loader Selector */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <FolderOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={activeChainId}
                  onChange={(e) => handleSelectChain(e.target.value)}
                  className="bg-transparent text-xs text-indigo-300 font-semibold focus:outline-none cursor-pointer hover:text-indigo-200 truncate max-w-[200px] sm:max-w-[280px]"
                >
                  <optgroup label="Starter Presets">
                    {STARTER_PRESETS.map((p) => (
                      <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                        ⚡ {p.name}
                      </option>
                    ))}
                  </optgroup>
                  {chains.length > 0 && (
                    <optgroup label="My Saved Chains">
                      {chains.map((c) => (
                        <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                          💾 {c.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-1.5 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
            <button
              onClick={handleNewChain}
              className="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 text-xs font-semibold text-slate-200 border border-slate-700/80 transition cursor-pointer active:scale-95"
              title="New Blank Chain"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden xs:inline">New</span>
            </button>

            <button
              onClick={handleSaveChain}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white shadow transition cursor-pointer active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>

            <button
              onClick={handleExportChain}
              className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-emerald-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              title="Export Chain as Markdown (.chain.md)"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Export .md</span>
            </button>

            <label
              className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-indigo-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              title="Import Chain Markdown (.md) or JSON"
            >
              <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Import .md</span>
              <input type="file" accept=".md,.chain.md,.markdown,.json" onChange={handleImportChain} className="hidden" />
            </label>

            <button
              onClick={closeTool}
              className="rounded-xl border border-slate-700 bg-slate-800 p-1.5 sm:p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition cursor-pointer ml-1"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Chain Title & Notes Sub-header */}
        <div className="p-3 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={chainName}
            onChange={(e) => setChainName(e.target.value)}
            placeholder="Chain Name..."
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-white focus:border-indigo-500 focus:outline-none"
          />
          <input
            type="text"
            value={chainDesc}
            onChange={(e) => setChainDesc(e.target.value)}
            placeholder="Chain description & workflow notes..."
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Mobile Tab Navigation Bar */}
        <div className="flex items-center justify-around border-b border-slate-800 bg-slate-950 p-1 lg:hidden text-xs">
          <button
            onClick={() => setMobileTab('builder')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-semibold transition ${
              mobileTab === 'builder'
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Steps ({steps.length})</span>
          </button>

          <button
            onClick={() => setMobileTab('inputs')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-semibold transition ${
              mobileTab === 'inputs'
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>2. Variables</span>
          </button>

          <button
            onClick={() => setMobileTab('runner')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-semibold transition ${
              mobileTab === 'runner'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Test & Run</span>
          </button>
        </div>

        {/* Main Body (Responsive Split view on desktop, Tabbed view on mobile) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* LEFT / STEPS BUILDER PANEL */}
          <div
            className={`flex-1 flex-col overflow-y-auto p-3 sm:p-4 space-y-4 border-r border-slate-800/80 ${
              mobileTab === 'builder' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Sequential Step Pipeline</span>
              </span>

              <button
                onClick={() => handleAddStep()}
                className="flex items-center gap-1.5 rounded-xl border border-dashed border-indigo-500/60 bg-indigo-950/40 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/60 transition cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            {/* Steps Vertical List */}
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const stepVars = extractVariables(step.prompt);
                const stepAppliedSkillIds = step.appliedSkillIds || [];

                return (
                  <React.Fragment key={step.id}>
                    <div className="group relative rounded-2xl border border-slate-800 bg-slate-950 p-3.5 sm:p-4 space-y-3 hover:border-indigo-500/40 transition shadow-md">
                      {/* Step Header */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs shadow shrink-0">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                            className="flex-1 bg-transparent font-bold text-xs sm:text-sm text-white focus:outline-none truncate"
                            placeholder={`Step ${idx + 1} Title...`}
                          />
                        </div>

                        {/* Step Controls (Up, Down, Clone, Delete) */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleMoveUp(idx)}
                            disabled={idx === 0}
                            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                            title="Move Step Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMoveDown(idx)}
                            disabled={idx === steps.length - 1}
                            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                            title="Move Step Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCloneStep(idx)}
                            className="p-1 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition cursor-pointer"
                            title="Duplicate Step"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteStep(idx)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
                            title="Delete Step"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Step Description Input */}
                      <input
                        type="text"
                        value={step.description || ''}
                        onChange={(e) => handleUpdateStep(idx, 'description', e.target.value)}
                        placeholder="Short description of this step transformation..."
                        className="w-full bg-transparent text-xs text-slate-400 focus:outline-none placeholder-slate-600"
                      />

                      {/* Step Prompt Template */}
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
                          <span>Prompt Template</span>
                          <span className="text-slate-500">
                            Use <code className="text-indigo-400 font-mono">{'{{var}}'}</code> for variables
                          </span>
                        </div>
                        <textarea
                          rows={3}
                          value={step.prompt}
                          onChange={(e) => handleUpdateStep(idx, 'prompt', e.target.value)}
                          placeholder="Write prompt template..."
                          className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-2.5 font-mono text-xs text-slate-200 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
                        />
                      </div>

                      {/* Output Variable Key & Variable Flow Badges */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
                        <div className="flex items-center gap-1.5 flex-1">
                          <span className="text-[11px] font-semibold text-slate-400 shrink-0">Output Key:</span>
                          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 flex-1 max-w-[200px]">
                            <span className="text-indigo-400 font-mono text-[11px]">{'{{'}</span>
                            <input
                              type="text"
                              value={step.outputKey}
                              onChange={(e) => handleUpdateStep(idx, 'outputKey', e.target.value)}
                              placeholder="output_key"
                              className="bg-transparent font-mono text-xs font-semibold text-indigo-300 focus:outline-none w-full"
                            />
                            <span className="text-indigo-400 font-mono text-[11px] me-1">{'}}'}</span>
                          </div>
                        </div>

                        {/* Skill Application Badge Button */}
                        <button
                          onClick={() => setSkillPickerStepIndex(idx)}
                          className="flex items-center gap-1.5 rounded-xl border border-purple-500/40 bg-purple-950/40 px-2.5 py-1 text-[11px] font-bold text-purple-300 hover:bg-purple-900/60 transition cursor-pointer shrink-0"
                        >
                          <Wand2 className="w-3 h-3" />
                          <span>+ Skill</span>
                        </button>
                      </div>

                      {/* Detected Input Variables & Applied Skills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/60 text-[10px]">
                        {stepVars.length > 0 && (
                          <span className="text-slate-500 font-medium">Reads:</span>
                        )}
                        {stepVars.map((v) => (
                          <span
                            key={v}
                            className="rounded-md bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 font-mono text-indigo-300"
                          >
                            {'{{'}{v}{'}}'}
                          </span>
                        ))}

                        {stepAppliedSkillIds.length > 0 && (
                          <>
                            <span className="text-slate-500 font-medium ml-2">Skills:</span>
                            {stepAppliedSkillIds.map((sId) => {
                              const sDef = SKILLS_REGISTRY[sId];
                              return (
                                <span
                                  key={sId}
                                  className="inline-flex items-center gap-1 rounded-md bg-purple-950/80 border border-purple-500/40 px-2 py-0.5 text-purple-300 font-semibold"
                                >
                                  <span>{sDef?.displayName || sId}</span>
                                  <button
                                    onClick={() => handleRemoveSkillFromStep(idx, sId)}
                                    className="hover:text-rose-400 p-0.5"
                                  >
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </span>
                              );
                            })}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Step Visual Link Arrow */}
                    {idx < steps.length - 1 && (
                      <div className="flex items-center justify-center my-1">
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-950 border border-slate-800 rounded-full px-3 py-1 shadow-sm">
                          <span>Output</span>
                          <span className="font-mono text-indigo-400">
                            {'{{'}{step.outputKey || 'output'}{'}}'}
                          </span>
                          <ArrowDown className="w-3 h-3 text-indigo-400 animate-bounce" />
                          <span>feeds Step {idx + 2}</span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* MIDDLE / VARIABLES & DATAFLOW PANEL */}
          <div
            className={`flex-1 flex-col overflow-y-auto p-3 sm:p-4 space-y-4 border-r border-slate-800/80 ${
              mobileTab === 'inputs' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                <span>Test Variables & Dataflow</span>
              </span>
              <span className="text-[11px] text-slate-500">
                {allDetectedVariables.length} Detected Variables
              </span>
            </div>

            {/* Test Inputs Section */}
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Global Initial Inputs</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Provide sample data values for your input variables. Step 1 and downstream steps will automatically consume these variables.
              </p>

              <div className="space-y-3">
                {/* Always include user_input or default primary input */}
                {Array.from(new Set(['user_input', ...globalInputVariables])).map((varName) => (
                  <div key={varName} className="space-y-1">
                    <label className="flex items-center justify-between text-xs font-mono font-semibold text-indigo-300">
                      <span>{'{{'}{varName}{'}}'}</span>
                      <span className="text-[10px] text-slate-500 font-sans font-normal">Global Input</span>
                    </label>
                    <textarea
                      rows={3}
                      value={testInputs[varName] || ''}
                      onChange={(e) =>
                        setTestInputs({ ...testInputs, [varName]: e.target.value })
                      }
                      placeholder={`Enter test payload for {{${varName}}}...`}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/90 p-2.5 font-mono text-xs text-slate-200 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Dataflow Graph Visualization */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Dataflow Sequence Graph</span>
              </h4>

              <div className="space-y-2">
                <div className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-xs flex items-center justify-between">
                  <span className="font-semibold text-slate-300">0. Initial Payload</span>
                  <span className="font-mono text-[10px] text-indigo-400">
                    {'{{'}{Object.keys(testInputs).join(', ') || 'user_input'}{'}}'}
                  </span>
                </div>

                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2 pl-3">
                    <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
                    <div className="flex-1 p-2 rounded-xl border border-indigo-500/20 bg-indigo-950/30 text-xs flex items-center justify-between">
                      <span className="font-bold text-slate-200 truncate">{s.title}</span>
                      <span className="font-mono text-[10px] text-emerald-400 font-semibold shrink-0">
                        → {'{{'}{s.outputKey || 'output'}{'}}'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT / EXECUTION & RESULTS PANEL */}
          <div
            className={`flex-1 flex-col overflow-y-auto p-3 sm:p-4 space-y-4 bg-slate-950/80 ${
              mobileTab === 'runner' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Chain Runner & Execution</span>
              </span>

              <button
                onClick={handleRunFullChain}
                disabled={isRunningAll}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:from-emerald-500 hover:to-cyan-500 transition active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunningAll ? 'Executing Full Chain...' : 'Run Full Chain'}</span>
              </button>
            </div>

            {/* Step-by-Step Results Display */}
            <div className="space-y-3">
              {steps.map((step, idx) => {
                const output = stepOutputs[step.id];
                const status = stepStatuses[step.id] || 'idle';
                const time = stepTimes[step.id];
                const isRunning = runningStepId === step.id;

                return (
                  <div
                    key={step.id}
                    className={`rounded-2xl border p-3.5 space-y-2 transition ${
                      status === 'completed'
                        ? 'border-emerald-500/40 bg-emerald-950/20'
                        : status === 'running'
                        ? 'border-indigo-500/60 bg-indigo-950/30 animate-pulse'
                        : status === 'error'
                        ? 'border-rose-500/40 bg-rose-950/20'
                        : 'border-slate-800 bg-slate-950'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] ${
                            status === 'completed'
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <h5 className="text-xs font-bold text-white truncate">{step.title}</h5>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {time && (
                          <span className="text-[10px] text-slate-400 font-mono">{time}ms</span>
                        )}
                        <button
                          onClick={() => executeSingleStep(idx, stepOutputs)}
                          disabled={isRunning || isRunningAll}
                          className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-200 hover:text-white transition cursor-pointer active:scale-95 disabled:opacity-50"
                        >
                          <Play className="w-2.5 h-2.5" />
                          <span>Run Step</span>
                        </button>
                      </div>
                    </div>

                    {/* Step Output Box */}
                    {output ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono font-semibold">
                          <span>Output Key: {'{{'}{step.outputKey}{'}}'}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(output);
                              addToast({ type: 'success', title: 'Output copied!' });
                            }}
                            className="flex items-center gap-1 text-slate-400 hover:text-white transition cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </button>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                          {output}
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-500 italic">
                        {status === 'running'
                          ? 'Executing AI step model...'
                          : 'Pending execution. Click "Run Step" or "Run Full Chain".'}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SKILL PICKER MODAL FOR CHAIN STEP */}
      {skillPickerStepIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl text-slate-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">
                  Apply Skill to Step {skillPickerStepIndex + 1}
                </h3>
              </div>
              <button
                onClick={() => setSkillPickerStepIndex(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Select an architectural skill to transform or enrich this step's prompt:
            </p>

            <div className="mt-3 flex-1 overflow-y-auto space-y-2 pr-1">
              {QUICK_SKILLS.map((qs) => (
                <div
                  key={qs.id}
                  onClick={() => handleApplySkillToStep(skillPickerStepIndex, qs.id)}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 hover:border-purple-500/50 hover:bg-slate-800/80 transition cursor-pointer group"
                >
                  <div>
                    <h5 className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition">
                      {qs.name}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{qs.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-purple-400 opacity-0 group-hover:opacity-100 transition">
                    + Apply
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
