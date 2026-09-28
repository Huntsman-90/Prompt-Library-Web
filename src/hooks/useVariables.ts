import { useMemo } from 'react';

export function extractVariables(text: string): string[] {
  if (!text) return [];
  // Match [[var_name]] and {{var_name}}
  const bracketMatches = text.match(/\[\[\s*([a-zA-Z0-9_\-\s]+?)\s*\]\]/g) || [];
  const braceMatches = text.match(/\{\{\s*([a-zA-Z0-9_\-\s]+?)\s*\}\}/g) || [];

  const found = new Set<string>();

  bracketMatches.forEach((m) => {
    const clean = m.replace(/\[\[\s*|\s*\]\]/g, '').trim();
    if (clean) found.add(clean);
  });

  braceMatches.forEach((m) => {
    const clean = m.replace(/\{\{\s*|\s*\}\}/g, '').trim();
    if (clean) found.add(clean);
  });

  return Array.from(found);
}

export function substituteVariables(text: string, values: Record<string, string>): string {
  if (!text) return '';
  let result = text;
  Object.entries(values).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      // Replace [[key]]
      const bracketRegex = new RegExp(`\\[\\[\\s*${escapeRegExp(key)}\\s*\\]\\]`, 'g');
      result = result.replace(bracketRegex, val);

      // Replace {{key}}
      const braceRegex = new RegExp(`\\{\\{\\s*${escapeRegExp(key)}\\s*\\}\\}`, 'g');
      result = result.replace(braceRegex, val);
    }
  });
  return result;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function useVariables(text: string) {
  return useMemo(() => extractVariables(text), [text]);
}
