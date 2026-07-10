export type QuestionType = 'practice' | 'unit' | 'exam';

export interface MathQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  answer: string;
  scoringRubric: string[];
}

export interface MathExample {
  id: string;
  problem: string;
  answer: string;
  explanationSteps: string[];
}

export interface MathUnit {
  grade: number;
  semester: 1 | 2;
  unit: string;
  knowledgePoint: string[];
  examples: MathExample[];
  explanationSteps: string[];
  diagram: {
    title: string;
    description: string;
    notation?: string;
  };
  practiceQuestions: MathQuestion[];
  hints: string[];
  unitQuestions: MathQuestion[];
  examQuestions: MathQuestion[];
  answer: string;
  scoringRubric: string[];
  sourceReview: {
    status: 'needs-human-review' | 'reviewed';
    note: string;
  };
}

export interface MathSemesterContent {
  grade: number;
  semester: 1 | 2;
  curriculum: 'PEP';
  units: MathUnit[];
}
