import { QuestionCard } from '../../components/QuestionCard';
import { allKnowledgePoints } from '../../data/mathData';

export function PracticePage() {
  return <div className="page"><header><p className="eyebrow">例题后随堂练习</p><h2>练习板块</h2><p>支持提示，不直接给出答案，帮助学生逐步思考。</p></header><div className="grid">{allKnowledgePoints.map(({ id, title, unit, practice }) => <section className="panel" key={id}><h3>{unit.grade} · {unit.title} · {title}</h3>{practice.map((exercise) => <QuestionCard key={exercise.id} exercise={exercise} />)}</section>)}</div></div>;
}
