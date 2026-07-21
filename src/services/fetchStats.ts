import api from './api';

export type StudentStats = {
  avgGrade: number;
  ects: number;
  examsLeft: number;
};

export type StudentSubjectLength = {
  progress: {
    totalSubjects: number;
    passedSubjects: number;
  };
};

export const getAllStats = async (email: string): Promise<StudentStats> => {
  const response = await api.get<{ data: StudentStats }>(`/students/stats/${email}`);
  return response.data.data;
};

export const getLengthSubject = async (email: string): Promise<StudentSubjectLength> => {
  const response = await api.get<StudentSubjectLength>(`/student/progress/${email}`);
  return response.data;
};
