interface StepExplanationProps {
  steps: string[];
  summary: string;
}

export function StepExplanation({ steps, summary }: StepExplanationProps) {
  return (
    <section className="learning-card step-explanation" aria-labelledby="steps-title">
      <p className="learning-kicker">解题过程</p>
      <h2 id="steps-title">一步一步想</h2>
      <ol className="step-list">
        {steps.map((step, index) => (
          <li key={step}>
            <span className="step-index">{index + 1}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
      <div className="summary-box">
        <strong>小结：</strong>
        {summary}
      </div>
    </section>
  );
}
