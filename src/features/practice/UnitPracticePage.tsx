import { QuestionCard } from '../../components/QuestionCard';
import { units } from '../../data/mathData';

export function UnitPracticePage() {
  return <div className="page"><header><p className="eyebrow">按单元汇总题目</p><h2>单元练习</h2></header>{units.map((unit) => <section className="unit" key={unit.id}><h3>{unit.grade} · {unit.term} · {unit.title}</h3><div className="grid">{unit.points.flatMap((point) => point.practice).map((exercise) => <QuestionCard key={exercise.id} exercise={exercise} />)}</div></section>)}</div>;
}
