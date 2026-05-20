import { useQuery } from '@tanstack/react-query';

import { getAllTasks } from './../services/fetchTask';

export const useTaskQuery = (email: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getAllTasks(email),
  });

  return { tasks: data, isError, isLoading };
};
