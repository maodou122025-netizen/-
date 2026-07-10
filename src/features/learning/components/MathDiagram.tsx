import type {
  BarModelDiagramData,
  CoordinatePlaneDiagramData,
  DiagramData,
  DiagramType,
  FractionAreaDiagramData,
  GeometryDiagramData,
  NumberLineDiagramData,
} from '../types/learning';

interface MathDiagramProps {
  type: DiagramType;
  data: DiagramData;
}

export function MathDiagram({ type, data }: MathDiagramProps) {
  return (
    <section className="learning-card math-diagram" aria-labelledby="diagram-title">
      <p className="learning-kicker">图示</p>
      <h2 id="diagram-title">{data.title ?? '数学图示'}</h2>
      {type === 'numberLine' && <NumberLine data={data as NumberLineDiagramData} />}
      {type === 'geometry' && <GeometryShape data={data as GeometryDiagramData} />}
      {type === 'fractionArea' && <FractionArea data={data as FractionAreaDiagramData} />}
      {type === 'barModel' && <BarModel data={data as BarModelDiagramData} />}
      {type === 'coordinatePlane' && <CoordinatePlane data={data as CoordinatePlaneDiagramData} />}
    </section>
  );
}

function NumberLine({ data }: { data: NumberLineDiagramData }) {
  const span = data.max - data.min;
  const toX = (value: number) => 40 + ((value - data.min) / span) * 520;
  const ticks = Array.from({ length: span + 1 }, (_, index) => data.min + index).filter(
    (value) => value % 5 === 0 || data.highlighted?.includes(value),
  );

  return (
    <svg viewBox="0 0 600 150" role="img" aria-label={`数轴从 ${data.min} 到 ${data.max}`}>
      <line x1="40" y1="80" x2="560" y2="80" stroke="#334155" strokeWidth="3" />
      <polygon points="560,80 548,73 548,87" fill="#334155" />
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={toX(tick)} y1="70" x2={toX(tick)} y2="90" stroke="#64748b" />
          <text x={toX(tick)} y="112" textAnchor="middle" fontSize="14">{tick}</text>
        </g>
      ))}
      {data.highlighted?.map((value) => (
        <circle key={value} cx={toX(value)} cy="80" r="7" fill="#2563eb" />
      ))}
      {data.start !== undefined && data.end !== undefined && (
        <path d={`M ${toX(data.start)} 62 Q ${(toX(data.start) + toX(data.end)) / 2} 18 ${toX(data.end)} 62`} fill="none" stroke="#f97316" strokeWidth="4" markerEnd="url(#arrow)" />
      )}
      <defs><marker id="arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4"><path d="M0,0 L8,4 L0,8 Z" fill="#f97316" /></marker></defs>
    </svg>
  );
}

function GeometryShape({ data }: { data: GeometryDiagramData }) {
  return (
    <svg viewBox="0 0 420 260" role="img" aria-label={`${data.shape} 几何图形`}>
      {data.shape === 'triangle' && <polygon points="70,210 350,210 170,50" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />}
      {data.shape === 'rectangle' && <rect x="80" y="60" width="260" height="150" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" />}
      {data.shape === 'circle' && <circle cx="210" cy="135" r="85" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />}
      <line x1="170" y1="50" x2="170" y2="210" stroke="#ef4444" strokeDasharray="8 6" strokeWidth="3" />
      {data.labels?.map((label, index) => <text key={label} x="210" y={235 - index * 180} textAnchor="middle" fontSize="18">{label}</text>)}
      {data.measurements?.map((item, index) => <text key={item} x="210" y={28 + index * 22} textAnchor="middle" fontSize="18" fill="#475569">{item}</text>)}
    </svg>
  );
}

function FractionArea({ data }: { data: FractionAreaDiagramData }) {
  return (
    <svg viewBox="0 0 420 180" role="img" aria-label={`分数面积模型 ${data.numerator}/${data.denominator}`}>
      {Array.from({ length: data.denominator }, (_, index) => (
        <rect key={index} x={30 + index * (360 / data.denominator)} y="45" width={360 / data.denominator} height="90" fill={index < data.numerator ? '#38bdf8' : '#e2e8f0'} stroke="#0f172a" />
      ))}
      <text x="210" y="165" textAnchor="middle" fontSize="20">涂色部分：{data.numerator}/{data.denominator}</text>
    </svg>
  );
}

function BarModel({ data }: { data: BarModelDiagramData }) {
  const total = data.segments.reduce((sum, segment) => sum + segment.value, 0);
  let x = 30;
  return <svg viewBox="0 0 520 180" role="img" aria-label="线段图">{data.segments.map((segment) => { const width = (segment.value / total) * 420; const currentX = x; x += width; return <g key={segment.label}><rect x={currentX} y="55" width={width} height="58" fill={segment.color ?? '#93c5fd'} stroke="#1e293b" /><text x={currentX + width / 2} y="90" textAnchor="middle" fontSize="16">{segment.label}</text></g>; })}<text x="240" y="145" textAnchor="middle" fontSize="18">总量：{data.totalLabel}</text></svg>;
}

function CoordinatePlane({ data }: { data: CoordinatePlaneDiagramData }) {
  const toX = (x: number) => 250 + (x / Math.max(Math.abs(data.xRange[0]), Math.abs(data.xRange[1]))) * 200;
  const toY = (y: number) => 220 - (y / Math.max(Math.abs(data.yRange[0]), Math.abs(data.yRange[1]))) * 160;
  return <svg viewBox="0 0 500 440" role="img" aria-label="平面直角坐标系"><line x1="30" y1="220" x2="470" y2="220" stroke="#334155" strokeWidth="2" /><line x1="250" y1="30" x2="250" y2="410" stroke="#334155" strokeWidth="2" />{data.points.map((point) => <g key={point.label}><circle cx={toX(point.x)} cy={toY(point.y)} r="7" fill="#dc2626" /><text x={toX(point.x) + 10} y={toY(point.y) - 10} fontSize="18">{point.label}({point.x}, {point.y})</text></g>)}<text x="458" y="210" fontSize="16">x</text><text x="260" y="42" fontSize="16">y</text></svg>;
}
