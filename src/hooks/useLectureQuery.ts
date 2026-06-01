import { useQuery } from '@tanstack/react-query';

import { getNextLecture } from '../services/fetchLecture';

export const useNextLecture = (email: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['nextLecture'],
    queryFn: () => getNextLecture(email),
  });
  return { nextLecture: data, isLoading, isError };
};
