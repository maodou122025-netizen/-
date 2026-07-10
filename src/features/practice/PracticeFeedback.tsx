import type { MasteryStatus, PracticeQuestion } from './types';

type PracticeFeedbackProps = {
  question: PracticeQuestion;
  isCorrect: boolean;
  masteryStatus: MasteryStatus;
  attemptCount: number;
  usedHint: boolean;
  maxHintLevelViewed: number;
  elapsedSeconds: number;
};

const masteryLabels: Record<MasteryStatus, string> = {
  'independent-correct': '独立答对',
  'hint-assisted-correct': '查看提示后答对',
  'multi-attempt-correct': '多次尝试后答对',
  'not-mastered': '未掌握',
};

export function PracticeFeedback({
  question,
  isCorrect,
  masteryStatus,
  attemptCount,
  usedHint,
  maxHintLevelViewed,
  elapsedSeconds,
}: PracticeFeedbackProps) {
  return (
    <aside className={isCorrect ? 'feedback feedback-success' : 'feedback feedback-error'} aria-live="polite">
      <h3>{isCorrect ? '回答正确' : '暂未答对'}</h3>
      <p>
        学情评价：<strong>{masteryLabels[masteryStatus]}</strong>
      </p>
      <dl className="metrics-grid">
        <div>
          <dt>是否查看提示</dt>
          <dd>{usedHint ? '是' : '否'}</dd>
        </div>
        <div>
          <dt>最高提示级别</dt>
          <dd>{maxHintLevelViewed} 级</dd>
        </div>
        <div>
          <dt>尝试次数</dt>
          <dd>{attemptCount}</dd>
        </div>
        <div>
          <dt>答题耗时</dt>
          <dd>{elapsedSeconds} 秒</dd>
        </div>
      </dl>
      <p>推荐复习知识点：{question.reviewTopics.join('、')}。</p>
    </aside>
  );
}
