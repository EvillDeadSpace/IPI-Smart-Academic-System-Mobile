export type Subject = {
  id: number;
  name: string;
  code: string;
  ects: number;
  isElective: boolean;
};

export type SubjectEnrollment = {
  id: number;
  academicYear: string;
  semester: number;
  subject: Subject;
};

export type YearEnrollment = {
  id: number;
  academicYear: string;
  year: number;
};

export type EnrollmentResponse = {
  yearEnrollments: YearEnrollment[];
  subjectEnrollments: SubjectEnrollment[];
};

export type SubjectPillsProps = {
  active: string;
  onChange: (filter: string) => void;
  counts: Record<string, number>;
};
