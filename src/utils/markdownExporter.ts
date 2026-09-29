import JSZip from 'jszip';
import type { PromptItem, FolderItem, PromptChain, ChainStep } from '../types';

/**
 * Converts a PromptItem into a clean Markdown string with YAML frontmatter.
 */
export function promptToMarkdown(prompt: PromptItem, folderName?: string): string {
  const tagsStr = prompt.tags && prompt.tags.length > 0
    ? `[${prompt.tags.map((t) => JSON.stringify(t)).join(', ')}]`
    : '[]';

  const varsStr = prompt.variables && prompt.variables.length > 0
    ? `[${prompt.variables.map((v) => JSON.stringify(v)).join(', ')}]`
    : '[]';

  const yamlLines = [
    '---',
    `title: ${JSON.stringify(prompt.title || 'Untitled Prompt')}`,
    `description: ${JSON.stringify(prompt.description || '')}`,
    `category: ${JSON.stringify(prompt.category || 'general')}`,
    `tags: ${tagsStr}`,
  ];

  if (folderName) {
    yamlLines.push(`folder: ${JSON.stringify(folderName)}`);
  }

  if (prompt.targetModel) {
    yamlLines.push(`targetModel: ${JSON.stringify(prompt.targetModel)}`);
  }

  yamlLines.push(`variables: ${varsStr}`);
  yamlLines.push(`isFavorite: ${prompt.isFavorite ? 'true' : 'false'}`);
  yamlLines.push(`usageCount: ${prompt.usageCount || 0}`);
  yamlLines.push(`createdAt: ${JSON.stringify(prompt.createdAt || new Date().toISOString())}`);
  yamlLines.push(`updatedAt: ${JSON.stringify(prompt.updatedAt || new Date().toISOString())}`);
  yamlLines.push('---');
  yamlLines.push('');
  yamlLines.push(prompt.content || '');

  return yamlLines.join('\n');
}

/**
 * Parses a YAML-frontmatter Markdown string into a partial PromptItem + optional folderName.
 */
export function markdownToPrompt(mdText: string): { prompt: Partial<PromptItem>; folderName?: string } {
  const frontmatterMatch = mdText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!frontmatterMatch) {
    // Fallback if no YAML frontmatter present
    const firstHeaderMatch = mdText.match(/^#\s+(.+)$/m);
    const title = firstHeaderMatch ? firstHeaderMatch[1].trim() : 'Imported Markdown Prompt';
    const content = mdText.replace(/^#\s+.+$/m, '').trim();

    // Extract variables {{var}} or [[var]]
    const varMatches = content.match(/\{\{([a-zA-Z0-9_]+)\}\}|\[\[([a-zA-Z0-9_]+)\]\]/g) || [];
    const variables = Array.from(
      new Set(varMatches.map((m) => m.replace(/^\{\{|\}\}$|^\[\[|\]\]$/g, '').trim()))
    );

    return {
      prompt: {
        title,
        description: '',
        content,
        category: 'general',
        tags: ['imported'],
        variables,
        isFavorite: false,
        usageCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  const yamlContent = frontmatterMatch[1];
  const bodyContent = frontmatterMatch[2].trim();

  const meta: Record<string, any> = {};

  yamlContent.split(/\r?\n/).forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.substring(0, colonIdx).trim();
    let val = line.substring(colonIdx + 1).trim();

    if (!key) return;

    // Parse JSON arrays or primitives
    if ((val.startsWith('[') && val.endsWith(']')) || (val.startsWith('"') && val.endsWith('"'))) {
      try {
        meta[key] = JSON.parse(val);
        return;
      } catch {
        // fallback to string trim
      }
    }

    if (val === 'true') meta[key] = true;
    else if (val === 'false') meta[key] = false;
    else if (!isNaN(Number(val)) && val !== '') meta[key] = Number(val);
    else meta[key] = val.replace(/^["']|["']$/g, '');
  });

  // Extract variables from body if not explicitly provided
  const bodyVars = bodyContent.match(/\{\{([a-zA-Z0-9_]+)\}\}|\[\[([a-zA-Z0-9_]+)\]\]/g) || [];
  const extractedVars = Array.from(
    new Set(bodyVars.map((m) => m.replace(/^\{\{|\}\}$|^\[\[|\]\]$/g, '').trim()))
  );

  const variables = Array.isArray(meta.variables) && meta.variables.length > 0 ? meta.variables : extractedVars;

  return {
    folderName: meta.folder ? String(meta.folder) : undefined,
    prompt: {
      title: meta.title || 'Imported Prompt',
      description: meta.description || '',
      category: meta.category || 'general',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      variables,
      isFavorite: Boolean(meta.isFavorite),
      usageCount: typeof meta.usageCount === 'number' ? meta.usageCount : 0,
      targetModel: meta.targetModel,
      createdAt: meta.createdAt || new Date().toISOString(),
      updatedAt: meta.updatedAt || new Date().toISOString(),
      content: bodyContent,
    },
  };
}

/**
 * Downloads a single prompt as a .md file.
 * Uses native device file picker (showSaveFilePicker) if available.
 */
export async function downloadPromptAsMarkdown(prompt: PromptItem, folderName?: string): Promise<boolean> {
  const md = promptToMarkdown(prompt, folderName);
  const safeFilename = (prompt.title || 'prompt').toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
  const filename = `${safeFilename}.md`;

  if ('showSaveFilePicker' in window) {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: 'Markdown Document',
            accept: { 'text/markdown': ['.md', '.markdown'] },
          },
        ],
      });
      const writable = await fileHandle.createWritable();
      await writable.write(md);
      await writable.close();
      return true;
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        return false; // User cancelled saving
      }
    }
  }

  // Fallback download anchor
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}

/**
 * Exports multiple prompts into a user-selected folder on device (via showDirectoryPicker)
 * or a user-selected file path (via showSaveFilePicker), falling back to blob download.
 */
export async function exportPromptsToZip(
  prompts: PromptItem[],
  folders: FolderItem[],
  zipFilename: string = 'prompts-library.zip'
): Promise<boolean> {
  const folderMap = new Map<string, string>();
  folders.forEach((f) => folderMap.set(f.id, f.name));

  // 1. Try showDirectoryPicker so user can choose a target folder on device
  if ('showDirectoryPicker' in window) {
    try {
      const dirHandle = await (window as any).showDirectoryPicker({
        mode: 'readwrite',
      });

      for (const p of prompts) {
        const folderName = p.folderId ? folderMap.get(p.folderId) : undefined;
        const mdContent = promptToMarkdown(p, folderName);
        const safeTitle = (p.title || 'prompt').toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
        const filename = `${safeTitle}-${p.id.substring(0, 5)}.md`;

        let targetDir = dirHandle;
        if (folderName) {
          const safeFolder = folderName.replace(/[^a-zA-Z0-9_-]+/g, '_');
          targetDir = await dirHandle.getDirectoryHandle(safeFolder, { create: true });
        }

        const fileHandle = await targetDir.getFileHandle(filename, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(mdContent);
        await writable.close();
      }

      return true;
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        return false; // User cancelled directory selection
      }
      // Fall through to showSaveFilePicker / ZIP blob download
    }
  }

  // 2. Build ZIP archive
  const zip = new JSZip();
  prompts.forEach((p) => {
    const folderName = p.folderId ? folderMap.get(p.folderId) : undefined;
    const mdContent = promptToMarkdown(p, folderName);
    const safeTitle = (p.title || 'prompt').toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
    const filename = `${safeTitle}-${p.id.substring(0, 5)}.md`;

    if (folderName) {
      const safeFolder = folderName.replace(/[^a-zA-Z0-9_-]+/g, '_');
      zip.folder(safeFolder)?.file(filename, mdContent);
    } else {
      zip.file(filename, mdContent);
    }
  });

  const blob = await zip.generateAsync({ type: 'blob' });

  // 3. Try showSaveFilePicker for ZIP save location
  if ('showSaveFilePicker' in window) {
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: zipFilename,
        types: [
          {
            description: 'ZIP Archive containing Markdown prompts',
            accept: { 'application/zip': ['.zip'] },
          },
        ],
      });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      return true;
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        return false; // User cancelled
      }
    }
  }

  // 4. Fallback anchor download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = zipFilename;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}

/**
 * Imports prompts and folder names from a uploaded ZIP archive containing .md files.
 */
export async function importPromptsFromZip(zipFile: File): Promise<{
  prompts: Array<{ prompt: Partial<PromptItem>; folderName?: string }>;
}> {
  const zip = new JSZip();
  const unzipped = await zip.loadAsync(zipFile);
  const results: Array<{ prompt: Partial<PromptItem>; folderName?: string }> = [];

  for (const relativePath of Object.keys(unzipped.files)) {
    const file = unzipped.files[relativePath];
    if (!file.dir && relativePath.endsWith('.md')) {
      const text = await file.async('string');
      const parsed = markdownToPrompt(text);

      // Infer folder name from path if not in frontmatter
      const pathParts = relativePath.split('/');
      if (pathParts.length > 1 && !parsed.folderName) {
        parsed.folderName = pathParts[0];
      }

      results.push(parsed);
    }
  }

  return { prompts: results };
}

/**
 * Converts a PromptChain to Markdown (.chain.md format).
 */
export function chainToMarkdown(chain: PromptChain): string {
  const testInputsJson = chain.testInputs ? JSON.stringify(chain.testInputs) : '{}';

  const yamlLines = [
    '---',
    'type: prompt-chain',
    `id: ${JSON.stringify(chain.id)}`,
    `name: ${JSON.stringify(chain.name || 'Untitled Chain')}`,
    `description: ${JSON.stringify(chain.description || '')}`,
    `testInputs: ${testInputsJson}`,
    `createdAt: ${JSON.stringify(chain.createdAt || new Date().toISOString())}`,
    `updatedAt: ${JSON.stringify(chain.updatedAt || new Date().toISOString())}`,
    '---',
    '',
    `# Chain: ${chain.name}`,
    chain.description ? `> ${chain.description}\n` : '',
  ];

  chain.steps.forEach((step, idx) => {
    yamlLines.push(`## Step ${idx + 1}: ${step.title || 'Step'}`);
    yamlLines.push(`- **outputKey**: \`${step.outputKey || `output_${idx + 1}`}\``);
    if (step.description) {
      yamlLines.push(`- **description**: ${step.description}`);
    }
    if (step.appliedSkillIds && step.appliedSkillIds.length > 0) {
      yamlLines.push(`- **skills**: ${step.appliedSkillIds.join(', ')}`);
    }
    yamlLines.push('');
    yamlLines.push('```prompt');
    yamlLines.push(step.prompt || '');
    yamlLines.push('```');
    yamlLines.push('');
  });

  return yamlLines.join('\n');
}

/**
 * Parses Markdown (.chain.md format) into a PromptChain object.
 */
export function markdownToChain(mdText: string): PromptChain {
  const frontmatterMatch = mdText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  let chainMeta: Record<string, any> = {};
  let bodyText = mdText;

  if (frontmatterMatch) {
    const yamlContent = frontmatterMatch[1];
    bodyText = frontmatterMatch[2];

    yamlContent.split(/\r?\n/).forEach((line) => {
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) return;
      const key = line.substring(0, colonIdx).trim();
      let val = line.substring(colonIdx + 1).trim();

      if (val.startsWith('{') || val.startsWith('[')) {
        try {
          chainMeta[key] = JSON.parse(val);
          return;
        } catch {}
      }

      chainMeta[key] = val.replace(/^["']|["']$/g, '');
    });
  }

  // Parse Steps from ## Step N headers and ```prompt codeblocks
  const stepBlocks = bodyText.split(/^##\s+Step\s+\d+:\s*/m);
  const steps: ChainStep[] = [];

  stepBlocks.forEach((block, idx) => {
    if (idx === 0) return; // Lead-in text

    const lines = block.split(/\r?\n/);
    const title = lines[0].trim();

    let outputKey = `step_${idx}_output`;
    let description = '';
    let appliedSkillIds: string[] = [];

    lines.forEach((line) => {
      if (line.includes('**outputKey**:')) {
        outputKey = line.replace(/.*?\*\*outputKey\*\*:\s*`?([^`\s]+)`?.*/, '$1').trim();
      }
      if (line.includes('**description**:')) {
        description = line.replace(/.*?\*\*description\*\*:\s*(.*)/, '$1').trim();
      }
      if (line.includes('**skills**:')) {
        const skillsStr = line.replace(/.*?\*\*skills\*\*:\s*(.*)/, '$1').trim();
        appliedSkillIds = skillsStr.split(',').map((s) => s.trim()).filter(Boolean);
      }
    });

    const promptMatch = block.match(/```prompt\r?\n([\s\S]*?)\r?\n```/);
    const prompt = promptMatch ? promptMatch[1] : '';

    steps.push({
      id: `step-${idx}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      description,
      prompt,
      outputKey,
      appliedSkillIds: appliedSkillIds.length > 0 ? appliedSkillIds : undefined,
    });
  });

  if (steps.length === 0) {
    // Fallback if no structured steps found
    steps.push({
      id: 'step-1',
      title: 'Step 1: Input Analysis',
      description: 'Imported step',
      prompt: bodyText.trim() || 'Analyze input: {{user_input}}',
      outputKey: 'output_1',
    });
  }

  return {
    id: chainMeta.id || 'chain-' + Math.random().toString(36).substring(2, 9),
    name: chainMeta.name || 'Imported Chain',
    description: chainMeta.description || '',
    steps,
    testInputs: chainMeta.testInputs || { user_input: '' },
    createdAt: chainMeta.createdAt || new Date().toISOString(),
    updatedAt: chainMeta.updatedAt || new Date().toISOString(),
  };
}

/**
 * Downloads a PromptChain as a .chain.md file.
 */
export function downloadChainAsMarkdown(chain: PromptChain) {
  const md = chainToMarkdown(chain);
  const safeFilename = (chain.name || 'chain').toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safeFilename}.chain.md`;
  a.click();
  URL.revokeObjectURL(url);
}
