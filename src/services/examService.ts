import { Exam } from '../types/examTypes';

import api from './api';

export const getExams = async (month: number, year: number): Promise<Exam[]> => {
  const response = await api.get(`/exams/calendar/all?month=${month}&year=${year}`);
  return response.data;
};
