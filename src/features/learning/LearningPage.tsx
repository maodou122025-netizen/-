import { StepExplanation } from '../../components/StepExplanation';
import { units } from '../../data/mathData';

export function LearningPage() {
  return <div className="page"><header><p className="eyebrow">按年级 / 学期 / 单元 / 知识点</p><h2>学习板块</h2><p>围绕人教版数学知识点提供结构化例题讲解。</p></header>{units.map((unit) => <section className="unit" key={unit.id}><h3>{unit.grade} · {unit.term} · {unit.title}</h3><p>{unit.overview}</p><div className="grid">{unit.points.map((point) => <article className="point" key={point.id}><h4>{point.title}</h4><p>{point.objective}</p><StepExplanation {...point.example} /></article>)}</div></section>)}</div>;
}
