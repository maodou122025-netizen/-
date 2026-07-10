import type { LearningExample } from '../types/learning';

interface KnowledgePointSelectorProps {
  examples: LearningExample[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function KnowledgePointSelector({ examples, selectedId, onSelect }: KnowledgePointSelectorProps) {
  const grouped = examples.reduce<Record<string, LearningExample[]>>((groups, example) => {
    const key = `${example.grade} · ${example.semester}`;
    groups[key] = [...(groups[key] ?? []), example];
    return groups;
  }, {});

  return (
    <aside className="learning-card knowledge-selector" aria-labelledby="selector-title">
      <p className="learning-kicker">知识点筛选</p>
      <h2 id="selector-title">选择学习内容</h2>
      {Object.entries(grouped).map(([groupName, groupExamples]) => (
        <div className="selector-group" key={groupName}>
          <h3>{groupName}</h3>
          <div className="selector-options">
            {groupExamples.map((example) => (
              <button
                className={example.id === selectedId ? 'selector-option is-active' : 'selector-option'}
                key={example.id}
                onClick={() => onSelect(example.id)}
                type="button"
              >
                <span>{example.unit}</span>
                <strong>{example.knowledgePoint}</strong>
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
