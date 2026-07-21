import { Exam } from '../types/examTypes';

import api from './api';

export const getExams = async (month: number, year: number): Promise<Exam[]> => {
  const response = await api.get(`/exams/calendar/all?month=${month}&year=${year}`);
  return response.data;
};

export const registerForExam = async (examId: number, email: string): Promise<{ id: number }> => {
  const response = await api.post(`/exams/${examId}/register`, { email });
  return response.data.registration;
};

export const getRegisteredExams = async (
  email: string,
): Promise<{ id: number; examId: number }[]> => {
  const response = await api.get(`/exams/registered/${email}`);
  return response.data;
};
