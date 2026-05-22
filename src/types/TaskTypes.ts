export type AssignmentDifficulty = 'LAGAN' | 'SREDNJE' | 'TESKO';

export type SubmissionStatus = 'PENDING' | 'GRADED';

export type AssignmentSubmission = {
  id: number;
  s3Path: string | null;
  pointsEarned: number;
  feedback: string | null;
  status: SubmissionStatus;
  submittedAt: string | null;
  gradedAt: string | null;
};

export type StudentAssignment = {
  id: number;
  title: string;
  description: string | null;
  type: string;
  difficulty: AssignmentDifficulty;
  dueDate: string;
  maxPoints: number;
  professorS3Path: string | null;
  subject: {
    id: number;
    name: string;
    code: string;
    color: string;
  };
  submission: AssignmentSubmission | null;
};

export type TaskCardTypes = {
  label: string;
  value: number;
  icon: string;
  color: string;
};

export type TaskPillsProps = {
  active: string;
  onChange: (filter: string) => void;
  counts: Record<string, number>;
};

export type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};
