import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { HintButton } from './HintButton';
import { PracticeFeedback } from './PracticeFeedback';
import type { HintLevel, MasteryStatus, PracticeAttemptRecord, PracticeQuestion } from './types';

type PracticeQuestionCardProps = {
  question: PracticeQuestion;
  onRecordAttempt: (record: PracticeAttemptRecord) => void;
};

function normalizeAnswer(answer: string) {
  return answer.trim().replace(/\s+/g, '').toLowerCase();
}

function getMasteryStatus(isCorrect: boolean, usedHint: boolean, attemptCount: number): MasteryStatus {
  if (!isCorrect) return 'not-mastered';
  if (attemptCount > 1) return 'multi-attempt-correct';
  if (usedHint) return 'hint-assisted-correct';
  return 'independent-correct';
}

export function PracticeQuestionCard({ question, onRecordAttempt }: PracticeQuestionCardProps) {
  const [answer, setAnswer] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [hintLevel, setHintLevel] = useState<HintLevel>(0);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [latestRecord, setLatestRecord] = useState<PracticeAttemptRecord | null>(null);

  const acceptedAnswers = useMemo(() => question.acceptedAnswers.map(normalizeAnswer), [question.acceptedAnswers]);

  useEffect(() => {
    setAnswer('');
    setAttemptCount(0);
    setHintLevel(0);
    setStartedAt(Date.now());
    setLatestRecord(null);
  }, [question.id]);

  function handleRevealHint(level: Exclude<HintLevel, 0>) {
    setHintLevel((currentLevel) => Math.max(currentLevel, level) as HintLevel);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextAttemptCount = attemptCount + 1;
    const isCorrect = acceptedAnswers.includes(normalizeAnswer(answer));
    const usedHint = hintLevel > 0;
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    const masteryStatus = getMasteryStatus(isCorrect, usedHint, nextAttemptCount);
    const record: PracticeAttemptRecord = {
      questionId: question.id,
      usedHint,
      maxHintLevelViewed: hintLevel,
      isCorrect,
      elapsedSeconds,
      attemptCount: nextAttemptCount,
      masteryStatus,
      submittedAnswer: answer,
      completedAt: new Date().toISOString(),
    };

    setAttemptCount(nextAttemptCount);
    setLatestRecord(record);
    onRecordAttempt(record);
  }

  return (
    <article className="question-card">
      <div className="question-header">
        <p className="eyebrow">{question.knowledgePoint}</p>
        <h2>{question.title}</h2>
      </div>

      <p className="question-prompt">{question.prompt}</p>

      <HintButton question={question} currentLevel={hintLevel} onRevealHint={handleRevealHint} />

      <form className="answer-form" onSubmit={handleSubmit}>
        <label htmlFor={`${question.id}-answer`}>你的答案</label>
        <input
          id={`${question.id}-answer`}
          value={answer}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setAnswer(event.target.value)}
          placeholder="请输入答案"
          required
        />
        <button type="submit">提交答案</button>
      </form>

      {latestRecord ? (
        <PracticeFeedback
          question={question}
          isCorrect={latestRecord.isCorrect}
          masteryStatus={latestRecord.masteryStatus}
          attemptCount={latestRecord.attemptCount}
          usedHint={latestRecord.usedHint}
          maxHintLevelViewed={latestRecord.maxHintLevelViewed}
          elapsedSeconds={latestRecord.elapsedSeconds}
        />
      ) : null}
    </article>
  );
}
