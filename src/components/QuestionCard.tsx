import { useState } from 'react';
import type { Exercise } from '../data/mathData';

type Props = { exercise: Exercise; mode?: 'practice' | 'exam'; onResult?: (correct: boolean) => void };

const normalize = (value: string) => value.replace(/[，、\s]/g, ',').replace(/。/g, '').toLowerCase();

export function QuestionCard({ exercise, mode = 'practice', onResult }: Props) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const correct = normalize(answer) === normalize(exercise.answer);

  const submit = () => {
    setSubmitted(true);
    onResult?.(correct);
  };

  return (
    <article className="question-card">
      <p className="eyebrow">{mode === 'exam' ? '考试题' : '随堂练习'}</p>
      <h3>{exercise.prompt}</h3>
      {exercise.choices && (
        <div className="choice-list">
          {exercise.choices.map((choice) => <button key={choice} type="button" onClick={() => setAnswer(choice)}>{choice}</button>)}
        </div>
      )}
      <input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="输入你的答案" />
      <div className="actions">
        <button type="button" className="secondary" onClick={() => setShowHint((value) => !value)}>
          💡 {showHint ? '收起提示' : '查看提示'}
        </button>
        <button type="button" onClick={submit}>提交</button>
      </div>
      {showHint && <p className="hint">提示：{exercise.hint}</p>}
      {submitted && (
        <div className={correct ? 'result ok' : 'result wrong'}>
          <span>{correct ? '✅' : '❌'}</span>
          <span>{correct ? '回答正确！' : '暂未答对，请根据提示再想一想。'}</span>
          {mode === 'exam' && <small>{exercise.explanation}</small>}
        </div>
      )}
    </article>
  );
}
