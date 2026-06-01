export type Question = {
  id: number;
  text: string;
  answer: string | null;
  createdAt: string;
  assignmentId: number;
  student: {
    firstName: string;
    lastName: string;
    email: string;
  };
};
