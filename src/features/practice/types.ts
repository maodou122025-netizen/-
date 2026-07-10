export type HintLevel = 0 | 1 | 2 | 3;

export type PracticeQuestion = {
  id: string;
  title: string;
  prompt: string;
  knowledgePoint: string;
  reviewTopics: string[];
  acceptedAnswers: string[];
  hintLevel1: string;
  hintLevel2: string;
  hintLevel3: string;
};

export type MasteryStatus =
  | 'independent-correct'
  | 'hint-assisted-correct'
  | 'multi-attempt-correct'
  | 'not-mastered';

export type PracticeAttemptRecord = {
  questionId: string;
  usedHint: boolean;
  maxHintLevelViewed: HintLevel;
  isCorrect: boolean;
  elapsedSeconds: number;
  attemptCount: number;
  masteryStatus: MasteryStatus;
  submittedAnswer: string;
  completedAt: string;
};
