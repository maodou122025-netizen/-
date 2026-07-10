import type { LearningExample } from '../types/learning';

interface ExampleViewerProps {
  example: LearningExample;
}

export function ExampleViewer({ example }: ExampleViewerProps) {
  return (
    <section className="learning-card example-viewer" aria-labelledby="example-title">
      <p className="learning-kicker">例题</p>
      <h2 id="example-title">{example.title}</h2>
      <p className="example-meta">
        {example.grade} · {example.semester} · {example.unit} · {example.knowledgePoint}
      </p>
      <div className="problem-box">{example.problem}</div>
    </section>
  );
}
