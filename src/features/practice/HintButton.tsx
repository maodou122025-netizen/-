import type { HintLevel, PracticeQuestion } from './types';

type HintButtonProps = {
  question: PracticeQuestion;
  currentLevel: HintLevel;
  onRevealHint: (level: Exclude<HintLevel, 0>) => void;
};

const hintOrder = [
  { level: 1, key: 'hintLevel1', label: '一级提示' },
  { level: 2, key: 'hintLevel2', label: '二级提示' },
  { level: 3, key: 'hintLevel3', label: '三级提示' },
] as const;

export function HintButton({ question, currentLevel, onRevealHint }: HintButtonProps) {
  const nextLevel = Math.min(currentLevel + 1, 3) as Exclude<HintLevel, 0>;
  const hasMoreHints = currentLevel < 3;

  return (
    <section className="hint-panel" aria-label="多级提示">
      <button type="button" className="secondary-button" onClick={() => onRevealHint(nextLevel)} disabled={!hasMoreHints}>
        {hasMoreHints ? `查看${hintOrder[Math.min(currentLevel, 2)].label}` : '已显示全部提示'}
      </button>

      <ol className="hint-list">
        {hintOrder.slice(0, currentLevel).map((hint) => (
          <li key={hint.key}>
            <strong>{hint.label}：</strong>
            {question[hint.key]}
          </li>
        ))}
      </ol>
    </section>
  );
}
