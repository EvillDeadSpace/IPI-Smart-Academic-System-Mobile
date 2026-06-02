export type Exam = {
  id: number;
  examTime: string;
  location: string;
  maxPoints: number;
  subject: { id: number; name: string; code: string };
  professor: { firstName: string; lastName: string; title: string };
};
