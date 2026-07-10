export type DiagramType = 'numberLine' | 'geometry' | 'fractionArea' | 'barModel' | 'coordinatePlane';

export type GradeLevel = '小学三年级' | '小学四年级' | '小学五年级' | '小学六年级' | '初中七年级' | '初中八年级' | '初中九年级';

export interface BaseDiagramData {
  title?: string;
}

export interface NumberLineDiagramData extends BaseDiagramData {
  min: number;
  max: number;
  start?: number;
  end?: number;
  highlighted?: number[];
}

export interface GeometryDiagramData extends BaseDiagramData {
  shape: 'triangle' | 'rectangle' | 'circle';
  labels?: string[];
  measurements?: string[];
}

export interface FractionAreaDiagramData extends BaseDiagramData {
  numerator: number;
  denominator: number;
}

export interface BarModelDiagramData extends BaseDiagramData {
  segments: Array<{ label: string; value: number; color?: string }>;
  totalLabel?: string;
}

export interface CoordinatePlaneDiagramData extends BaseDiagramData {
  points: Array<{ x: number; y: number; label: string }>;
  xRange: [number, number];
  yRange: [number, number];
}

export type DiagramData =
  | NumberLineDiagramData
  | GeometryDiagramData
  | FractionAreaDiagramData
  | BarModelDiagramData
  | CoordinatePlaneDiagramData;

export interface LearningExample {
  id: string;
  grade: GradeLevel;
  semester: '上学期' | '下学期';
  unit: string;
  knowledgePoint: string;
  title: string;
  problem: string;
  diagramType: DiagramType;
  diagramData: DiagramData;
  steps: string[];
  summary: string;
}
