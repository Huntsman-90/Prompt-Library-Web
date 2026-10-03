import React from 'react';
import type { SkillPreflightDiagnostic } from '../../skills/skillPreflight';

interface SkillPreflightNoticeProps {
  diagnostics: SkillPreflightDiagnostic[];
}

export const SkillPreflightNotice: React.FC<SkillPreflightNoticeProps> = ({ diagnostics }) => {
  if (diagnostics.length === 0) return null;

  return (
    <section
      role="status"
      aria-label="Skill preflight diagnostics"
      className="rounded-xl border border-amber-500/30 bg-amber-950/30 px-3 py-2 text-[11px] text-amber-100"
    >
      <p className="font-semibold">Rule-based Skill preflight: {diagnostics.length} adjustment(s)</p>
      <ul className="mt-1 space-y-1.5">
        {diagnostics.map((diagnostic, index) => (
          <li key={`${diagnostic.skillId}-${diagnostic.type}-${index}`}>
            <span className="font-semibold">{diagnostic.skillName}:</span> {diagnostic.message}
            {diagnostic.directive && (
              <details className="ml-2 mt-0.5 text-amber-200/80">
                <summary className="cursor-pointer">Review directive</summary>
                <p className="mt-1 break-words">Original: {diagnostic.directive}</p>
                {diagnostic.replacement && <p className="mt-1 break-words">Kept as: {diagnostic.replacement}</p>}
              </details>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
