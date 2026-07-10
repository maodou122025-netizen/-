import { allExercises, units } from '../../data/mathData';

const reports = units.map((unit, index) => ({ unit, accuracy: index === 0 ? 86 : 74, completed: unit.points.length * 3 }));

export function AnalyticsPage() {
  const totalQuestions = allExercises.length;
  const average = Math.round(reports.reduce((sum, item) => sum + item.accuracy, 0) / reports.length);
  return <div className="page"><header><p className="eyebrow">练习 / 考试 / 单元测验 / 学期测验</p><h2>学情评价</h2><p>依据过程性作答数据生成掌握情况报告。</p></header><section className="analytics-hero"><div><span>综合掌握度</span><strong>{average}%</strong></div><div><span>题库覆盖</span><strong>{totalQuestions} 题</strong></div><div><span>薄弱建议</span><strong>小数比较</strong></div></section><div className="grid">{reports.map(({ unit, accuracy, completed }) => <article className="report" key={unit.id}><h3>{unit.grade} · {unit.term} · {unit.title}</h3><div className="bar"><i style={{ width: `${accuracy}%` }} /></div><p>掌握度：{accuracy}% · 已完成 {completed} 项学习任务</p><ul>{unit.points.map((point) => <li key={point.id}>{point.title}：{accuracy >= 80 ? '掌握较好，建议挑战提升题。' : '需要复习例题步骤并完成错题订正。'}</li>)}</ul></article>)}</div></div>;
}
