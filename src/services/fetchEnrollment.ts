import { EnrollmentResponse } from '../types/SubjectTypes';

import api from './api';

export const getStudentEnrollments = async (email: string): Promise<EnrollmentResponse> => {
  const response = await api.get<EnrollmentResponse>(`/enrollment/student/${email}`);
  return response.data;
};
