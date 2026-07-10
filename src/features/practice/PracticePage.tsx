import { useMemo, useState } from 'react';
import { PracticeQuestionCard } from './PracticeQuestionCard';
import { practiceQuestions } from './practiceQuestions';
import type { MasteryStatus, PracticeAttemptRecord } from './types';

const statusLabels: Record<MasteryStatus, string> = {
  'independent-correct': '独立答对',
  'hint-assisted-correct': '查看提示后答对',
  'multi-attempt-correct': '多次尝试后答对',
  'not-mastered': '未掌握',
};

export function PracticePage() {
  const [activeQuestionId, setActiveQuestionId] = useState(practiceQuestions[0]?.id ?? '');
  const [records, setRecords] = useState<PracticeAttemptRecord[]>([]);

  const activeQuestion = useMemo(
    () => practiceQuestions.find((question) => question.id === activeQuestionId) ?? practiceQuestions[0],
    [activeQuestionId],
  );

  const latestRecordsByQuestion = useMemo(() => {
    return records.reduce<Record<string, PracticeAttemptRecord>>((summary, record) => {
      summary[record.questionId] = record;
      return summary;
    }, {});
  }, [records]);

  function handleRecordAttempt(record: PracticeAttemptRecord) {
    setRecords((currentRecords) => [...currentRecords, record]);
  }

  return (
    <main className="practice-page">
      <header className="hero">
        <p className="eyebrow">自适应练习</p>
        <h1>多级提示练习页面</h1>
        <p>
          学生可逐级查看提示，系统会记录提示使用、最高提示级别、答题结果、尝试次数与耗时，用于区分不同掌握程度。
        </p>
      </header>

      <nav className="question-tabs" aria-label="练习题列表">
        {practiceQuestions.map((question, index) => (
          <button
            key={question.id}
            type="button"
            className={question.id === activeQuestion.id ? 'active' : ''}
            onClick={() => setActiveQuestionId(question.id)}
          >
            第 {index + 1} 题
          </button>
        ))}
      </nav>

      {activeQuestion ? <PracticeQuestionCard question={activeQuestion} onRecordAttempt={handleRecordAttempt} /> : null}

      <section className="records-panel" aria-label="作答记录">
        <h2>学情记录</h2>
        {records.length === 0 ? (
          <p>暂无提交记录。</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>题目</th>
                <th>评价</th>
                <th>提示</th>
                <th>结果</th>
                <th>耗时</th>
              </tr>
            </thead>
            <tbody>
              {practiceQuestions.map((question) => {
                const record = latestRecordsByQuestion[question.id];
                return record ? (
                  <tr key={question.id}>
                    <td>{question.title}</td>
                    <td>{statusLabels[record.masteryStatus]}</td>
                    <td>{record.usedHint ? `${record.maxHintLevelViewed} 级` : '未查看'}</td>
                    <td>{record.isCorrect ? '正确' : '错误'}</td>
                    <td>{record.elapsedSeconds} 秒</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
