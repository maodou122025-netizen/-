import { QuestionCard } from '../../components/QuestionCard';
import { units } from '../../data/mathData';

const terms = Array.from(new Set(units.map((unit) => `${unit.grade} · ${unit.term}`)));

export function TermPracticePage() {
  return <div className="page"><header><p className="eyebrow">按整学期知识点汇总题目</p><h2>学期练习</h2></header>{terms.map((term) => { const termUnits = units.filter((unit) => `${unit.grade} · ${unit.term}` === term); return <section className="unit" key={term}><h3>{term}</h3><div className="grid">{termUnits.flatMap((unit) => unit.points).flatMap((point) => point.practice).map((exercise) => <QuestionCard key={exercise.id} exercise={exercise} />)}</div></section>; })}</div>;
}
