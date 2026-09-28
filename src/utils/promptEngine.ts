import { extractVariables } from '../hooks/useVariables';

export interface GeneratePromptParams {
  domain: string;
  task: string;
  technique: string;
  tone: string;
  detailLevel: 'minimalist' | 'balanced' | 'exhaustive';
  targetModel: string;
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
      techniqueBlock = `### Reasoning Protocol (Chain-of-Thought)
Before delivering your final conclusion:
1. Break the problem into its atomic constituent elements.
2. Outline your step-by-step deduction path showing your intermediate rationale.
3. Validate each assertion against first-principles logic before moving to the next.`;
      break;
    case 'six-hats':
      techniqueBlock = `### Analysis Framework (Six Thinking Hats)
Evaluate this task through distinct perspective lenses:
- White Hat: Known facts, verified data, and objective constraints.
- Black Hat: Critical failure modes, risks, and downside vulnerabilities.
- Yellow Hat: Maximum upside, strategic value, and opportunistic wins.
- Green Hat: Innovative, non-obvious alternatives and creative workarounds.
- Blue Hat: Decisive synthesized action plan.`;
      break;
    case 'first-principles':
      techniqueBlock = `### First-Principles Decomposition
Strip away all industry precedent, historical analogies, and conventional wisdom:
1. Identify the fundamental, undeniable physical/mathematical axioms of this problem.
2. Discard artificial or self-imposed constraints.
3. Construct an optimal solution strictly upwards from baseline axioms.`;
      break;
    case 'tree-of-thoughts':
      techniqueBlock = `### Multi-Branch Evaluation (Tree of Thoughts)
1. Formulate 3 distinct conceptual strategies to solve this.
2. Score each strategy on feasibility (1-5), speed (1-5), and strategic leverage (1-5).
3. Select the winning path and explain why the alternative branches were pruned.`;
      break;
    case 'inversion':
      techniqueBlock = `### Inversion Protocol (Charlie Munger Principle)
1. Envision how this project could fail catastrophically and completely.
2. Identify the top 3 fatal traps and vulnerabilities.
3. Convert those failure modes into proactive, ironclad defensive guardrails.`;
      break;
    default:
      techniqueBlock = `### Step-by-Step Execution Plan
Analyze the request systematically, prioritizing high-leverage outcomes and quantifiable clarity.`;
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

  let prompt = `${roleIntro}\n\n### Primary Directive\n${task || 'Execute [[primary_task]] with precision and rigor.'}\n\n${techniqueBlock}\n\n### Tone & Voice\n${toneInstruction}\n\n### Deliverable Format & Constraints\n- ${detailConstraint}\n- Structure with clean Markdown headings.\n- Highlight critical metrics or assumptions in bold.\n- Conclude with top 3 immediate next steps.`;

  if (targetModel.includes('Claude')) {
    prompt = adaptPromptForModel(prompt, 'claude');
  } else if (targetModel.includes('GPT')) {
    prompt = adaptPromptForModel(prompt, 'openai');
  }

  return prompt;
}

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

  const detectedVars = extractVariables(inputPrompt);
  const varSection = detectedVars.length > 0 
    ? `\n\n### Input Parameters:\n${detectedVars.map(v => `- [[${v}]]: Describe the value for ${v}`).join('\n')}`
    : '';

  let optimized = inputPrompt.trim();

  // Low aggressiveness: minor cleaning & formatting
  if (options.aggressiveness === 'low') {
    let additions: string[] = [];
    if (options.clarity) additions.push('Eliminate ambiguities and state your assumptions before answering.');
    if (options.constraints) additions.push('Keep the response strictly within scope and adhere to verified facts.');
    if (options.chainOfThought) additions.push('Show brief step-by-step reasoning.');

    return `${optimized}\n\n### Guidelines:\n${additions.map(a => `- ${a}`).join('\n')}${varSection}`;
  }

  // Medium / High aggressiveness: full restructure
  const sections: string[] = [];
  sections.push(`### Role & Context\nYou are an authoritative specialist tasked with executing the following directive with precision.`);
  sections.push(`### Primary Objective\n${optimized}`);

  if (options.chainOfThought || options.aggressiveness === 'high') {
    sections.push(`### Execution & Reasoning Process\n1. Analyze the core requirements and identify any edge cases.\n2. Detail your step-by-step reasoning before drawing conclusions.\n3. Verify your assertions against practical constraints.`);
  }

  if (options.specificity || options.constraints) {
    sections.push(`### Operational Constraints\n- Do NOT include generic fluff or boilerplate intros.\n- Ensure all recommendations are actionable and quantifiable.\n- State any underlying assumptions clearly.`);
  }

  if (options.examples && options.aggressiveness === 'high') {
    sections.push(`### Quality Benchmark\nProvide a concrete example or code/data snippet demonstrating the prescribed standard in action.`);
  }

  if (options.riskAudit) {
    sections.push(`### Risk & Boundary Audit\nHighlight the top failure mode or risk associated with this approach and provide a defensive countermeasure.`);
  }

  sections.push(`### Output Format\nStructure your response with clear Markdown headings, bullet points for lists, and a concluding 3-point action summary.`);

  return sections.join('\n\n') + varSection;
}

export function simplifyPrompt(input: string, mode: 'light' | 'balanced' | 'aggressive'): string {
  if (!input.trim()) return '';

  let text = input;

  // Common filler patterns
  const fillerRegexes = [
    /\b(please|kindly|could you please|would you please|can you please)\b/gi,
    /\b(I would like you to|I want you to|Your job is to|Your task is to)\b/gi,
    /\b(It is important to remember that|Make sure to|Be sure to)\b/gi,
    /\b(In conclusion|To summarize|As an AI|In summary)\b/gi,
    /\b(feel free to|don't hesitate to)\b/gi,
  ];

  if (mode === 'light') {
    fillerRegexes.slice(0, 2).forEach((rx) => {
      text = text.replace(rx, '');
    });
    text = text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n/g, '\n\n').trim();
    return text;
  }

  if (mode === 'balanced') {
    fillerRegexes.forEach((rx) => {
      text = text.replace(rx, '');
    });
    // Clean up sentences
    text = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
    return text;
  }

  // Aggressive: condense into bulleted imperative directives
  const lines = text
    .replace(/[.?!]\s+/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 4);

  const keyDirectives = lines.map((l) => {
    let clean = l;
    fillerRegexes.forEach((rx) => { clean = clean.replace(rx, ''); });
    clean = clean.replace(/^[-*•\d.]+\s*/, '').trim();
    if (clean.length > 0) {
      return `- ${clean.charAt(0).toUpperCase() + clean.slice(1)}`;
    }
    return '';
  }).filter(Boolean);

  return `### Directives:\n${keyDirectives.join('\n')}\n\nFormat: Bulleted, high-density, zero fluff.`;
}

export function translatePrompt(input: string, targetLanguage: string): string {
  if (!input.trim()) return '';

  // Extract variables to preserve them exactly
  const varMap = new Map<string, string>();
  let tokenCounter = 0;

  // Replace [[var]] and {{var}} with placeholders like __VAR_TOKEN_0__
  let sanitized = input.replace(/(\[\[.*?\]\]|\{\{.*?\}\})/g, (match) => {
    const token = `__VAR_TOKEN_${tokenCounter++}__`;
    varMap.set(token, match);
    return token;
  });

  // Multilingual prompt template dictionary for prompt engineering structural blocks
  const translations: Record<string, Record<string, string>> = {
    spanish: {
      '### Role & Context': '### Rol y Contexto',
      '### Primary Directive': '### Directiva Principal',
      '### Constraints': '### Restricciones y Reglas',
      '### Output Format': '### Formato de Salida',
      'You are': 'Actúa como',
      'Take a deep breath and think step-by-step': 'Respira hondo y piensa paso a paso',
      'Format your response as': 'Formatea tu respuesta como',
      'Do NOT': 'NO hagas lo siguiente',
    },
    french: {
      '### Role & Context': '### Rôle et Contexte',
      '### Primary Directive': '### Directive Principale',
      '### Constraints': '### Contraintes et Règles',
      '### Output Format': '### Format de Sortie',
      'You are': 'Vous agissez en tant que',
      'Take a deep breath and think step-by-step': 'Prenez une profonde inspiration et réfléchissez étape par étape',
      'Format your response as': 'Formatez votre réponse sous forme de',
      'Do NOT': 'Ne PAS faire ce qui suit',
    },
    german: {
      '### Role & Context': '### Rolle & Kontext',
      '### Primary Directive': '### Hauptanweisung',
      '### Constraints': '### Einschränkungen & Regeln',
      '### Output Format': '### Ausgabeformat',
      'You are': 'Sie agieren als',
      'Take a deep breath and think step-by-step': 'Atmen Sie tief durch und denken Sie Schritt für Schritt nach',
      'Format your response as': 'Formatieren Sie Ihre Antwort als',
      'Do NOT': 'Unterlassen Sie Folgendes',
    },
    russian: {
      '### Role & Context': '### Роль и контекст',
      '### Primary Directive': '### Основная задача',
      '### Primary Objective': '### Основная цель',
      '### Constraints': '### Ограничения и правила',
      '### Output Format': '### Формат вывода',
      '### Reasoning Protocol': '### Протокол рассуждений',
      'You are': 'Вы выступаете в роли',
      'Take a deep breath and think step-by-step': 'Сделай глубокий вдох и рассуждай шаг за шагом',
      'Format your response as': 'Оформи ответ в виде',
      'Do NOT': 'НЕ делай следующее',
    },
    chinese: {
      '### Role & Context': '### 角色与背景',
      '### Primary Directive': '### 核心指令',
      '### Constraints': '### 约束条件与规则',
      '### Output Format': '### 输出格式',
      'You are': '你扮演一名',
      'Take a deep breath and think step-by-step': '深呼吸，一步一步深入思考',
      'Format your response as': '将回答格式化为',
      'Do NOT': '请勿执行以下操作',
    },
    japanese: {
      '### Role & Context': '### 役割とコンテキスト',
      '### Primary Directive': '### 主な指示',
      '### Constraints': '### 制約事項とルール',
      '### Output Format': '### 出力形式',
      'You are': 'あなたは〜として振る舞ってください：',
      'Take a deep breath and think step-by-step': '深呼吸をして、一歩ずつ論理的に考えてください',
      'Format your response as': '以下の形式で出力してください：',
      'Do NOT': '以下を行わないでください：',
    },
    portuguese: {
      '### Role & Context': '### Papel e Contexto',
      '### Primary Directive': '### Diretriz Principal',
      '### Constraints': '### Restrições e Regras',
      '### Output Format': '### Formato de Saída',
      'You are': 'Você atua como',
      'Take a deep breath and think step-by-step': 'Respire fundo e pense passo a passo',
      'Format your response as': 'Formate sua resposta como',
      'Do NOT': 'NÃO faça o seguinte',
    },
    italian: {
      '### Role & Context': '### Ruolo e Contesto',
      '### Primary Directive': '### Direttiva Principale',
      '### Constraints': '### Vincoli e Regole',
      '### Output Format': '### Formato di Output',
      'You are': 'Agisci come',
      'Take a deep breath and think step-by-step': 'Fai un respiro profondo e pensa passo dopo passo',
      'Format your response as': 'Formatta la risposta come',
      'Do NOT': 'NON fare quanto segue',
    },
    korean: {
      '### Role & Context': '### 역할 및 컨텍스트',
      '### Primary Directive': '### 핵심 지침',
      '### Constraints': '### 제약 조건 및 규칙',
      '### Output Format': '### 출력 형식',
      'You are': '당신은 다음 역할을 수행합니다:',
      'Take a deep breath and think step-by-step': '심호흡을 하고 단계별로 논리적으로 생각하십시오',
      'Format your response as': '다음 형식으로 응답하십시오:',
      'Do NOT': '다음 사항을 엄격히 금지합니다:',
    },
    arabic: {
      '### Role & Context': '### الدور والسياق',
      '### Primary Directive': '### التوجيه الأساسي',
      '### Constraints': '### القيود والقواعد',
      '### Output Format': '### تنسيق الإخراج',
      'You are': 'أنت تتصرف بصفتك',
      'Take a deep breath and think step-by-step': 'خذ نفسًا عميقًا وفكر خطوة بخطوة',
      'Format your response as': 'قم بتنسيق إجابتك كـ',
      'Do NOT': 'لا تفعل ما يلي',
    },
    hindi: {
      '### Role & Context': '### भूमिका और संदर्भ',
      '### Primary Directive': '### मुख्य निर्देश',
      '### Constraints': '### सीमाएं और नियम',
      '### Output Format': '### आउटपुट प्रारूप',
      'You are': 'आप इस रूप में कार्य करते हैं:',
      'Take a deep breath and think step-by-step': 'गहरी सांस लें और कदम दर कदम सोचें',
      'Format your response as': 'अपने उत्तर को इस रूप में प्रारूपित करें:',
      'Do NOT': 'निम्नलिखित न करें:',
    },
  };

  const langKey = targetLanguage.toLowerCase();
  const dict = translations[langKey] || translations['spanish'];

  let translated = sanitized;
  Object.entries(dict).forEach(([source, target]) => {
    translated = translated.split(source).join(target);
  });

  // Restore variables exactly
  varMap.forEach((origVal, token) => {
    translated = translated.split(token).join(origVal);
  });

  return translated;
}

export function adaptPromptForModel(input: string, model: 'claude' | 'openai' | 'gemini' | 'grok' | 'llama'): string {
  if (!input.trim()) return '';

  const clean = input.trim();

  switch (model) {
    case 'claude':
      return `<instructions>\n${clean}\n</instructions>\n\n<thinking>\nAnalyze the constraints, formulate a step-by-step outline, and verify formatting before producing the final response.\n</thinking>\n\n<response_format>\nUse clean Markdown with bold key terms and crisp section headings.\n</response_format>`;

    case 'openai':
      return `[SYSTEM INSTRUCTION: DEVELOPER DIRECTIVE]\nYou are a precise, compliant reasoning engine.\nFollow all negative constraints with 100% adherence.\n\n[USER DIRECTIVE]\n${clean}\n\n[OUTPUT SCHEMA]\nAdhere strictly to markdown formatting and deliver clear, high-density outputs.`;

    case 'gemini':
      return `### System Instructions:\nAdhere strictly to factual grounding, verify calculations, and maintain consistency.\n\n### Task Context & Directives:\n${clean}\n\n### Grounding & Output Constraints:\n- Do not extrapolate beyond verified domain facts.\n- Provide structured sections with summary metrics.`;

    case 'grok':
      return `### Mode: Direct, Unfiltered, Truth-Seeking\nStrip away excessive PR hedging and robotic corporate filler.\n\n${clean}\n\nAnswer with sharp wit, deep technical accuracy, and zero sugarcoating.`;

    case 'llama':
      return `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\nYou are an expert assistant. Execute the directives faithfully without unnecessary preamble.<|eot_id|>\n<|start_header_id|>user<|end_header_id|>\n${clean}<|eot_id|>\n<|start_header_id|>assistant<|end_header_id|>`;

    default:
      return clean;
  }
}

export function buildPromptFromDescription(description: string, complexity: 'basic' | 'intermediate' | 'expert'): string {
  if (!description.trim()) return '';

  if (complexity === 'basic') {
    return `### Role & Objective
You are a specialist tasked with:
${description.trim()}

### Key Instructions:
1. Deliver a clear, direct answer addressing the request.
2. Present the solution in bullet points or easy-to-read sections.
3. Keep the tone helpful, concise, and professional.`;
  }

  if (complexity === 'intermediate') {
    return `### Role & Authority
You are an experienced domain authority with comprehensive expertise in this subject matter.

### Primary Task:
${description.trim()}

### Execution Guidelines:
- Step 1: Clarify the core mechanism or problem statement.
- Step 2: Provide the complete, actionable deliverable.
- Step 3: Highlight any caveats, edge cases, or trade-offs.

### Constraints:
- Avoid buzzwords, fluff, and unnecessary preambles.
- Structure with clear Markdown headers and bullet lists.`;
  }

  // Expert Prompt Engineer
  return `<system_role>
You are an elite principal engineer and strategist with deep specialized mastery in executing complex deliverables.
</system_role>

<directive>
${description.trim()}
</directive>

<thinking_process>
1. Deconstruct the user's objective into core functional requirements.
2. Identify latent assumptions and high-risk edge cases.
3. Apply domain best practices and industry-standard patterns.
4. Review the draft against strict clarity and precision benchmarks.
</thinking_process>

<operational_constraints>
1. Zero boilerplate fluff: Begin immediately with the substantive content.
2. Quantify results, timelines, or benchmarks wherever applicable.
3. Adhere to crisp typographical hierarchy (Markdown headers, tables, code blocks).
</operational_constraints>

<deliverable_specification>
Structure the final response with:
- Executive Summary (Max 2 sentences)
- Core Solution / Deliverable
- Implementation Matrix & Next Steps
</deliverable_specification>`;
}
