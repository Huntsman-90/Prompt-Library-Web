import { extractVariables } from '../hooks/useVariables';

export interface GeneratePromptParams {
  domain: string;
  task: string;
  technique: string;
  tone: string;
  detailLevel: 'minimalist' | 'balanced' | 'exhaustive';
  targetModel: string;
}

/**
 * Helper: Strips meta-prompt noise, prompt-generator preambles, and meta-instructions.
 * Extracts the true operational task.
 */
export function extractCoreGoalAndCleanMeta(input: string): string {
  if (!input) return '';

  let clean = input.trim();

  // Common meta-prompt wrapper patterns
  const metaPhrases = [
    /^(I need|I want|Please write|Write|Create|Draft|Generate|Build|Make|Construct)\s+(a|an)?\s*(system|expert|custom|detailed)?\s*prompt\s+(for|that|which|to|where|allowing|capable of)\s+/i,
    /^(Can you|Could you|Would you)\s+(please\s+)?(write|create|generate|draft|build|make)\s+(a|an)?\s*(system|custom)?\s*prompt\s+(for|that|which|to)\s+/i,
    /^(Act as a|You are a)\s+prompt\s+(engineer|generator|creator|architect)\s+(and|to|that)\s+/i,
    /^(Here is a prompt|This is a prompt|Optimize this prompt|Improve this prompt):\s*/i,
    /^(I am looking for a prompt that|I need help writing a prompt to)\s+/i,
  ];

  for (const regex of metaPhrases) {
    clean = clean.replace(regex, '');
  }

  // Clean trailing meta-request sentences
  clean = clean.replace(/\s*(Please make sure the prompt|The prompt should include|Ensure the prompt has|Format the prompt as|Make it professional|Include variables like).*$/i, '');

  // Clean polite preambles and boilerplate conversational intros
  clean = clean
    .replace(/^(Hello|Hi|Hey|Dear AI|As an AI),\s*/i, '')
    .replace(/\b(please|kindly)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Capitalize first letter
  if (clean.length > 0) {
    clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  return clean || input.trim();
}

/**
 * Helper: Classifies task into domain archetype for specialized architectural framing.
 */
export function classifyTaskType(text: string): 'coding' | 'analysis' | 'business' | 'writing' | 'evaluation' | 'creative' | 'process' | 'general' {
  const lower = text.toLowerCase();

  if (/\b(code|refactor|typescript|react|python|sql|debug|api|bug|github|test|docker|backend|frontend|function|script|database|orm)\b/.test(lower)) {
    return 'coding';
  }
  if (/\b(analyze|audit|evaluation|root cause|gap|swot|review|inspect|metric|churn|trend|baseline|data|stat)\b/.test(lower)) {
    return 'analysis';
  }
  if (/\b(strategy|gtm|saas|pricing|market|revenue|pitch|investor|unit economics|roi|okr|lead|b2b|growth|business)\b/.test(lower)) {
    return 'business';
  }
  if (/\b(write|copy|article|post|email|script|story|sales|headline|blog|newsletter|hook|persuasive|press release)\b/.test(lower)) {
    return 'writing';
  }
  if (/\b(grade|rubric|score|eval|security|vulnerability|compliance|guardrail|risk|check|jailbreak|pii)\b/.test(lower)) {
    return 'evaluation';
  }
  if (/\b(fiction|worldbuilding|character|poem|plot|novel|scene|dialogue|fantasy|sci-fi|creative)\b/.test(lower)) {
    return 'creative';
  }
  if (/\b(workflow|pipeline|step-by-step|sop|sequence|dag|process|automation|orchestration)\b/.test(lower)) {
    return 'process';
  }

  return 'general';
}

/**
 * Helper: Assigns authoritative role persona based on task archetype.
 */
function getRoleForTaskType(taskType: ReturnType<typeof classifyTaskType>): string {
  switch (taskType) {
    case 'coding':
      return 'You are a Principal Software Architect with 15+ years of experience in distributed systems, clean code, and type-safe software engineering.';
    case 'analysis':
      return 'You are a Principal Data Analyst and Root-Cause Auditor specializing in uncovering hidden failure modes, operational bottlenecks, and systemic patterns.';
    case 'business':
      return 'You are a Chief Strategy Officer and veteran management consultant with expertise in enterprise unit economics, go-to-market execution, and scalable growth.';
    case 'writing':
      return 'You are an Elite Direct-Response Copywriter and Brand Communications Director focused on high-density, persuasive prose with zero fluff.';
    case 'evaluation':
      return 'You are a Senior Risk & Compliance Auditor specializing in strict vulnerability assessments, rule enforcement, and objective grading rubrics.';
    case 'creative':
      return 'You are an Award-Winning Creative Director and Narrative Architect specializing in immersive worldbuilding and character dynamics.';
    case 'process':
      return 'You are a Senior Operations Engineer and Systems Orchestration Lead specializing in workflow optimization and execution pipelines.';
    case 'general':
    default:
      return 'You are an authoritative domain specialist with deep practical expertise in executing complex technical and strategic deliverables.';
  }
}

export function generatePromptFromParams(params: GeneratePromptParams): string {
  const { domain, task, technique, tone, detailLevel, targetModel } = params;

  let roleIntro = '';
  switch (domain.toLowerCase()) {
    case 'coding':
      roleIntro = `You are a Principal Software Architect with 15+ years of experience in distributed systems, clean architecture, and type-safe software engineering.`;
      break;
    case 'business':
      roleIntro = `You are a Chief Strategy Officer and veteran management consultant with expertise in enterprise unit economics, market positioning, and scalable operations.`;
      break;
    case 'copywriting':
      roleIntro = `You are an elite direct-response copywriter and brand storyteller who creates compelling, high-converting prose with zero fluff.`;
      break;
    case 'product':
      roleIntro = `You are a Head of Product and UX Design veteran specializing in user retention, progressive disclosure, and frictionless workflows.`;
      break;
    case 'research':
      roleIntro = `You are a Senior Principal Research Scientist with rigorous academic training in empirical methodology, literature synthesis, and statistical inference.`;
      break;
    default:
      roleIntro = `You are a world-class domain specialist with deep practical expertise in [[${domain || 'domain_subject'}]].`;
  }

  let techniqueBlock = '';
  switch (technique.toLowerCase()) {
    case 'chain-of-thought':
      techniqueBlock = `### Reasoning Protocol (Chain-of-Thought)\nBefore delivering your final conclusion:\n1. Break the problem into its atomic constituent elements.\n2. Outline your step-by-step deduction path showing your intermediate rationale.\n3. Validate each assertion against first-principles logic before moving to the next.`;
      break;
    case 'six-hats':
      techniqueBlock = `### Analysis Framework (Six Thinking Hats)\nEvaluate this task through distinct perspective lenses:\n- White Hat: Known facts, verified data, and objective constraints.\n- Black Hat: Critical failure modes, risks, and downside vulnerabilities.\n- Yellow Hat: Maximum upside, strategic value, and opportunistic wins.\n- Green Hat: Innovative, non-obvious alternatives and creative workarounds.\n- Blue Hat: Decisive synthesized action plan.`;
      break;
    case 'first-principles':
      techniqueBlock = `### First-Principles Decomposition\nStrip away all industry precedent, historical analogies, and conventional wisdom:\n1. Identify the fundamental, undeniable physical/mathematical axioms of this problem.\n2. Discard artificial or self-imposed constraints.\n3. Construct an optimal solution strictly upwards from baseline axioms.`;
      break;
    case 'tree-of-thoughts':
      techniqueBlock = `### Multi-Branch Evaluation (Tree of Thoughts)\n1. Formulate 3 distinct conceptual strategies to solve this.\n2. Score each strategy on feasibility (1-5), speed (1-5), and strategic leverage (1-5).\n3. Select the winning path and explain why the alternative branches were pruned.`;
      break;
    case 'inversion':
      techniqueBlock = `### Inversion Protocol (Charlie Munger Principle)\n1. Envision how this project could fail catastrophically and completely.\n2. Identify the top 3 fatal traps and vulnerabilities.\n3. Convert those failure modes into proactive, ironclad defensive guardrails.`;
      break;
    default:
      techniqueBlock = `### Step-by-Step Execution Plan\nAnalyze the request systematically, prioritizing high-leverage outcomes and quantifiable clarity.`;
  }

  let toneInstruction = '';
  switch (tone.toLowerCase()) {
    case 'radical-candor':
      toneInstruction = `Maintain a tone of radical candor: be relentlessly direct, intellectually honest, and avoid polite sugarcoating.`;
      break;
    case 'matter-of-fact':
      toneInstruction = `Maintain an objective, matter-of-fact, dispassionate tone. Let verified facts and structured analysis carry the weight.`;
      break;
    case 'socratic':
      toneInstruction = `Adopt a thoughtful Socratic approach: guide the inquiry with incisive clarity, highlighting assumptions and trade-offs.`;
      break;
    case 'executive':
      toneInstruction = `Write for busy executives: high density, clear hierarchies, bottom-line upfront (BLUF), zero filler words.`;
      break;
    default:
      toneInstruction = `Maintain a professional, authoritative, and engaging tone throughout.`;
  }

  let detailConstraint = '';
  if (detailLevel === 'minimalist') {
    detailConstraint = `Constraint: Keep output concise and high-density. Avoid verbose explanations; limit to bulleted action items and core deliverables.`;
  } else if (detailLevel === 'exhaustive') {
    detailConstraint = `Constraint: Provide an in-depth, comprehensive breakdown with granular sub-sections, implementation details, edge cases, and examples.`;
  } else {
    detailConstraint = `Constraint: Strike a balanced depth: provide clear explanations accompanied by concrete, actionable steps.`;
  }

  const cleanTask = extractCoreGoalAndCleanMeta(task) || 'Execute [[primary_task]] with precision and rigor.';

  let prompt = `${roleIntro}\n\n### Primary Directive\n${cleanTask}\n\n${techniqueBlock}\n\n### Tone & Voice\n${toneInstruction}\n\n### Deliverable Format & Constraints\n- ${detailConstraint}\n- Structure with clean Markdown headings.\n- Highlight critical metrics or assumptions in bold.\n- Conclude with top 3 immediate next steps.`;

  if (targetModel.includes('Claude')) {
    prompt = adaptPromptForModel(prompt, 'claude');
  } else if (targetModel.includes('GPT')) {
    prompt = adaptPromptForModel(prompt, 'openai');
  }

  return prompt;
}

/**
 * Deep, true Prompt Optimizer that completely strips meta-request noise
 * and restructures prompts according to task architecture and depth level.
 */
export function optimizePrompt(
  inputPrompt: string,
  options: {
    clarity: boolean;
    specificity: boolean;
    structure: boolean;
    constraints: boolean;
    examples: boolean;
    chainOfThought: boolean;
    riskAudit: boolean;
    aggressiveness: 'low' | 'medium' | 'high';
  }
): string {
  if (!inputPrompt.trim()) return '';

  // Step 1: Strip meta-request noise and extract true core goal
  const coreGoal = extractCoreGoalAndCleanMeta(inputPrompt);

  // Step 2: Classify task archetype
  const taskType = classifyTaskType(coreGoal);
  const rolePersona = getRoleForTaskType(taskType);

  // Extract variables
  const detectedVars = extractVariables(inputPrompt);
  const varSection = detectedVars.length > 0
    ? `\n\n### Input Variables\n${detectedVars.map(v => `- [[${v}]]: Parameter value for ${v}`).join('\n')}`
    : '';

  // LEVEL 1: LOW AGGRESSIVENESS (Light Polish - Removes meta-text, tightens guidelines, preserves user tone)
  if (options.aggressiveness === 'low') {
    const guidelines: string[] = [];
    if (options.clarity) guidelines.push('State any underlying assumptions upfront and eliminate vague or ambiguous phrasing.');
    if (options.constraints) guidelines.push('Adhere strictly to verified facts and avoid generic filler words.');
    if (options.chainOfThought) guidelines.push('Show brief step-by-step reasoning before stating conclusions.');

    return `### Role & Context\n${rolePersona}\n\n### Operational Objective\n${coreGoal}\n\n### Execution Guidelines\n${guidelines.map(g => `- ${g}`).join('\n')}${varSection}`;
  }

  // LEVEL 2: MEDIUM AGGRESSIVENESS (Standard Architecture - Clear structural sections, explicit sequence)
  if (options.aggressiveness === 'medium') {
    const sections: string[] = [];
    sections.push(`### Role & Authority\n${rolePersona}`);
    sections.push(`### Core Objective\n${coreGoal}`);

    if (options.chainOfThought || options.structure) {
      sections.push(`### Execution & Deduction Sequence\n1. Analyze requirements, input parameters, and structural constraints.\n2. Deconstruct core mechanisms and derive logical steps.\n3. Validate assertions against practical domain realities before finalizing.`);
    }

    if (options.specificity || options.constraints) {
      sections.push(`### Operational Rules & Negative Constraints\n- Zero corporate fluff, conversational preambles, or polite filler.\n- Keep information density high and support key statements with concrete reasoning.\n- Explicitly highlight assumptions if data is missing.`);
    }

    if (options.riskAudit) {
      sections.push(`### Failure Mode Check\nIdentify the top potential edge case or vulnerability in this request and provide a protective safeguard.`);
    }

    sections.push(`### Output Format & Structure\nDeliver output in clean, scannable Markdown with crisp headers, concise bullet points, and actionable takeaways.`);

    return sections.join('\n\n') + varSection;
  }

  // LEVEL 3: HIGH AGGRESSIVENESS (Deep Senior Prompt Architecture - Full best-in-class transformation)
  const deepSections: string[] = [];
  deepSections.push(`### Role & Strategic Context\n${rolePersona}`);
  deepSections.push(`### Operational Directive\n${coreGoal}`);

  if (options.chainOfThought || options.structure) {
    deepSections.push(`### Step-by-Step Reasoning Protocol (Chain-of-Thought)\nBefore outputting the final deliverable:\n1. Deconstruct the objective into functional sub-tasks.\n2. Identify implicit assumptions and potential edge-case failures.\n3. Execute step-by-step logical reasoning to synthesize optimal solutions.\n4. Verify compliance against all negative constraints.`);
  }

  if (options.riskAudit) {
    deepSections.push(`### Risk Mitigation & Edge Case Audit\n- Identify the primary failure vector (e.g. hallucination, edge case error, ambiguous input).\n- Include explicit defensive safeguards preventing this failure vector.`);
  }

  if (options.constraints || options.specificity) {
    deepSections.push(`### Negative Constraints & Quality Standards\n1. NO conversational preambles ("Sure, here is your answer"), fluff, or meta-commentary.\n2. Quantify results, benchmarks, and metrics wherever applicable.\n3. State all underlying assumptions clearly before proceeding.`);
  }

  if (options.examples) {
    deepSections.push(`### Quality Benchmark\nProvide a concrete, high-fidelity sample or schema demonstrating the prescribed standard.`);
  }

  deepSections.push(`### Deliverable Specification & Format\nStructure the response using:\n- Executive Summary (Max 2 sentences)\n- Core Deliverable / Substantive Output\n- Actionable Next Steps / Verification Matrix`);

  return deepSections.join('\n\n') + varSection;
}

export function simplifyPrompt(input: string, mode: 'light' | 'balanced' | 'aggressive'): string {
  if (!input.trim()) return '';

  const clean = extractCoreGoalAndCleanMeta(input);

  // Common filler patterns
  const fillerRegexes = [
    /\b(please|kindly|could you please|would you please|can you please)\b/gi,
    /\b(I would like you to|I want you to|Your job is to|Your task is to)\b/gi,
    /\b(It is important to remember that|Make sure to|Be sure to)\b/gi,
    /\b(In conclusion|To summarize|As an AI|In summary)\b/gi,
    /\b(feel free to|don't hesitate to)\b/gi,
  ];

  if (mode === 'light') {
    let text = clean;
    fillerRegexes.slice(0, 2).forEach((rx) => { text = text.replace(rx, ''); });
    return text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n/g, '\n\n').trim();
  }

  if (mode === 'balanced') {
    let text = clean;
    fillerRegexes.forEach((rx) => { text = text.replace(rx, ''); });
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
  }

  // Aggressive: condense into bulleted imperative directives
  const lines = clean
    .replace(/[.?!]\s+/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 4);

  const keyDirectives = lines.map((l) => {
    let textLine = l;
    fillerRegexes.forEach((rx) => { textLine = textLine.replace(rx, ''); });
    textLine = textLine.replace(/^[-*•\d.]+\s*/, '').trim();
    if (textLine.length > 0) {
      return `- ${textLine.charAt(0).toUpperCase() + textLine.slice(1)}`;
    }
    return '';
  }).filter(Boolean);

  return `### Operational Directives:\n${keyDirectives.join('\n')}\n\nFormat: Bulleted, high-density, zero filler.`;
}

export function translatePrompt(input: string, targetLanguage: string): string {
  if (!input.trim()) return '';

  const varMap = new Map<string, string>();
  let tokenCounter = 0;

  let sanitized = input.replace(/(\[\[.*?\]\]|\{\{.*?\}\})/g, (match) => {
    const token = `__VAR_TOKEN_${tokenCounter++}__`;
    varMap.set(token, match);
    return token;
  });

  const translations: Record<string, Record<string, string>> = {
    spanish: {
      '### Role & Context': '### Rol y Contexto',
      '### Role & Authority': '### Rol y Autoridad',
      '### Primary Directive': '### Directiva Principal',
      '### Core Objective': '### Objetivo Principal',
      '### Operational Directive': '### Directiva Operativa',
      '### Constraints': '### Restricciones y Reglas',
      '### Output Format': '### Formato de Salida',
      'You are': 'Actúa como',
      'Format your response as': 'Formatea tu respuesta como',
      'Do NOT': 'NO hagas lo siguiente',
    },
    french: {
      '### Role & Context': '### Rôle et Contexte',
      '### Role & Authority': '### Rôle et Autorité',
      '### Primary Directive': '### Directive Principale',
      '### Core Objective': '### Objectif Principal',
      '### Constraints': '### Contraintes et Règles',
      '### Output Format': '### Format de Sortie',
      'You are': 'Vous agissez en tant que',
    },
    german: {
      '### Role & Context': '### Rolle & Kontext',
      '### Role & Authority': '### Rolle & Autorität',
      '### Primary Directive': '### Hauptanweisung',
      '### Core Objective': '### Hauptziel',
      '### Constraints': '### Einschränkungen & Regeln',
      '### Output Format': '### Ausgabeformat',
    },
    russian: {
      '### Role & Context': '### Роль и контекст',
      '### Role & Authority': '### Роль и полномочия',
      '### Primary Directive': '### Основная задача',
      '### Core Objective': '### Основная цель',
      '### Operational Directive': '### Оперативная директива',
      '### Constraints': '### Ограничения и правила',
      '### Output Format': '### Формат вывода',
      'You are': 'Вы выступаете в роли',
    },
    chinese: {
      '### Role & Context': '### 角色与背景',
      '### Primary Directive': '### 核心指令',
      '### Core Objective': '### 核心目标',
      '### Constraints': '### 约束条件与规则',
      '### Output Format': '### 输出格式',
    },
    japanese: {
      '### Role & Context': '### 役割とコンテキスト',
      '### Primary Directive': '### 主な指示',
      '### Constraints': '### 制約事項とルール',
      '### Output Format': '### 出力形式',
    },
  };

  const langKey = targetLanguage.toLowerCase();
  const dict = translations[langKey] || translations['spanish'];

  let translated = sanitized;
  Object.entries(dict).forEach(([source, target]) => {
    translated = translated.split(source).join(target);
  });

  varMap.forEach((origVal, token) => {
    translated = translated.split(token).join(origVal);
  });

  return translated;
}

/**
 * Model Adapter: Purges meta-request noise and restructures the operational core
 * according to the thinking & execution style of each major LLM family.
 */
export function adaptPromptForModel(input: string, model: 'claude' | 'openai' | 'gemini' | 'grok' | 'llama'): string {
  if (!input.trim()) return '';

  // Purge meta-request noise
  const cleanGoal = extractCoreGoalAndCleanMeta(input);
  const taskType = classifyTaskType(cleanGoal);
  const rolePersona = getRoleForTaskType(taskType);

  switch (model) {
    case 'claude':
      return `<system_instructions>\n${rolePersona}\nAdhere strictly to XML tag hierarchies, high technical precision, and zero conversational fluff.\n</system_instructions>\n\n<core_directive>\n${cleanGoal}\n</core_directive>\n\n<thinking_process>\nBefore producing the deliverable:\n1. Deconstruct the directive into atomic functional requirements.\n2. Analyze potential edge cases and negative constraints.\n3. Formulate a structured draft and verify against formatting rules.\n</thinking_process>\n\n<negative_constraints>\n- Do NOT include conversational filler ("Certainly", "Here is your response").\n- Do NOT extrapolate beyond verified context or make uncited claims.\n- Maintain strict compliance with requested output schemas.\n</negative_constraints>\n\n<output_format>\nUse clean Markdown with bold key terms, concise bullet points, and crisp section headings.\n</output_format>`;

    case 'openai':
      return `[SYSTEM DIRECTIVE: DEVELOPER ROLE]\n${rolePersona}\nYou are a precise, compliant reasoning engine. Follow all operational directives with 100% adherence.\n\n[OPERATIONAL DIRECTIVE]\n${cleanGoal}\n\n[EXECUTION PROTOCOL]\n1. Analyze input parameters and core directives.\n2. Apply step-by-step domain logic.\n3. Validate output against negative constraints before finalizing.\n\n[NEGATIVE CONSTRAINTS]\n- Zero fluff or preamble. Begin immediately with substantive content.\n- Strictly enforce type safety, schema structure, and factual accuracy.\n\n[OUTPUT SCHEMA]\nStructure response using clean Markdown headers, bulleted lists, and structured tables or JSON blocks where applicable.`;

    case 'gemini':
      return `### System Instructions & Role:\n${rolePersona}\nAdhere strictly to factual grounding, verify calculations, and maintain absolute internal consistency.\n\n### Core Operational Directive:\n${cleanGoal}\n\n### Step-by-Step Reasoning Protocol:\n1. Verify inputs against domain knowledge before drawing conclusions.\n2. Execute step-by-step logical calculation or derivation.\n3. State underlying assumptions explicitly if context is missing.\n\n### Grounding & Output Constraints:\n- Do not extrapolate beyond verified facts.\n- Provide structured sections with summary key metrics upfront.`;

    case 'grok':
      return `### Mode: Direct, Unfiltered, High-Velocity Execution\nRole: ${rolePersona}\nStrip away all PR hedging, bureaucratic sugarcoating, and robotic corporate filler.\n\n### Core Directive:\n${cleanGoal}\n\n### Execution Rules:\n- Be relentlessly direct, intellectually honest, and sharp.\n- Highlight flaws or bad assumptions in input explicitly.\n- Deliver maximum information density in minimal tokens.\n\n### Output Format:\nClean, scannable layout with bold takeaways and zero filler words.`;

    case 'llama':
      return `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n${rolePersona}\nExecute directives with high precision and zero conversational preamble.<|eot_id|>\n<|start_header_id|>user<|end_header_id|>\n${cleanGoal}\n\nRules:\n- Adhere strictly to the directive above.\n- Do not output conversational intros or disclaimers.<|eot_id|>\n<|start_header_id|>assistant<|end_header_id|>`;

    default:
      return cleanGoal;
  }
}

export function buildPromptFromDescription(description: string, complexity: 'basic' | 'intermediate' | 'expert'): string {
  if (!description.trim()) return '';

  const cleanDesc = extractCoreGoalAndCleanMeta(description);

  if (complexity === 'basic') {
    return `### Role & Objective\nYou are a specialist tasked with:\n${cleanDesc}\n\n### Key Instructions:\n1. Deliver a clear, direct answer addressing the request.\n2. Present solution in bullet points or easy-to-read sections.\n3. Keep tone helpful, concise, and professional.`;
  }

  if (complexity === 'intermediate') {
    return `### Role & Authority\nYou are an experienced domain authority with comprehensive expertise in this subject matter.\n\n### Primary Task:\n${cleanDesc}\n\n### Execution Guidelines:\n- Step 1: Clarify core mechanism or problem statement.\n- Step 2: Provide complete, actionable deliverable.\n- Step 3: Highlight caveats, edge cases, or trade-offs.\n\n### Constraints:\n- Avoid buzzwords, fluff, and unnecessary preambles.\n- Structure with clear Markdown headers and bullet lists.`;
  }

  // Expert Prompt Engineer
  return `<system_role>\nYou are an elite principal engineer and strategist with deep specialized mastery in executing complex deliverables.\n</system_role>\n\n<directive>\n${cleanDesc}\n</directive>\n\n<thinking_process>\n1. Deconstruct objective into core functional requirements.\n2. Identify latent assumptions and high-risk edge cases.\n3. Apply domain best practices and industry-standard patterns.\n4. Review draft against strict clarity and precision benchmarks.\n</thinking_process>\n\n<operational_constraints>\n1. Zero boilerplate fluff: Begin immediately with substantive content.\n2. Quantify results, timelines, or benchmarks wherever applicable.\n3. Adhere to crisp typographical hierarchy (Markdown headers, tables, code blocks).\n</operational_constraints>\n\n<deliverable_specification>\nStructure final response with:\n- Executive Summary (Max 2 sentences)\n- Core Solution / Deliverable\n- Implementation Matrix & Next Steps\n</deliverable_specification>`;
}
