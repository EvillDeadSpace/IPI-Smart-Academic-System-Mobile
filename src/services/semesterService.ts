import { Semester } from '../types/semester';

import api from './api';

export const fetchCurrentSemester = async (): Promise<Semester | null> => {
  const response = await api.get<Semester>('/semester/current');

  return response.data ?? null;
};
