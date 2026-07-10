type Props = { problem: string; steps: string[]; diagram: string };

export function StepExplanation({ problem, steps, diagram }: Props) {
  return (
    <section className="step-card">
      <p className="eyebrow">例题讲解</p>
      <h3>{problem}</h3>
      <ol>{steps.map((step) => <li key={step}>{step}</li>)}</ol>
      <div className="diagram" aria-label="图示组件">{diagram}</div>
    </section>
  );
}
