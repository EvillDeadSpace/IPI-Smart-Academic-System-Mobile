import { useQuery } from '@tanstack/react-query';

import { getAllTasks, getAssignmentTasks } from '../../services/fetchTask';

export const useTaskQuery = (email: string) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['tasks', email],
    queryFn: () => getAllTasks(email),
  });

  return { tasks: data, isError, isLoading, refetch };
};

export const useAssignmentQuery = (email: string) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['assignments', email],
    queryFn: () => getAssignmentTasks(email),
  });

  return { assignments: data, isError, isLoading, refetch };
};
