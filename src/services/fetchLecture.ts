import api from './api';

export interface NextLectureData {
  id: number;
  dayName: string;
  startTime: string;
  endTime: string;
  room: string;
  countdown: string;
  minutesUntil: number;
  isToday: boolean;
  subject: {
    id: number;
    name: string;
    code: string;
  };
  professor: {
    fullName: string;
  };
}

export const getNextLecture = async (email: string): Promise<NextLectureData> => {
  const response = await api.get<NextLectureData>(`/lecture/next/${email}`);
  return response.data;
};
