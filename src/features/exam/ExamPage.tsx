import { useMemo, useState } from 'react';
import { QuestionCard } from '../../components/QuestionCard';
import { allKnowledgePoints } from '../../data/mathData';

export function ExamPage() {
  const questions = useMemo(() => allKnowledgePoints.flatMap((point) => point.exam.map((exercise) => ({ ...exercise, point }))), []);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const score = Object.values(results).filter(Boolean).length;
  return <div className="page"><header><p className="eyebrow">围绕知识点生成考题</p><h2>考试板块</h2><p>提交后即时评分，支持查看解析复盘。</p><strong className="score">当前得分：{score} / {questions.length}</strong></header><div className="grid">{questions.map((question) => <QuestionCard key={question.id} exercise={question} mode="exam" onResult={(correct) => setResults((current) => ({ ...current, [question.id]: correct }))} />)}</div></div>;
}
