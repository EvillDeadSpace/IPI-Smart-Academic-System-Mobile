import api from './api';

export type StudentStats = {
  avgGrade: number;
  ects: number;
  examsLeft: number;
};

export const getAllStats = async (email: string): Promise<StudentStats> => {
  const response = await api.get<{ data: StudentStats }>(`/students/stats/${email}`);
  return response.data.data;
};
