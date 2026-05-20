import { TaskCardTypes } from './../types/TaskTypes';
import api from './api';

interface HomeworkStatsResponse {
  total: number;
  thisWeek: number;
  avgEcts: number;
}

export const getAllTasks = async (email: string): Promise<TaskCardTypes[]> => {
  const response = await api.get<HomeworkStatsResponse>(`/homeworks/stats/${email}`);
  const stats = response.data;

  return [
    {
      label: 'Ukupno zadace',
      value: stats.total,
      icon: 'document-text-outline',
      color: 'blue',
    },
    { label: 'OVE SEDMICE', value: stats.thisWeek, icon: 'time-outline', color: 'yellow' },
    { label: 'PROSJEK', value: stats.avgEcts, icon: 'trending-up-outline', color: 'green' },
  ];
};
