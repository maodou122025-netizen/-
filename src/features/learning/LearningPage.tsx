import { useMemo, useState } from 'react';
import { ExampleViewer } from './components/ExampleViewer';
import { KnowledgePointSelector } from './components/KnowledgePointSelector';
import { MathDiagram } from './components/MathDiagram';
import { StepExplanation } from './components/StepExplanation';
import { learningExamples } from './data/learningExamples';
import './LearningPage.css';

export function LearningPage() {
  const [selectedId, setSelectedId] = useState(learningExamples[0].id);
  const selectedExample = useMemo(
    () => learningExamples.find((example) => example.id === selectedId) ?? learningExamples[0],
    [selectedId],
  );

  return (
    <main className="learning-page">
      <header className="learning-hero">
        <p className="learning-kicker">小学 · 初中数学</p>
        <h1>可视化例题学习</h1>
        <p>按年级、学期、单元和知识点选择例题，通过题干、图示、步骤和小结建立数学概念。</p>
      </header>

      <div className="learning-layout">
        <KnowledgePointSelector examples={learningExamples} selectedId={selectedId} onSelect={setSelectedId} />
        <div className="learning-content">
          <ExampleViewer example={selectedExample} />
          <MathDiagram type={selectedExample.diagramType} data={selectedExample.diagramData} />
          <StepExplanation steps={selectedExample.steps} summary={selectedExample.summary} />
        </div>
      </div>
    </main>
  );
}

export default LearningPage;
import { StepExplanation } from '../../components/StepExplanation';
import { units } from '../../data/mathData';

export function LearningPage() {
  return <div className="page"><header><p className="eyebrow">按年级 / 学期 / 单元 / 知识点</p><h2>学习板块</h2><p>围绕人教版数学知识点提供结构化例题讲解。</p></header>{units.map((unit) => <section className="unit" key={unit.id}><h3>{unit.grade} · {unit.term} · {unit.title}</h3><p>{unit.overview}</p><div className="grid">{unit.points.map((point) => <article className="point" key={point.id}><h4>{point.title}</h4><p>{point.objective}</p><StepExplanation {...point.example} /></article>)}</div></section>)}</div>;
}
