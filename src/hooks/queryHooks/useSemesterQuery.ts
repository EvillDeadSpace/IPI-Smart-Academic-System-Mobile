import { useQuery } from '@tanstack/react-query';

import { fetchCurrentSemester } from '../../services/semesterService';

export const useSemesterQuery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['semester'],
    queryFn: () => fetchCurrentSemester(),
  });

  return { data, isLoading, isError };
};
