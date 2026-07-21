import { Question } from '../types/question';

import api from './api';

export const getAllQuestion = async (assignmentId: number) => {
  const response = await api.get<{ question: Question[] }>(
    `/assignments/${assignmentId}/questions`,
  );
  return response.data.question;
};

export const postQuestion = async (assignmentId: number, studentMail: string, text: string) => {
  const response = await api.post(`/assignments/${assignmentId}/questions`, {
    studentEmail: studentMail,
    text: text,
  });
  return response.data;
};
